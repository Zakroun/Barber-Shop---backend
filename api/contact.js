const connectDB = require('../config/db');
const transporter = require('../config/mailer');
const Contact = require('../models/Contact');
const {
    ownerTemplate,
    clientTemplateFR,
    clientTemplateEN
} = require('../utils/emailTemplates');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        let {
            name,
            email,
            phone,
            service,
            date,
            message,
            language
        } = req.body;

        // 🔥 FIX: sanitize + default values
        name = name?.trim();
        email = email?.trim();
        phone = phone || '';
        service = service || '';
        date = date || '';
        message = message || '';
        language = language === 'en' ? 'en' : 'fr'; // default FR

        // validation
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email required',
            });
        }

        // save DB
        const contact = await Contact.create({
            name,
            email,
            phone,
            service,
            date,
            message,
            language,
        });

        // owner email
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.OWNER_EMAIL,
            subject: 'New Reservation',
            html: ownerTemplate(contact),
        });

        // client email
        const html =
            language === 'en'
                ? clientTemplateEN(contact)
                : clientTemplateFR(contact);

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject:
                language === 'en'
                    ? 'Booking Confirmation'
                    : 'Confirmation de réservation',
            html,
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully',
            data: contact,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};