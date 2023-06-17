import { getAllCourses } from "../models/course.js";
import { getAvailableSchedules } from "../models/courseMeetings.js"

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