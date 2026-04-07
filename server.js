const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRouter = require('./routes/contact');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Barber Royale API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✂️  Barber Royale Backend running on http://localhost:${PORT}`);
});
