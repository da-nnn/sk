const db = require('../config/dbConfig');

class Scholarship {
  static getAll(callback) {
    db.query('SELECT * FROM scholarships', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM scholarships WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      // Handle case where no results are returned
      callback(null, results.length > 0 ? results[0] : null);
    });
  }

  static create(newScholarship, callback) {
    // Ensure newScholarship contains all fields from the table structure
    db.query('INSERT INTO scholarships SET ?', newScholarship, callback);
  }

  static update(id, updatedScholarship, callback) {
    // Ensure updatedScholarship contains all fields for the update operation
    db.query('UPDATE scholarships SET ? WHERE id = ?', [updatedScholarship, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM scholarships WHERE id = ?', [id], callback);
  }
}

module.exports = Scholarship;
