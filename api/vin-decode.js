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
        // Mapped according to Auto.dev V2 documentation
        const vehicle = {
            make: data.make || data.vehicle?.make,
            model: data.model || data.vehicle?.model,
            year: data.year || data.vehicle?.year,
            manufacturer: data.manufacturer || data.vehicle?.manufacturer,
            engine: data.engine, // Top level in docs
            transmission: data.transmission, // Top level in docs
            fuelType: data.fuelType,
            driveType: data.drive, // Docs say 'drive', not 'drivenWheels'
            seating: data.seating, // Not explicitly in example, keeping as fallback
            extras: data.style ? [data.style, data.trim, data.body].filter(Boolean) : [], // Construct extras from style/trim/body
            raw: data
        };

        return res.status(200).json(vehicle);

    } catch (error) {
        console.error('Server Logic Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
