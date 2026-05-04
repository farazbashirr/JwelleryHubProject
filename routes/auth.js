const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

// =========================
// Helper: Send Validation Errors
// =========================
const sendValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      errors: errors.array()
    });
  }
};

// =========================
// POST /api/auth/register
// =========================
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    const validation = sendValidationErrors(req, res);
    if (validation) return;

    const { fullName, email, password } = req.body;

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({
          status: false,
          message: 'User already exists'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        fullName,
        email,
        password: hashedPassword
      });

      await user.save();

      return res.status(201).json({
        status: true,
        message: 'User registered successfully'
      });
    } catch (err) {
      console.error('Registration error:', err.message);
      return res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  }
);

// =========================
// POST /api/auth/login
// =========================
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    const validation = sendValidationErrors(req, res);
    if (validation) return;

    const { email, password } = req.body;

    console.log('Login attempt for:', email);
    console.log('Password received:', password);

    try {
      const user = await User.findOne({ email });
      console.log('User found:', user ? 'Yes' : 'No');
      
      if (!user) {
        return res.status(401).json({
          status: false,
          message: 'Invalid email or password'
        });
      }

      console.log('Stored hash:', user.password);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        return res.status(401).json({
          status: false,
          message: 'Invalid email or password'
        });
      }

      const payload = {
        id: user._id,
        email: user.email
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2h'
      });

      return res.status(200).json({
        status: true,
        message: 'Login successful',
        token
      });
    } catch (err) {
      console.error('Login error:', err.message);
      return res.status(500).json({
        status: false,
        message: 'Internal server error'
      });
    }
  }
);

module.exports = router;
