import { pool } from '../config/connection.js';

export const insertTeacherAccount = async (params) => {
  const { photo, full_name, address, phone_number, expertise, rate, course_id } = params;

  // if (!photo || !full_name || !address || !phone_number || !expertise || !rate || !course_id) {
  //   throw new Error('Missing required parameters for inserting teacher account');
  // }

  const sql = "INSERT INTO teachers (photo, full_name, address, phone_number, expertise, rate, course_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [photo, full_name, address, phone_number, expertise, rate, course_id];

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

export const showTeacherProfile = (req, res, next) => {
  //const sql = "SELECT * FROM teachers WHERE id = ?";
  let id = req.session.userId;
  
  const query = 'SELECT * FROM teachers JOIN users ON users.teacher_id = teachers.id WHERE users.id =' + id ;

  return new Promise(async (resolve) => {
    pool.execute(query, [id])
    .then((data) => {
      //untuk passing data antar middleware
      res.locals.dataUser = data?.[0]
      //console.log(res.locals.dataUser)
      next();
    })
    .catch(() => {
      res.locals.dataUser = data?.[0]
      next();
    })
  })
};

//untuk edit profile guru
// export const updateTeacherProfile = async (params) => {
//   const query = 'UPDATE teachers SET full_name = ?, address = ?, phone_number = ?, expertise = ?, rate = ? WHERE id = ?';

//   const[rows] = await pool.promise().query(sql, [params]);
//   return rows;
// };


export const insertClass = async (params) => {
  const { namaKelas, Waktu, Tarif, Link, teacher_id, student_id } = params;

  if (!namaKelas || !Waktu || !Tarif || !Link ||!teacher_id || !student_id) {
    throw new Error('Missing required parameters for inserting class');
  }

  const sql = "INSERT INTO  class(namaKelas, Waktu, Tarif, teacher_id, student_id) VALUES (?, ?, ?, ?, ?)";
  const values = [namaKelas, Waktu, Tarif, Link, teacher_id, student_id];

  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting class: ${error}`);
  }
};




