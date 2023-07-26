# Employee Tracker

This is a Node.js command-line interface application that utilizes Express.js, MYSQL, and the Inquirer package to view and manipulate an employee database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Links](#links)

## Installation

- Clone the repository: git clone https://github.com/josejrod07/employee-tracker.git

## Usage

1. Run `npm install` in the command-line to install the necessary dependencies.
2. Enter the host, user, password, and database information into the environment variable file (.env).
3. Run the command `mysql -u root -p` and enter your MYSQL password.
4. Run `source db/schema.sql` to create the employee_db database.
5. Run `source db/seed.sql` to seed the employee_db database.
6. Run `npm start` to start the server.

## Features

- The Employee Tracker application provides the following features:

- View All Departments: The application displays a formatted table showing all departments' names and department IDs.

- View All Roles: The application displays a formatted table showing job titles, role IDs, the departments each role belongs to, and their respective salaries.

- View All Employees: The application presents a formatted table showing employee data, including employee IDs, first names, last names, job titles, departments, salaries, and the managers to whom employees report.

- Add a Department: Users can add new departments to the database by entering the department name.

- Add a Role: Users can add new roles to the database by entering the role name, salary, and selecting the department to which the role belongs.

- Add an Employee: Users can add new employees to the database by entering the employee's first name, last name, selecting their role, and choosing their manager.

- Update an Employee Role: Users can update an employee's role by selecting the employee and their new role from the available options.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Links

Repository: https://github.com/josejrod07/employee-tracker.git

Video Link: https://drive.google.com/file/d/1z4Msxmr76GxjreZDRR1koK55_x37Ycqu/view