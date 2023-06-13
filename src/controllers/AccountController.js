import bcrypt from 'bcrypt';
import express from 'express';
import CONSTANT from '../config/constant.js';
import { getConnection } from '../config/connection.js';
import { insertUserData, getUserData } from '../models/user.js'
import { insertTeacherAccount } from '../models/teacher.js';
import { insertStudentAccount } from '../models/student.js';
import { getTeacherDataById } from '../models/teacher.js';
import { destroySessionAuth, saveSessionAuth} from '../middlewares/session.js';

export const signupTeacher = async (req, res) => {
  try {
    const { nama, address, number, materi, tarif, email, password} = req.body;

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Insert teacher account
    const teacherData = {
      full_name: nama,
      address: address, 
      phone_number: number, 
      expertise: materi,
      rate: tarif,
    };

    let account

    account = await insertTeacherAccount(teacherData);
    console.log('teacher data berhasil di insert', account)


    const userData = {
      email: email, 
      password: hash, 
      role: CONSTANT.ROLE.TEACHER,
      teacher_id: account.insertId,
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
    const { nama, sekolah, number, kelas, email, password} = req.body;

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // Insert student account
    const studentData = {
      full_name: nama,
      sekolah: sekolah, 
      phone_number: number, 
      kelas: kelas,
    };

    let account

    account = await insertStudentAccount(studentData);
    console.log('student data berhasil di insert', account)


    const userData = {
      email: email, 
      password: hash, 
      role: CONSTANT.ROLE.STUDENT,
      teacher_id: null,
    };

    let insertUser

    insertUser = await insertUserData(userData);
    console.log('user data student berhasil di insert')

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

