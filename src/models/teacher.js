import { pool } from '../config/connection.js';

export const insertTeacherAccount = async (params) => {
  const { full_name, address, phone_number, expertise, rate } = params;

  if (!full_name || !address || !phone_number || !expertise || !rate) {
    throw new Error('Missing required parameters for inserting teacher account');
  }

  const sql = "INSERT INTO teachers (full_name, address, phone_number, expertise, rate) VALUES (?, ?, ?, ?, ?)";
  const values = [full_name, address, phone_number, expertise, rate];

  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting teacher account: ${error}`);
  }
};

export const getTeacherDataById = async (teacher_id) => {
  const sql = "SELECT * FROM teachers WHERE id = ?";

  const [rows] = await pool.promise().query(sql, [teacher_id]);
  return rows;
};

export const showTeacherProfile = async (params) => {
  const query = 'SELECT * FROM teachers INNER JOIN users ON users.teacher_id = teachers.id';

  const[rows] = await pool.promise().query(sql, [params]);
  return rows;
};



