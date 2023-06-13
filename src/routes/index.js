import express from 'express';
import { notForLoggedIn } from '../middlewares/session.js';

const router = express.Router();

// Route for the home page
router.get('/', (req, res) => {
  res.render('basic/homepage');
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

// Route for the homepageStudent page
router.get('/homepageStudent', (req, res) => {
  res.render('student/homepageStudent');
});

// Route for the listclassStudent page
router.get('/listclassStudent', (req, res) => {
  res.render('student/listclassStudent');
});

// Route for the profileStudent page
router.get('/profileStudent', (req, res) => {
  res.render('student/profileStudent');
});

// Route for the joinClass page
router.get('/joinClass', (req, res) => {
  res.render('student/joinClass');
});


// Route for the listKelasTeacher page
router.get('/listClassTeacher', (req, res) => {
  res.render('teacher/listClassTeacher');
});


// Route for the openClass page
router.get('/openClass', (req, res) => {
  res.render('teacher/openClass');
});

// Route for the report page
router.get('/report', (req, res) => {
  res.render('teacher/report');
});

// Router for the homepageTeacher page
router.get('/homepageTeacher', (req, res) => {
  res.render('teacher/homepageTeacher');
});

// Router for the profilTeacher page
router.get('/profilTeacher', (req, res) => {
  res.render('teacher/profilTeacher');
});

export default router;
