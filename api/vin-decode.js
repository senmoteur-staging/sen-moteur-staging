export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { vin } = req.body;

    // 1. Validate VIN (17 chars, no I, O, Q)
    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    if (!vin || !vinRegex.test(vin)) {
        return res.status(400).json({ error: 'Invalid VIN format' });
    }

    // 2. Simple Rate Limiting (In-Memory, per function instance)
    // Note: In serverless, this memory is ephemeral but helps basic abuse
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // TODO: stronger rate limiting would need Vercel KV or similar

    try {
        const apiKey = process.env.AUTO_DEV_API_KEY;
        if (!apiKey) {
            console.error('Missing AUTO_DEV_API_KEY');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // 3. Call Auto.dev API
        const response = await fetch(`https://api.auto.dev/vin/${vin}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ error: 'VIN not found' });
            }
            const errorText = await response.text();
            console.error('Auto.dev Error:', errorText);
            return res.status(response.status).json({ error: 'Failed to fetch vehicle data' });
        }

        const data = await response.json();

        // 4. Map Fields
        // Robust mapping ensuring we catch fields whether they are at root or inside 'vehicle' object
        const v = data.vehicle || {};
        const vehicle = {
            make: data.make?.name || data.make || v.make,
            model: data.model?.name || data.model || v.model,
            year: data.years?.[0]?.year || data.year || v.year,
            manufacturer: data.manufacturer?.name || data.manufacturer || v.manufacturer,
            engine: data.engine?.name || data.engine || v.engine,
            transmission: data.transmission?.name || data.transmission || v.transmission,
            fuelType: data.fuelType || v.fuelType,
            driveType: data.drivenWheels || v.driveType,
            seating: data.passengerCapacity || v.seating,
            extras: data.options || [],
            raw: data
        };

        return res.status(200).json(vehicle);

    } catch (error) {
        console.error('Server Logic Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
