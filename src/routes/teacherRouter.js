import express from 'express';
import { checkAuthorization } from '../middlewares/session.js';
import CONSTANT from '../config/constant.js';
import { updateTeacherProfile } from '../models/teacher.js';

const teacherRoutes = express.Router();

teacherRoutes.get('/teacher', checkAuthorization(CONSTANT.ROLE.TEACHER), (req, res) => {
  res.render('teacher/homepageTeacher');
});

teacherRoutes.post('/teachers/edit', updateTeacherProfile);

export default teacherRoutes;
