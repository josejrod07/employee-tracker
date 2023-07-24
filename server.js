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