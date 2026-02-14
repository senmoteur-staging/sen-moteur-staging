
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
        const apiKey = process.env.VINCARIO_API_KEY; // User has this
        const secretKey = process.env.VINCARIO_SECRET; // User has this
        const id = process.env.VINCARIO_ID || "no-id"; // Fallback if no ID provided

        if (!apiKey || !secretKey) {
            throw new Error('Server configuration error: Missing API Key or Secret');
        }

        // 3. Generate Control Sum (Authentication)
        // Formula: SHA1(VIN|ID|API Key|Secret Key).substring(0, 10)
        // If ID is not used, maybe just VIN|API Key|Secret Key? 
        // Based on docs: VIN|ID|APIKey|Secret
        // Let's assume ID is required. If user has no ID, maybe they mean API Key is ID?
        // Strategy: Try using API Key as ID if no ID env var is present.

        const usedId = process.env.VINCARIO_ID || apiKey;

        const dataToHash = `${vin}|${usedId}|${apiKey}|${secretKey}`;
        const shasum = crypto.createHash('sha1');
        shasum.update(dataToHash);
        const controlSum = shasum.digest('hex').substring(0, 10);

        // 4. Call Vincario API
        // Endpoint: https://api.vincario.com/3.2/{ID}/{ControlSum}/STOLEN/{VIN}.json (Example)
        // But user wants decode. 
        // Endpoint: https://api.vincario.com/3.2/{ID}/{ControlSum}/decode/{VIN}.json

        const endpoint = `https://api.vincario.com/3.2/${usedId}/${controlSum}/decode/${vin}.json`;

        const response = await fetch(endpoint);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Vincario API Error: ${response.status} ${errorText}`);
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
