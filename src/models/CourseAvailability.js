import { pool } from '../config/connection.js';

export const insertCourseAvailability = async (params) => {
    const { teacher_id , date} = params;
  
    const sql = "INSERT INTO course_availability (teacher_id, date) VALUES (?, ?)";
    const values = [teacher_id, date];
  
    try {
      const [result] = await pool.execute(sql, values);
      return result;
    } catch (error) {
      throw new Error(`Error inserting course_availability: ${error}`);
    }
  };

//   const createCourseAvailability = `CREATE TABLE IF NOT EXISTS course_availability(
//     teacher_id INTEGER,
//     day SMALLINT,
//     time VARCHAR(5),
  
//     FOREIGN KEY (teacher_id) REFERENCES teachers(id),
//     PRIMARY KEY (teacher_id, day, time)
//   )`;