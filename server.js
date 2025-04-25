const express = require('express');
const mongoose = require('mongoose');
const Feedback = require('./feedback.js');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 7000;

// Connect to MongoDB - remove deprecated options
mongoose.connect('mongodb://localhost:27017/feedback_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API endpoint to handle form submissions
app.post('/api/feedback', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json({ success: true, data: newFeedback.format() });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});