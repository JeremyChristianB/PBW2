import { pool } from './connection.js';

const dropTeacherQuery = `DROP TABLE IF EXISTS teachers CASCADE`;
const dropUserQuery = `DROP TABLE IF EXISTS users CASCADE`;
const dropRoleQuery = `DROP TABLE IF EXISTS role CASCADE`;
const dropStudentQuery = `DROP TABLE IF EXISTS students CASCADE`;

const createTeacherQuery = `CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    address VARCHAR(255),
    phone_number VARCHAR(20),
    expertise VARCHAR(255),
    rate DECIMAL(10, 2)
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
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_user_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    CONSTRAINT email UNIQUE(email)
)`;

const createStudentQuery = `CREATE TABLE IF NOT EXISTS students (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  sekolah VARCHAR(255),
  phone_number VARCHAR(20),
  kelas VARCHAR(20)
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
    await executeQuery(dropUserQuery);
    await executeQuery(dropTeacherQuery);
    await executeQuery(dropStudentQuery);
    await executeQuery(dropRoleQuery);

    await executeQuery(createRoleQuery);
    console.log('---- Role table created');

    await executeQuery(createTeacherQuery);
    console.log('====================================');
    console.log('---- Teachers table created');

    await executeQuery(createStudentQuery);
    console.log('---- Students table created');

    await executeQuery(createUserQuery);
    console.log('---- Users table created');

    console.log('---- DATABASE CREATED');
    console.log('====================================');
  } catch (err) {
    console.log(err);
  } finally {
    pool.end();
  }
};

createTables();
