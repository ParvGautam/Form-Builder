const express = require('express');
const Response = require('../models/responseModel');

const router = express.Router();

// POST endpoint to save a form response
router.post('/', async (req, res) => {
  try {
    const { formId, answers, submittedAt } = req.body;
    if (!answers || !submittedAt) {
      return res.status(400).json({ error: 'Missing answers or submittedAt' });
    }
    const response = new Response({ formId, answers, submittedAt });
    await response.save();
    res.status(201).json({ message: 'Response saved', response });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save response', details: err.message });
  }
});

// GET endpoint to fetch recent responses
router.get('/', async (req, res) => {
  try {
    const responses = await Response.find().sort({ submittedAt: -1 }).limit(20);
    res.json({ responses });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch responses', details: err.message });
  }
});

module.exports = router; 