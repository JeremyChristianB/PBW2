import { pool } from '../config/connection.js';

export const insertStudentAccount = async (params) => {
  const { photo, full_name, school, phone_number, level } = params;

  // if (!photo, !full_name || !school || !phone_number || !level) {
  //   throw new Error('Missing required parameters for inserting student account');
  // }


  const sql = "INSERT INTO students (photo, full_name, school, phone_number, level) VALUES (?, ?, ?, ?, ?)";
  const values = [photo, full_name, school, phone_number, level];

  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting student account: ${error}`);
  }
};

export const getStudentById = async (student_id) => {
  const sql = "SELECT * FROM students WHERE id = ?";

  const [rows] = await pool.promise().query(sql, [student_id]);
  return rows;
};

export const showStudentProfile = (req, res, next) => {
  //const sql = "SELECT * FROM students WHERE id = ?";
  let id = req.session.userId;
  
  const query = 'SELECT * FROM students JOIN users ON users.student_id = students.id WHERE users.id =' + id ;
  
  return new Promise(async (resolve) => {
    pool.execute(query, [id])
    .then((data) => {
      //untuk passing data antar middleware
      
      console.log(data?.[0])
      res.locals.dataUser2 = data?.[0]
      next();
    })
    .catch(() => {
      //res.locals.dataUser2 = data?.[0]
      next();
    })
  })
};
