import { pool } from '../config/connection.js';

export const insertTeacherAccount = async (params) => {
  const { photo, full_name, address, phone_number, rate, course_id } = params;

  // if (!photo || !full_name || !address || !phone_number || !expertise || !rate || !course_id) {
  //   throw new Error('Missing required parameters for inserting teacher account');
  // }

  const sql = "INSERT INTO teachers (photo, full_name, address, phone_number, rate, course_id) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [photo, full_name, address, phone_number, rate, course_id];
  
  try {
    const [result] = await pool.execute(sql, values);
    return result;
  } catch (error) {
    throw new Error(`Error inserting teacher account: ${error}`);
  }
};

export const showTeacherProfile = (req, res, next) => {
  //const sql = "SELECT * FROM teachers WHERE id = ?";
  let id = req.session.userId;
  
  const query = 'SELECT * FROM teachers JOIN users ON users.teacher_id = teachers.id WHERE users.id =' + id ;

  return new Promise(async (resolve) => {
    pool.execute(query, [id])
    .then((data) => {
      //untuk passing data antar middleware
      
      console.log(data?.[0])
      res.locals.dataUser = data?.[0]
      next();
    })
    .catch(() => {
      //res.locals.dataUser2 = data?.[0]
      next();
    })
  })
};

//untuk ganti isi dari profile student 
export const updateTeacherProfile = async (req, res) => {
  //tidak bisa edit email, jadi hanya yang lain supaya ke tabel teacher saja 
  let id = req.session.userId;
  const { teacher_id, full_name, email, address, phone_number, rate } = req.body;
  const sql = 'UPDATE teachers SET full_name = ?, address = ?, phone_number = ?, rate = ? WHERE id = ?';
  const values = [full_name, address, phone_number, rate, teacher_id];
  console.log(values)
  try {
    const [result] = await pool.execute(sql, values);
    return res.redirect('/profileTeacher');
  } catch (error) {
    throw new Error(`Error inserting teacher account: ${error}`);
  }
};