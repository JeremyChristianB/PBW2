import express from 'express';
import { deleteCourseMeetingByIdHandler, getAvailableCourseNameHandler, getCourseAvailabilityHandler, joinCourseMeetingByIdHandler } from '../controllers/CourseController.js';
import { getUserDataHandler } from '../controllers/ChartController.js'
import { getTeacherClassesHandler, searchTeacherNameHandler } from '../controllers/AccountController.js';
import { checkAuthentication } from '../middlewares/session.js';

const apiRoutes = express.Router();

apiRoutes.get('/available-courses', getCourseAvailabilityHandler);
apiRoutes.get('/courses', getAvailableCourseNameHandler);
apiRoutes.get('/chart-data', getUserDataHandler);
apiRoutes.get('/search-teacher-by-name', searchTeacherNameHandler)
apiRoutes.post('/exit-class', deleteCourseMeetingByIdHandler)
apiRoutes.post('/join-class', joinCourseMeetingByIdHandler)
apiRoutes.get('/teacher-classes', getTeacherClassesHandler)


export default apiRoutes;
