import { pool } from '../config/connection.js';

export const insertStudentAccount = async (params) => {
  const { full_name, sekolah, phone_number, kelas } = params;

  if (!full_name || !sekolah || !phone_number || !kelas) {
    throw new Error('Missing required parameters for inserting student account');
  }

  const sql = "INSERT INTO students (full_name, sekolah, phone_number, kelas) VALUES (?, ?, ?, ?)";
  const values = [full_name, sekolah, phone_number, kelas];

  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting student account: ${error}`);
  }
};
