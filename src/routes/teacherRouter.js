import express from 'express';
import { checkAuthorization } from '../middlewares/session.js';
import CONSTANT from '../config/constant.js';

const teacherRoutes = express.Router();

teacherRoutes.get('/teacher', checkAuthorization(CONSTANT.ROLE.TEACHER), (req, res) => {
  res.render('teacher/homepageTeacher');
});

teacherRoutes.get('/teacher', checkAuthorization(CONSTANT.ROLE.TEACHER), (req, res) => {
  res.render('basic/hompage');
});


export default teacherRoutes;
