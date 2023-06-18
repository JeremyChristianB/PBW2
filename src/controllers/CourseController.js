import { getAllCourses } from "../models/course.js";
import { deleteCourseMeetingById, getAvailableSchedules, joinCourseMeetingById } from "../models/courseMeetings.js"



export const getCourseAvailabilityHandler = async (req, res, next) => {
  const { course_id } = req.query;
  try {
    const data = await getAvailableSchedules({
      course_id,
    })
    res.json({
      courses: data,
    })
  } catch (error) {
    next(error)
  }
} 

export const getAvailableCourseNameHandler = async (req, res, next) => {
  console.log('haha', req.session)
  try {
    const data = await getAllCourses()
    res.json({
      courses: data,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteCourseMeetingByIdHandler = async (req, res, next) => {
  try {
    const id = req.body.id;
    const data = await deleteCourseMeetingById(id)
    res.json({
      message: 'Ok'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const joinCourseMeetingByIdHandler = async (req, res, next) => {
  try {
    console.log(req.body)
    const id = req.body.id;
    const student_id = req.session.studentId;
    console.log(id, student_id)
    const data = await joinCourseMeetingById(id, student_id);
    res.json({
      message: 'Ok'
    })
  } catch (error) {
    console.error(error)
    next(error)
  }
}