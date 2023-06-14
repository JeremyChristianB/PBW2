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

//untuk menampilkan profile dari guru
// export const showTeacherProfile = async (params) => {
//   //const query = 'SELECT * FROM teachers JOIN users ON users.teacher_id = teachers.id';
//   const query = 'SELECT * FROM teachers WHERE id = ?';

//   const[rows] = await pool.promise().query(sql, [params]);
//   return rows;
// };

// export const showTeacherProfile = (id) => {
//   //const sql = "SELECT * FROM teachers WHERE id = ?";
//   const query = 'SELECT * FROM teachers JOIN users ON users.teacher_id = teachers.id';

//   return new Promise(async (resolve) => {
//     pool.execute(query, [id])
//     .then((data) => {
//       if (data?.[0]) {
//         resolve(data[0]?.[0])
//       } else {
//         resolve(null);
//       }
//     })
//     .catch(() => {
//       resolve(null);
//     })
//   })
// };

//untuk edit profile guru
// export const updateTeacherProfile = async (params) => {
//   const query = 'UPDATE teachers SET full_name = ?, address = ?, phone_number = ?, expertise = ?, rate = ? WHERE id = ?';

//   const[rows] = await pool.promise().query(sql, [params]);
//   return rows;
// };





