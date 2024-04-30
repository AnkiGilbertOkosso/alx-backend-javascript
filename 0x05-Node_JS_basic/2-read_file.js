const fs = require('fs');

/**
 * Counts the number of students in each field from the database file.
 * @param {String} dataPath The path to the database file.
 * @documentary This function reads a CSV data file and counts the
 * number of students in each field.
 */
const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }
  const fileLines = fs
    .readFileSync(dataPath, 'utf-8')
    .toString('utf-8')
    .trim()
    .split('\n');
  const groups = {};
  const fieldNames = fileLines[0].split(',');
  const propNames = fieldNames.slice(0, fieldNames.length - 1);

  for (const line of fileLines.slice(1)) {
    const record = line.split(',');
    const propValues = record.slice(0, record.length - 1);
    const field = record[record.length - 1];
    if (!Object.keys(groups).includes(field)) {
      groups[field] = [];
    }
    const entries = propNames
      .map((propName, idx) => [propName, propValues[idx]]);
    groups[field].push(Object.fromEntries(entries));
  }

  const totalStudents = Object
    .values(groups)
    .reduce((pre, cur) => (pre || []).length + cur.length);
  console.log(`Number of students: ${totalStudents}`);
  for (const [field, group] of Object.entries(groups)) {
    const names = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${names}`);
  }
};

module.exports = countStudents;
