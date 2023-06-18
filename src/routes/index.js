import express from 'express';
import { notForLoggedIn } from '../middlewares/session.js';
import { showTeacherProfile } from '../models/teacher.js';
import { showStudentProfile } from '../models/student.js';
import { checkAuthorization } from '../middlewares/session.js';

const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
  let isLogin = req.session.auth; //untuk cek kalau sudah login, supaya tombolnya jadi logout
  res.render('basic/homepage', {isLogin : isLogin});
});

// Route for the login page
router.get('/login', notForLoggedIn(), (req, res) => {
  res.render('basic/login');
});

// Route for the signup page
router.get('/signup', notForLoggedIn(), (req, res) => {
  res.render('basic/signup');
});

// Route for the signupGuru page
router.get('/signupTeacher', notForLoggedIn(), (req, res) => {
  res.render('teacher/signupTeacher');
});

// Route for the signupSiswa page
router.get('/signupStudent', notForLoggedIn(), (req, res) => {
  res.render('student/signupStudent');
});

// Route for the homepageStudent page, cek authorization
router.get('/homepageStudent', checkAuthorization(2, '/'), (req, res) => {
  res.render('student/homepageStudent');
});

// Route for the listclassStudent page
router.get('/listclassStudent',checkAuthorization(2, '/'), (req, res) => {
  res.render('student/listclassStudent');
});


// Route for the joinClass page
router.get('/joinClass',checkAuthorization(2, '/'), (req, res) => {
  res.render('student/joinClass');
});


// Route for the listKelasTeacher page
router.get('/listClassTeacher', checkAuthorization(1, '/'), (req, res) => {
  res.render('teacher/listClassTeacher');
});


// Route for the openClass page
router.get('/openClass',checkAuthorization(1, '/'), (req, res) => {
  res.render('teacher/openClass');
});

// Route for the report page
router.get('/report',checkAuthorization(1, '/'), (req, res) => {
  res.render('teacher/report');
});

// Router for the homepageTeacher page
router.get('/homepageTeacher', checkAuthorization(1, '/'), (req, res) => {
  res.render('teacher/homepageTeacher');
});

// Router for the profileTeacher page
router.get('/profileTeacher',checkAuthorization(1, '/'), showTeacherProfile, (req, res) => {
  res.render('teacher/profileTeacher', {data: res.locals.dataUser[0]});
});

// Router for the profileStudent page
router.get('/profileStudent',checkAuthorization(2, '/'), showStudentProfile, (req, res) => {
  // console.log(res.locals.dataUser2);
  res.render('student/profileStudent', {data: res.locals.dataUser2[0]});

});

//editClass
router.get('/editClass',checkAuthorization(1, '/'),(req, res) => {
  res.render('teacher/editClass');
});
export default router;
