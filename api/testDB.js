// api/testDB.js
const cors = require('../config/cors');
const connectDB = require('../config/db');
const Contact = require('../models/Contact');

module.exports = async (req, res) => {
    if (cors(req, res)) return;

    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();
        const contacts = await Contact.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        console.error('DB Test Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};