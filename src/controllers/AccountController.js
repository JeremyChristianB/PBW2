import bcrypt from 'bcrypt';
import express from 'express';
import CONSTANT from '../config/constant.js';
import { getConnection } from '../config/connection.js';
import { insertUserData, getUserData } from '../models/user.js'
import { insertTeacherAccount} from '../models/teacher.js';
import { insertStudentAccount } from '../models/student.js';
import { destroySessionAuth, saveSessionAuth} from '../middlewares/session.js';
import { insertCourseAvailability } from '../models/CourseAvailability.js';
import { insertCourseMeetings , searchTeacherByName} from '../models/courseMeetings.js';
import { insertCourse } from '../models/course.js'

export const signupTeacher = async (req, res) => {
  try {
    const { nama, address, number, tarif, email, password, course_id} = req.body;

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const img = req.file;
    console.log(req.file)
    // Insert teacher account
    const teacherData = {
      photo: img.filename,
      full_name: nama,
      address: address, 
      phone_number: number, 
      rate: tarif,
      course_id: course_id

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
    const { nama, school, number, level, email, password} = req.body;
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const img = req.file;
    console.log(req.file)
    // Insert student account
    const studentData = {
      photo: img.filename,
      full_name: nama,
      school: school, 
      phone_number: number, 
      level: level,
    };
  // console.log(studentData)
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

    saveSessionAuth(req, user.id, user.role_id, user.teacher_id, user.student_id);
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
  res.redirect(301, '/login'); //kalau ketik account/logout keluarnya ke login lagi
  //res.redirect('/homepage');
}

export const addClass = async (req, res) => {
  try {
    const {  waktu, link } = req.body;

    const teacherId = req.session.teacherId
    console.log(req.session)
    console.log(teacherId);

    const courseMeetingsData = {
      student_id: null,
      teacher_id: teacherId,
      datetime: waktu,
      link: link,
    };

    console.log(courseMeetingsData)

    let courseMeetings;

    courseMeetings = await insertCourseMeetings(courseMeetingsData);
    console.log('courseMeetings data berhasil di insert', courseMeetings);

    res.redirect('/listClassTeacher');
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while saving the data');
  }
};




export const searchTeacherNameHandler = async (req, res, next) => {
  try {
    const name = req.query.nama;
    const queryAll = parseInt(req.query?.all || '0') === 1;
    const student_id = req.session.studentId;
    const data = await searchTeacherByName(name || '', !queryAll ? student_id : '')
    res.json({
      courses: data,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const getTeacherClassesHandler = async (req, res, next) => {
  try {
    const teacher_id = req.session.teacherId;
    const data = await searchTeacherByName('', '', teacher_id)
    res.json({
      courses: data,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
