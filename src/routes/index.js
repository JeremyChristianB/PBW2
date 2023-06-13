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

export default router;
