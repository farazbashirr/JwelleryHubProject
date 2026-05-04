const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Order = require('../models/order');
const auth = require('../middleware/auth');

// Protected route: create an order. User must be authenticated.
router.post(
  '/',
  auth,
  [
    body('items').isArray({ min: 1 }).withMessage('Items must be an array with at least one item'),
    body('fullName').trim().isLength({ min: 2 }).withMessage('Full name is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('phone').trim().notEmpty().withMessage('Phone required'),
    body('address').trim().notEmpty().withMessage('Address required'),
    body('notes').optional().trim().escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { items, fullName, email, phone, address, notes } = req.body;

    try {
      const order = new Order({ items, fullName, email, phone, address, notes });
      await order.save();
      res.status(201).json({ message: 'Order placed successfully' });
    } catch (err) {
      console.error('Order error:', err.message);
      res.status(500).json({ message: 'Failed to save order' });
    }
  }
);

module.exports = router;
