export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return res.status(200).json({ success: true, message: "Admin logged in" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
}