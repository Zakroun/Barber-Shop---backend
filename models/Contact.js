const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            default: '',
        },

        service: {
            type: String,
            default: '',
        },

        date: {
            type: String,
            default: '',
        },

        message: {
            type: String,
            default: '',
        },

        language: {
            type: String,
            enum: ['fr', 'en'],
            default: 'fr',
        },

        status: {
            type: String,
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports =
    mongoose.models.Contact || mongoose.model('Contact', contactSchema);