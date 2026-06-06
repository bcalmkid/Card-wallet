import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { password, cards } = req.body;
    if (!password || password !== process.env.APP_PASSWORD) {
        return res.status(401).json({ error: '密码错误' });
    }

    try {
        await kv.set('user_cards', cards);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
