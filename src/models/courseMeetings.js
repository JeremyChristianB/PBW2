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

  const createCourseMeetings = `CREATE TABLE IF NOT EXISTS course_meetings(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    student_id INTEGER,
    teacher_id INTEGER,
    datetime DATETIME,
    link VARCHAR(255),
  
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT u_course_meetings UNIQUE KEY (teacher_id, datetime)
  )`;