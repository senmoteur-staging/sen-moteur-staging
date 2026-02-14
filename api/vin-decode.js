
import crypto from 'crypto';

export default async function handler(req, res) {
    // 1. Check Method
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { vin } = req.body;

    // 2. Validate VIN (Basic Check)
    if (!vin || vin.length !== 17) {
        return res.status(400).json({ error: 'Invalid VIN format. Must be 17 characters.' });
    }

    try {
        const apiKey = process.env.VINCARIO_API_KEY;
        const secretKey = process.env.VINCARIO_SECRET;
        // According to some docs, ID can be the service identifier like 'decode'
        // We will try 'decode' as the default ID if not provided.
        const id = process.env.VINCARIO_ID || "decode";

        if (!apiKey || !secretKey) {
            throw new Error('Server configuration error: Missing API Key or Secret');
        }

        // 3. Generate Control Sum (Authentication)
        // Formula: SHA1(VIN|ID|API Key|Secret Key).substring(0, 10)
        // VIN must be uppercase.
        const upperVin = vin.toUpperCase();
        const dataToHash = `${upperVin}|${id}|${apiKey}|${secretKey}`;
        const shasum = crypto.createHash('sha1');
        shasum.update(dataToHash);
        const controlSum = shasum.digest('hex').substring(0, 10);

        // 4. Call Vincario API
        // Endpoint: https://api.vincario.com/3.2/{ID}/{ControlSum}/{VIN}.json
        // Ensure we are using the correct endpoint structure.
        const endpoint = `https://api.vincario.com/3.2/${id}/${controlSum}/${upperVin}.json`;

        console.log(`Calling Vincario: ${endpoint} (Masked Key)`); // Log for Vercel logs

        const response = await fetch(endpoint);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Vincario Error Body:', errorText);
            // Return the actual error to the frontend for debugging
            throw new Error(`Vincario API Error: ${response.status} ${errorText.substring(0, 200)}`);
        }

        const data = await response.json();

        // 5. Map Fields
        // Vincario returns a list of objects: { label: "Make", value: "Kia", ... }
        // We need to transform this into our vehicle object.

        const getField = (label) => {
            const item = data.decode?.find(i => i.label === label || i.id === label);
            return item ? item.value : null;
        };

        const vehicle = {
            make: getField('Make'),
            model: getField('Model'),
            year: getField('Model Year') || getField('Year'),
            manufacturer: getField('Manufacturer'),
            engine: getField('Engine') || getField('Engine Type'),
            transmission: getField('Transmission'),
            fuelType: getField('Fuel Type') || getField('Fuel'),
            driveType: getField('Drive') || getField('Drive Type'),
            seating: getField('Seating Capacity') || getField('Seats'),
            extras: [], // Vincario might list options differently, basic mapping for now
            raw: data // Keep raw for debugging
        };

        return res.status(200).json(vehicle);

    } catch (error) {
        console.error('VIN Decode Error:', error);
        return res.status(500).json({ error: error.message || 'Failed to decode VIN' });
    }
}
