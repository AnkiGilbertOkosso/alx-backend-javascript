const fs = require('fs');

/**
 * Counts the number of students in each field from the database file.
 * @param {string} path The path to the database file.
 */
const countStudents = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');

    const rows = data.trim().split('\n');

    const fields = {};

    for (const row of rows) {
      const student = row.split(',');
      const field = student[student.length - 1].trim();

      if (field !== 'field' && field !== '') {
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(student[0]);
      }
    }

    for (const field of Object.keys(fields)) {
      const count = fields[field].length;
      console.log(`Number of students in ${field}: ${count}. List: ${fields[field].join(', ')}`);
    }

    const totalStudents = rows.length - 1;
    console.log(`Number of students: ${totalStudents}`);
  } catch (error) {
    console.error('Cannot load the database');
  }
};

module.exports = countStudents;
