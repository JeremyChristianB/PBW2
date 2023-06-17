import { pool } from './connection.js';

import bcrypt from 'bcrypt';

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
  date DATETIME,

  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  PRIMARY KEY (teacher_id, date)
)`;

const createTeacherQuery = `CREATE TABLE IF NOT EXISTS teachers (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  photo VARCHAR(255),
  full_name VARCHAR(255),
  address VARCHAR(255),
  phone_number VARCHAR(20),
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

const insertDummyData = async () => {
  try {
    // Insert dummy data for the role table
    const insertCourse = `
      INSERT INTO course (nama)
      VALUES
      ('Matematika'),
      ('Kimia'),
      ('Fisika'),
      ('Biologi')
    `;
    await executeQuery(insertCourse);
    console.log('---- Dummy data inserted for the courses table');

    const insertRoles = `
      INSERT INTO role (id, role_name) VALUES
      (1, 'Teacher'),
      (2, 'Student')
    `;
    await executeQuery(insertRoles);
    console.log('---- Dummy data inserted for the role table');

    // Insert dummy data for the teachers table
    const insertTeachers = `
      INSERT INTO teachers (photo, full_name, address, phone_number, expertise, rate, course_id)
      VALUES
      ('teacher1.jpg', 'John Doe', '123 Main St', '123-456-7890', 'Mathematics', 50.00, 1),
      ('teacher2.jpg', 'Jane Smith', '456 Elm St', '987-654-3210', 'Science', 40.00, 2),
      ('teacher3.jpg', 'Robert Johnson', '789 Oak St', '555-111-2222', 'Physics', 45.00, 3),
      ('teacher4.jpg', 'Sarah Davis', '321 Maple Ave', '555-333-4444', 'Mathematics', 50.00, 1),
      ('teacher5.jpg', 'Michael Wilson', '555 Pine St', '555-777-8888', 'Biology', 35.00, 4)
    `;
    await executeQuery(insertTeachers);
    console.log('---- Dummy data inserted for the teachers table');

    // Insert dummy data for the students table
    const insertStudents = `
      INSERT INTO students (photo, full_name, school, phone_number, level)
      VALUES
      ('student1.jpg', 'Alice Johnson', 'ABC School', '555-123-4567', 'High School'),
      ('student2.jpg', 'Bob Williams', 'XYZ School', '555-987-6543', 'Middle School'),
      ('student3.jpg', 'Eva Davis', 'PQR School', '555-444-3333', 'Elementary School'),
      ('student4.jpg', 'Michael Brown', 'DEF School', '555-777-8888', 'High School'),
      ('student5.jpg', 'Laura Lee', 'GHI School', '555-999-0000', 'Middle School')
    `;
    await executeQuery(insertStudents);
    console.log('---- Dummy data inserted for the students table');

    // Insert dummy data for the users table
    const insertUsers = `
    INSERT INTO users (email, password, role_id, teacher_id, student_id)
    VALUES
    ('teacher1@example.com', '${await bcrypt.hash('password1', 10)}', 1, 1, NULL),
    ('teacher2@example.com', '${await bcrypt.hash('password1', 10)}', 1, 2, NULL),
    ('teacher3@example.com', '${await bcrypt.hash('password1', 10)}', 1, 3, NULL),
    ('teacher4@example.com', '${await bcrypt.hash('password1', 10)}', 1, 4, NULL),
    ('teacher5@example.com', '${await bcrypt.hash('password1', 10)}', 1, 5, NULL),
    ('student1@example.com', '${await bcrypt.hash('password2', 10)}', 2, NULL, 1),
    ('student2@example.com', '${await bcrypt.hash('password2', 10)}', 2, NULL, 2),
    ('student3@example.com', '${await bcrypt.hash('password2', 10)}', 2, NULL, 3),
    ('student4@example.com', '${await bcrypt.hash('password2', 10)}', 2, NULL, 4),
    ('student5@example.com', '${await bcrypt.hash('password2', 10)}', 2, NULL, 5)
  `;  
    await executeQuery(insertUsers);
    console.log('---- Dummy data inserted for the users table');

    // Insert dummy data for the course_availability table
    const insertCourseAvailability = `
      INSERT INTO course_availability (teacher_id, date)
      VALUES
      (1, '2023-06-01 10:00:00'),
      (2, '2023-06-01 10:00:00'),
      (3, '2023-06-01 10:00:00'),
      (4, '2023-06-01 10:00:00'),
      (5, '2023-06-01 10:00:00')
    `;
    await executeQuery(insertCourseAvailability);
    console.log('---- Dummy data inserted for the course_availability table');

    // Insert dummy data for the course_meetings table
    const insertCourseMeetings = `
      INSERT INTO course_meetings (student_id, teacher_id, datetime, link)
      VALUES
      (1, 1, '2023-06-01 10:00:00', 'https://zoom.us/teacher1-meeting'),
      (2, 2, '2023-06-02 15:00:00', 'https://zoom.us/teacher2-meeting'),
      (3, 3, '2023-06-03 12:00:00', 'https://zoom.us/teacher3-meeting'),
      (4, 4, '2023-06-04 11:00:00', 'https://zoom.us/teacher4-meeting'),
      (5, 5, '2023-06-05 14:00:00', 'https://zoom.us/teacher5-meeting')
    `;
    await executeQuery(insertCourseMeetings);
    console.log('---- Dummy data inserted for the course_meetings table');
  } catch (err) {
    console.log(err);
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
    console.log('---- Courses table created');

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

    await insertDummyData();

    console.log('---- DATABASE CREATED');
    console.log('====================================');
  } catch (err) {
    console.log(err);
  } 
};



createTables();


