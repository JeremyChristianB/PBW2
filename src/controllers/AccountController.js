import bcrypt from 'bcrypt';
import express from 'express';
import CONSTANT from '../config/constant.js';
import { getConnection } from '../config/connection.js';
import { insertUserData, getUserData } from '../models/user.js'
import { insertTeacherAccount} from '../models/teacher.js';
import { insertStudentAccount } from '../models/student.js';
import { getTeacherDataById } from '../models/teacher.js';
import { destroySessionAuth, saveSessionAuth} from '../middlewares/session.js';
import { insertCourse } from '../models/course.js'

// import multer from 'multer';

// // Untuk handle file upload menggunakan library multer
// export const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'public/uploads/')
//         },
//         filename: (req, file, cb) => {
//             const unique = Date.now();
//             cb(null, `${file.fieldname}_${unique}_${file.originalname.slice(file.originalname.length-5)}`);
//         }
//     })
// });

export const signupTeacher = async (req, res) => {
  try {
    const { photo , nama, address, number, materi, tarif, email, password, course_id} = req.body;

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Insert teacher account
    const teacherData = {
      photo:1,
      full_name: nama,
      address: address, 
      phone_number: number, 
      expertise: materi,
      rate: tarif,
      course_id: null

    };
    console.log(teacherData)
    let account

    account = await insertTeacherAccount(teacherData);
    console.log('teacher data berhasil di insert', account)


    const userData = {
      email: email, 
      password: hash, 
      role: CONSTANT.ROLE.TEACHER,
      teacher_id: account.insertId,
      student_id: null
    };

    let insertUser

    insertUser = await insertUserData(userData);
    console.log('user data teacher berhasil di insert')

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while saving the data');
  }
};


export const signupStudent = async (req, res) => {
  try {
    const { photo, nama, school, number, level, email, password} = req.body;
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const img = req.file.filename;
    console.log(req.file)
    // Insert student account
    const studentData = {
      photo: img,
      full_name: nama,
      school: school, 
      phone_number: number, 
      level: level,
    };
  console.log(studentData)
    let account

    account = await insertStudentAccount(studentData);
    console.log('student data berhasil di insert', account)


    const userData2 = {
      email: email, 
      password: hash, 
      role: CONSTANT.ROLE.STUDENT,
      teacher_id: null,
      student_id: account.insertId
    };

    let insertUser2

    insertUser2 = await insertUserData(userData2);
    console.log('user data student berhasil di insert', insertUser2)

    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while saving the data');
  }
};


export const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    const user = await getUserData(email)

    if (!user){
      return res.status(404).send({
        message: 'user not found'
      })
    }

    console.log(user)

    if(!bcrypt.compareSync(password, user.password)){
      return res.status(401).send({
        message: 'wrong password'
      })
    }

    saveSessionAuth(req, user.id, user.role_id);
    req.session.save(function(err) {
      // session saved
    })    

    if(user.role_id === CONSTANT.ROLE.TEACHER) {
      return res.redirect('/teacher');
    } else {
      return res.redirect('/student');
    }
  } catch (err) {
    console.error(err)
  }
};

export const logout = async (req, res) => {
  console.log('logging out')
  destroySessionAuth(req)
  req.session.save(function(err) {
    // session saved
  })    
  res.redirect('/login'); //kalau ketik account/logout keluarnya ke login lagi
  //res.redirect('/homepage');
}

export const addClass = async (req, res) => {
  try {
    const { nama } = req.body;

    // Insert class

    // const id = await getTeacherDataById(teacher_id)

    const classData = {
      nama: nama,

    };

    Class = await insertClass(classData);
    console.log('class data berhasil di insert', id)

    res.redirect('/listClass');
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while saving the data');
  }
};