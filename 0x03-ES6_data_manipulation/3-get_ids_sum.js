/**
 * Retrieves the sum of ids in a list of students.
 * @param {{
 *   id: Number,
 *   firstName: String,
 *   location: String
 * }[]} students - The list of students.
 * @returns {Number}
 */
export default function getStudentIdsSum(students) {
  if (students instanceof Array) {
    return students.reduce(
      (previousStudent, currentStudent) => previousStudent.id || previousStudent + currentStudent.id,
      0,
    );
  }
  return 0;
}
