const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the number of students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @documentary This function reads a CSV data file asynchronously
 * and counts the number of students in each field.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportParts = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const groups = {};
        const fieldNames = fileLines[0].split(',');
        const propNames = fieldNames.slice(
          0,
          fieldNames.length - 1,
        );

        for (const line of fileLines.slice(1)) {
          const record = line.split(',');
          const propValues = record.slice(
            0,
            record.length - 1,
          );
          const field = record[record.length - 1];
          if (!Object.keys(groups).includes(field)) {
            groups[field] = [];
          }
          const entries = propNames.map((propName, idx) => [
            propName,
            propValues[idx],
          ]);
          groups[field].push(Object.fromEntries(entries));
        }

        const totalStudents = Object.values(groups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(groups)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.type('text').send(responseText);
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseParts.join('\n');
      res.type('text').send(responseText);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
