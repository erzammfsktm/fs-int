CREATE DATABASE IF NOT EXISTS internships;
USE internships;

CREATE TABLE coordinators (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE faculty_supervisors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE industry_supervisors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  coordinator_id INT,
  faculty_supervisor_id INT,
  industry_supervisor_id INT,
  FOREIGN KEY (coordinator_id) REFERENCES coordinators(id),
  FOREIGN KEY (faculty_supervisor_id) REFERENCES faculty_supervisors(id),
  FOREIGN KEY (industry_supervisor_id) REFERENCES industry_supervisors(id)
);
