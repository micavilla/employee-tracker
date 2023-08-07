-- Drops and creates company database
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

-- Uses company database
USE company_db;

-- Creates department table with ID and department name columns
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Creates roles table with ID, title, salary, and department ID columns
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);

-- Creates employees table with ID, first name, last name, role ID, and manager ID columns
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (manager_id)
  REFERENCES employees(id),
  FOREIGN KEY (role_id)
  REFERENCES roles (id)
  ON DELETE CASCADE
);