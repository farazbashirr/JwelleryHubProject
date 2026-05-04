require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const db = require('./db'); // MySQL connection

const app = express();

// Basic environment checks
if (!process.env.DB_HOST) {
  console.error('Missing DB_HOST in environment. Set DB_HOST in .env');
}
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Authentication will not be secure.');
}

// Security middleware
app.use(helmet());
app.use(morgan('combined'));
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// CORS
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://127.0.0.1:5500';
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));

app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Test route
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS currentTime', (err, results) => {
    if (err) return res.send('Error: ' + err.message);
    res.json({ message: 'JewelleryHub backend running', dbTime: results[0].currentTime });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
