const Scholarship = require('../models/Scholarship');

exports.getScholarshipById = (req, res) => {
  const id = req.params.id;

  Scholarship.getById(id, (err, scholarship) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    if (!scholarship) {
      console.log('Scholarship not found');
      return res.status(404).json({ error: 'Scholarship not found' });
    }
    // If the scholarship is found, return it
    console.log('Scholarship found:', scholarship);
    res.json(scholarship);
  });
};
