import { pool } from './connection.js';

const dropTeacherQuery = `DROP TABLE IF EXISTS teachers CASCADE`;
const dropUserQuery = `DROP TABLE IF EXISTS users CASCADE`;
const dropRoleQuery = `DROP TABLE IF EXISTS role CASCADE`;
const dropStudentQuery = `DROP TABLE IF EXISTS students CASCADE`;
const dropCourseAvailability = `DROP TABLE IF EXISTS  course_availability CASCADE`;
const dropCourseMeetings = `DROP TABLE IF EXISTS  course_meetings CASCADE`;
const dropCourse = `DROP TABLE IF EXISTS  course CASCADE`;
const dropConstraintsQuery = `
  ALTER TABLE course_meetings DROP FOREIGN KEY fk_course_meetings_teacher;

  ALTER TABLE course_meetings DROP FOREIGN KEY fk_course_meetings_student;

  ALTER TABLE course_availability DROP FOREIGN KEY fk_course_availalibity_teacher;

  ALTER TABLE teachers DROP FOREIGN KEY fk_user_create_course;

  ALTER TABLE users DROP FOREIGN KEY fk_user_role;
  ALTER TABLE users DROP FOREIGN KEY fk_user_teacher;
  ALTER TABLE users DROP FOREIGN KEY fk_user_student;
`;


const createCourse = `CREATE TABLE IF NOT EXISTS course(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255)
)`;

const createCourseAvailability = `CREATE TABLE IF NOT EXISTS course_availability(
  teacher_id INTEGER,
  day SMALLINT,
  time VARCHAR(5),

  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  PRIMARY KEY (teacher_id, day, time)
)`;

const createTeacherQuery = `CREATE TABLE IF NOT EXISTS teachers (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  photo VARCHAR(255),
  full_name VARCHAR(255),
  address VARCHAR(255),
  phone_number VARCHAR(20),
  expertise VARCHAR(255),
  rate DECIMAL(10, 2),
  course_id INTEGER,
  FOREIGN KEY (course_id) REFERENCES course(id)
)`;

const createRoleQuery = `CREATE TABLE IF NOT EXISTS role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(255)
)`;

const createUserQuery = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  password VARCHAR(150),
  role_id INTEGER,
  teacher_id INTEGER,
  student_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  CONSTRAINT user_uq UNIQUE(email)
)`;

const createStudentQuery = `CREATE TABLE IF NOT EXISTS students (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  photo VARCHAR(255),
  full_name VARCHAR(255),
  school VARCHAR(255),
  phone_number VARCHAR(20),
  level VARCHAR(20)
)`;

const createCourseMeetings = `CREATE TABLE IF NOT EXISTS course_meetings(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  student_id INTEGER,
  teacher_id INTEGER,
  datetime DATETIME,
  link VARCHAR(255),

  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  CONSTRAINT u_course_meetings UNIQUE KEY (teacher_id, datetime)
)`;


const executeQuery = async (query) => {
  try {
    await pool.execute(query);
  } catch (error) {
    console.error(error);
    // throw error;
  }
};


const createTables = async () => {
  try {
    // await executeQuery(dropConstraintsQuery);
    await executeQuery(dropCourseAvailability);
    await executeQuery(dropCourseMeetings);
    await executeQuery(dropCourse);
    await executeQuery(dropUserQuery);
    await executeQuery(dropTeacherQuery);
    await executeQuery(dropStudentQuery);
    await executeQuery(dropRoleQuery);

    await executeQuery(createRoleQuery);
    console.log('---- Role table created');

    await executeQuery(createCourse);
    console.log('---- createCourse table created');

    await executeQuery(createTeacherQuery);
    console.log('====================================');
    console.log('---- Teachers table created');

    await executeQuery(createStudentQuery);
    console.log('---- Students table created');

    await executeQuery(createUserQuery);
    console.log('---- Users table created');

    await executeQuery(createCourseAvailability);
    console.log('---- CourseAvailability table created');

    await executeQuery(createCourseMeetings);
    console.log('---- CourseMeetings table created');

    console.log('---- DATABASE CREATED');
    console.log('====================================');
  } catch (err) {
    console.log(err);
  } finally {
    pool.end();
  }
};

createTables();
