DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- The department table stores data for all departments.
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL -- The name column stores the name of each department. The UNIQUE constraint ensures that no two departments have the same name.
);

-- The role table stores data for all roles.
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL, -- The title column stores the name of the role.
  salary DECIMAL (15, 2) NOT NULL, -- The salary column stores the salary for each role.
  department_id INT UNSIGNED NOT NULL, -- The department_id column stores the id of the department to which the role belongs.
  INDEX dep_ind (department_id), -- This index is needed to improve performance when joining the role table with the department table.
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE -- The foreign key constraint ensures that the department_id value must exist in the department table. If the department is deleted, the department_id value of the role is set to NULL.
);

-- The employee table stores data for all employees.
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL, -- The role_id column stores the id of the role to which the employee belongs.
  INDEX role_ind (role_id), -- This index is needed to improve performance when joining the employee table with the role table.
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE, -- The foreign key constraint ensures that the role_id value must exist in the role table.
  manager_id INT UNSIGNED, -- The manager_id column stores the id of the employee's manager.
  INDEX man_ind (manager_id), -- This index is needed to improve performance when joining the employee table with itself.
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL -- The foreign key constraint ensures that the manager_id value must exist in the employee table. If the manager is deleted, the manager_id value of the employee is set to NULL.
);
