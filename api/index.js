// api/index.js
module.exports = (req, res) => {
    res.status(200).json({
        success: true,
        name: 'Barber Royale API',
        version: '1.0.0',
        status: 'running',
        endpoints: [
            { method: 'GET', path: '/api/testDB', description: 'Test database connection' },
            { method: 'POST', path: '/api/contact', description: 'Submit booking request' },
        ],
        timestamp: new Date().toISOString(),
    });
};