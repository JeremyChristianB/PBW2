import { pool } from '../config/connection.js';

export const insertCourseMeetings = async (params) => {
    const { student_id, teacher_id, datetime,  link} = params;

  
    const sql = "INSERT INTO course_meetings (student_id, teacher_id, datetime, link) VALUES (?, ?, ?, ?)";
    const values = [student_id, teacher_id, datetime, link];
  
    try {
      const [result] = await pool.execute(sql, values);
      return result;
    } catch (error) {
      throw new Error(`Error inserting course_meetings: ${error}`);
    }
  };

/**
 * Retrieves available schedules for a specific course.
 * @param {Object} params - The parameters for retrieving available schedules.
 * @param {number} params.course_id - The ID of the course to retrieve schedules for.
 * @param {boolean=} params.have_student - Indicates if the student is assigned to the course.
 * @returns {Promise<Array<{ meeting_id: number, datetime: string, link: string, teacher: { teacher_id: number, photo: string, full_name: string, address: string, phone_number: string, rate: number }, course_name: string }>>} - A promise that resolves to an array of schedule objects.
 * Each schedule object contains meeting_id, datetime, link, teacher details, and course_name.
 * @throws {Error} - If there is an error retrieving the available schedules.
 */
export const getAvailableSchedules = async (params) => {
  const { course_id, have_student } = params;

  const sql = `
  SELECT cm.id AS meeting_id, cm.datetime, cm.link,
       t.id AS teacher_id, t.photo, t.full_name, t.address, t.phone_number, t.rate,
       c.nama AS course_name
  FROM course_meetings cm
  JOIN teachers t ON cm.teacher_id = t.id
  JOIN course c ON t.course_id = c.id
  WHERE c.id = ?;
  `;
  const values = [course_id];

  if (have_student !== undefined) {
    if (have_student) {
      sql += ' AND cm.student_id IS NOT NULL';
    } else {
      sql += ' AND cm.student_id IS NULL';
    }
  }

  try {
    const [result] = await pool.execute(sql, values);

    return result.map(e => ({
      meeting_id: e.meeting_id,
      datetime: e.datetime,
      link: e.link,
      teacher: {
        teacher_id: e.teacher_id,
        photo: e.photo,
        full_name: e.full_name,
        address: e.address,
        phone_number: e.phone_number,
        rate: e.rate,
      },
      course_name: e.course_name,
    }))
  } catch (error) {
    throw new Error(`Error get course_meetings: ${error}`);
  }
}

  // const createCourseMeetings = `CREATE TABLE IF NOT EXISTS course_meetings(
  //   id INTEGER AUTO_INCREMENT PRIMARY KEY,
  //   student_id INTEGER,
  //   teacher_id INTEGER,
  //   datetime DATETIME,
  //   link VARCHAR(255),
  
  //   FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  //   FOREIGN KEY (student_id) REFERENCES students(id),
  //   CONSTRAINT u_course_meetings UNIQUE KEY (teacher_id, datetime)
  // )`;