
const express = require('express');
const pool = require('../config/database');

const router = express.Router();


// POST /contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.json({
        success: false,
        message: 'Please complete all fields.',
      });
    }

    // Insert the contact message into PostgreSQL
    const query = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at;
    `;

    const values = [
      name.trim(),
      email.trim(),
      subject.trim(),
      message.trim(),
    ];

    const result = await pool.query(query, values);

    // Send success response
    return res.json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return res.json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
});

module.exports = router;
