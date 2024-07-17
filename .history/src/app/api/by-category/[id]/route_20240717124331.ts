import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const query = req.query; // Use req.query to access query parameters

        try {
            const response = await fetch(`https://sea-lion-app-bo3ep.ondigitalocean.app/product/getProductByCategory/${query.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ` // Add your token here
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            res.status(200).json({ data });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
