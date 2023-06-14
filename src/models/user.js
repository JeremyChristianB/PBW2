import { pool } from '../config/connection.js';

export const insertUserData = async (params) => {
  const { email, password, role, teacher_id, student_id} = params;

  //console.log(params)
  // if (!email || !password || !role_id || !teacher_id) {
  //   throw new Error('Missing required parameters for inserting user account');
  // }

  const sql = "INSERT INTO users(email, password, role_id, teacher_id, student_id) VALUES (?, ?, ?, ?, ?)";
  const values = [email, password, role, teacher_id, student_id];

  console.log('data sedang dimasukkan')
  
  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting user account: ${error}`);
  }

};


export const getUserData = (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  return new Promise(async (resolve) => {
    pool.execute(sql, [email])
    .then((data) => {
      if (data?.[0]) {
        resolve(data[0]?.[0])
      } else {
        resolve(null);
      }
    })
    .catch(() => {
      resolve(null);
    })
  })
};
