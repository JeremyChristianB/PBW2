import { pool } from '../config/connection.js';

export const insertCourse = async (params) => {
    const { nama } = params;
  
    // if (!nama) {
    //   throw new Error('Missing required parameters for inserting course ');
    // }
  
    const sql =
      "INSERT INTO course (nama) VALUES (?)";
    const values = [nama];
  
    try {
      const [result] = await pool.execute(sql, values);
      return result;
    } catch (error) {
      throw new Error(`Error inserting course : ${error}`);
    }
  };

/**
 * Retrieves all courses.
 * @returns {Promise<Array<{ id: number, nama: string }>>} - A promise that resolves to an array of course objects.
 * Each course object contains the ID and name of the course.
 * @throws {Error} - If there is an error retrieving the courses.
 */
export const getAllCourses = async () => {
  const sql = `
    SELECT id, nama
    FROM course;
  `;

  try {
    const [result] = await pool.execute(sql);

    return result.map((e) => ({
      id: e.id,
      nama: e.nama,
    }));
  } catch (error) {
    throw new Error(`Error retrieving courses: ${error}`);
  }
};

