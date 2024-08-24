const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');
const authMiddleware = require('../middleware/authMiddleware');

// GET all scholarships
router.get('/scholarships', (req, res) => {
  Scholarship.getAll((err, scholarships) => {
    if (err) {
      console.error('Error fetching scholarships:', err);
      return res.status(500).json({ error: 'Failed to retrieve scholarships' });
    }
    res.json(scholarships);
  });
});

// GET a specific scholarship by ID
router.get('/scholarships/:id', (req, res) => {
  Scholarship.getById(req.params.id, (err, scholarship) => {
    if (err) {
      console.error('Error fetching scholarship:', err);
      return res.status(500).json({ error: 'Failed to retrieve scholarship' });
    }
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    res.json(scholarship);
  });
});

// POST a new scholarship (admin only)
router.post('/scholarships', authMiddleware, (req, res) => {
  const newScholarship = req.body;
  Scholarship.create(newScholarship, (err, result) => {
    if (err) {
      console.error('Error creating scholarship:', err);
      return res.status(500).json({ error: 'Failed to create scholarship' });
    }
    res.status(201).json({ message: 'Scholarship created successfully', id: result.insertId });
  });
});

// PUT update a scholarship by ID (admin only)
router.put('/scholarships/:id', authMiddleware, (req, res) => {
  const updatedScholarship = req.body;
  Scholarship.update(req.params.id, updatedScholarship, (err, result) => {
    if (err) {
      console.error('Error updating scholarship:', err);
      return res.status(500).json({ error: 'Failed to update scholarship' });
    }
    res.json({ message: 'Scholarship updated successfully', id: req.params.id });
  });
});

// DELETE a scholarship by ID (admin only)
router.delete('/scholarships/:id', authMiddleware, (req, res) => {
  Scholarship.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Error deleting scholarship:', err);
      return res.status(500).json({ error: 'Failed to delete scholarship' });
    }
    res.json({ message: 'Scholarship deleted successfully', id: req.params.id });
  });
});

module.exports = router;
