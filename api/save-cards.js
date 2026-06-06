import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { password, cards } = req.body;
    if (!password || password !== process.env.APP_PASSWORD) {
        return res.status(401).json({ error: '密码错误' });
    }

    try {
        const { error } = await supabase
            .from('kv_store')
            .upsert({ key: 'user_cards', value: cards });
        if (error) throw error;

        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
