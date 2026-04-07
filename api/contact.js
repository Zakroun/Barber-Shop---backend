// api/contact.js
const cors = require('../config/cors');
const connectDB = require('../config/db');
const transporter = require('../config/mailer');
const Contact = require('../models/Contact');
const {
    ownerTemplate,
    clientTemplateFR,
    clientTemplateEN
} = require('../utils/emailTemplates');

module.exports = async (req, res) => {
    if (cors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDB();

        let { name, email, phone, service, date, message, language } = req.body;

        name     = name?.trim();
        email    = email?.trim()?.toLowerCase();
        phone    = phone?.trim()   || '';
        service  = service?.trim() || '';
        date     = date?.trim()    || '';
        message  = message?.trim() || '';
        language = language === 'en' ? 'en' : 'fr';

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Name and email are required',
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address',
            });
        }

        const contact = await Contact.create({
            name, email, phone, service, date, message, language,
        });

        const data = contact.toObject();

        await transporter.sendMail({
            from: `"Barber Royale" <${process.env.SMTP_USER}>`,
            to: process.env.OWNER_EMAIL,
            subject: '💈 New Reservation — Barber Royale',
            html: ownerTemplate(data),
        });

        await transporter.sendMail({
            from: `"Barber Royale" <${process.env.SMTP_USER}>`,
            to: email,
            subject: language === 'en'
                ? '✅ Booking Confirmation — Barber Royale'
                : '✅ Confirmation de réservation — Barber Royale',
            html: language === 'en' ? clientTemplateEN(data) : clientTemplateFR(data),
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully',
            data,
        });

    } catch (error) {
        console.error('[Contact API Error]', error);
        res.status(500).json({
            success: false,
            message: process.env.NODE_ENV === 'development'
                ? error.message
                : 'Something went wrong. Please try again.',
        });
    }
};