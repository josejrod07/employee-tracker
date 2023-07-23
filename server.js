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
    });
});