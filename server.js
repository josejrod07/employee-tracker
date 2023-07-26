// Required packages
const connection = require('./config/connection');
const inquirer = require('inquirer');
const express = require('express');

// Express server instance
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows connection to mysql database using .env file
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database');
        mainMenu();
    });
});

// Inquirer prompts

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do today?',
            choices: [
                {
                    name: 'View all departments',
                },
                {
                    name: 'View all roles',
                },
                {
                    name: 'View all employees',
                },
                {
                    name: 'Add a department',
                },
                {
                    name: 'Remove a department',
                },
                {
                    name: 'Add a role',
                },
                {
                    name: 'Remove a role',
                },
                {
                    name: 'Add an employee',
                },
                {
                    name: 'Remove an employee',
                },
                {
                    name: 'Update an employee role',
                },
                {
                    name: 'Exit',
                }
            ]
        }
    ]).then((answer) => {
        var choice = answer.mainMenu;
        switch (choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Remove a department':
                removeDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Remove a role':
                removeRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Remove an employee':
                removeEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                connection.end();
        }
    });
};

const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the new department?'
        }
    ]).then((answer) => {
        connection.query('INSERT INTO department SET ?', { name: answer.newDepartment }, (err, res) => {
            if (err) throw err;
            console.log('Department added!');
            mainMenu();
        });
    });
};

const removeDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeDepartment',
                message: 'Which department would you like to remove?',
                choices: res.map(department => department.name)
            }
        ]).then((answer) => {
            connection.query('DELETE FROM department WHERE ?', { name: answer.removeDepartment }, (err, res) => {
                if (err) throw err;
                console.log('Department removed!');
                mainMenu();
            });
        });
    });
};

const addRole = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the name of the new role?'
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'What is the salary of the new role?'
            },
            {
                type: 'list',
                name: 'newDepartment',
                message: 'What department does the new role belong to?',
                choices: res.map(department => department.id)
            }
        ]).then((answer) => {
            connection.query('INSERT INTO role SET ?', { title: answer.newRole, salary: answer.newSalary, department_id: answer.newDepartment }, (err, res) => {
                if (err) throw err;
                console.log('Role added!');
                mainMenu();
            });
        });
    });
};

const removeRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeRole',
                message: 'Which role would you like to remove?',
                choices: res.map(role => role.title)
            }
        ]).then((answer) => {
            connection.query('DELETE FROM role WHERE ?', { title: answer.removeRole }, (err, res) => {
                if (err) throw err;
                console.log('Role removed!');
                mainMenu();
            });
        });
    });
};

const addEmployee = () => {
    connection.query('SELECT * FROM role', (err, roleRes) => {
      if (err) throw err;
  
      connection.query('SELECT * FROM employee', (err, empRes) => {
        if (err) throw err;
  
        inquirer.prompt([
          {
            type: 'input',
            name: 'newEmployeeFirstName',
            message: 'What is the first name of the new employee?'
          },
          {
            type: 'input',
            name: 'newEmployeeLastName',
            message: 'What is the last name of the new employee?'
          },
          {
            type: 'list',
            name: 'newEmployeeRole',
            message: 'What is the role of the new employee?',
            choices: roleRes.map(role => role.title)
          },
          {
            type: 'list',
            name: 'newEmployeeManager',
            message: 'Who is the manager of the new employee?',
            choices: empRes.map(employee => employee.first_name + ' ' + employee.last_name)
          }
        ]).then((answer) => {
          // Find the role ID based on the selected role title
          const selectedRole = roleRes.find(role => role.title === answer.newEmployeeRole);
  
          // Find the manager ID based on the selected manager name
          const selectedManager = empRes.find(employee => employee.first_name + ' ' + employee.last_name === answer.newEmployeeManager);
  
          // Insert the new employee into the database with the correct role_id and manager_id
          connection.query('INSERT INTO employee SET ?', {
            first_name: answer.newEmployeeFirstName,
            last_name: answer.newEmployeeLastName,
            role_id: selectedRole.id,
            manager_id: selectedManager ? selectedManager.id : null // Use null if no manager is selected
          }, (err, res) => {
            if (err) throw err;
            console.log('Employee added!');
            mainMenu();
          });
        });
      });
    });
  };
  

const removeEmployee = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'removeEmployee',
                message: 'Which employee would you like to remove?',
                choices: res.map(employee => employee.first_name + ' ' + employee.last_name)
            }
        ]).then((answer) => {
            connection.query('DELETE FROM employee WHERE ?', { first_name: answer.removeEmployee }, (err, res) => {
                if (err) throw err;
                console.log('Employee removed!');
                mainMenu();
            });
        });
    });
};

const updateEmployeeRole = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        console.table(res);
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'updateEmployee',
                message: 'Enter the id of the employee you would like to update: ',
            },
            {
                type: 'input',
                name: 'updateRole',
                message: 'Enter the id of the new role: ',
            },
        ]).then((answer) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.updateRole, answer.updateEmployee], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated!');
            mainMenu();
            });
        });
    });
};