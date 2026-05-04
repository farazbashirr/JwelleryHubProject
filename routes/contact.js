const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const router = express.Router();
const Contact = require('../models/contact');

// Email configuration - using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail App Password
  }
});

// =========================
// POST /api/contact
// =========================
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required')
  ],
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: false,
        errors: errors.array()
      });
    }

    const { name, email, message } = req.body;

    try {
      // 1. Save to MongoDB
      const contact = new Contact({
        name,
        email,
        message
      });
      await contact.save();

      // 2. Send email notification
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'farazbashir15@gmail.com', // Your email
        subject: `New Contact Message from ${name} - JewelleryHub`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #d4a017; text-align: center; border-bottom: 2px solid #d4a017; padding-bottom: 10px;">
                ✨ New Contact Message - JewelleryHub
              </h2>
              <div style="margin-top: 20px;">
                <p><strong style="color: #333;">Name:</strong> ${name}</p>
                <p><strong style="color: #333;">Email:</strong> ${email}</p>
                <p><strong style="color: #333;">Message:</strong></p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #d4a017; margin: 10px 0;">
                  ${message}
                </div>
              </div>
              <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">
                Received on ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);

      return res.status(201).json({
        status: true,
        message: 'Message sent successfully! We will get back to you soon.'
      });

    } catch (err) {
      console.error('Contact form error:', err.message);
      
      // If email fails but data is saved, still return success
      if (err.message.includes('nodemailer') || err.message.includes('mail')) {
        return res.status(201).json({
          status: true,
          message: 'Message received! We will get back to you soon.'
        });
      }

      return res.status(500).json({
        status: false,
        message: 'Failed to send message. Please try again.'
      });
    }
  }
);

module.exports = router;
