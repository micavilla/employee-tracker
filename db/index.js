const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
function displayMenu() {
  inquirer.prompt([
    {
      name: 'homescreen',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
      pageSize: 8,
    },
    ])
      .then((answers) =>{
        var userChoice = answers.homescreen;
        console.log("This is my user choice " + userChoice);
        if(userChoice == "View All Employees") {
          console.log("You chose the view employee option");
          displayMenu();
        } else if(userChoice == "Add Employee") {
          console.log("You chose the add employee route");
          inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Please enter employee first name!"
            },
            {
                type: "input",
                name: "lastName",
                message: "Please enter employee last name!"
            },
          ])
          .then((employeeAnswer) =>{
            const firstName = employeeAnswer.firstName;
            const lastName = employeeAnswer.lastName;
            console.log("Employee First Name: " + firstName);
            console.log("Employee Last Name: " + lastName);
            displayMenu();
          })
        } else if(userChoice == "Update Employee Role") {
          console.log("You chose the update employee route");
          displayMenu();
        } else if(userChoice == "View all Roles") {
          console.log("You chose the view all roles route");
          displayMenu();
        } else if(userChoice == "Add Role") {
          console.log("You chose the add role route");
          displayMenu();
        } else if(userChoice == "View All Departments") {
          console.log("You chose the view all department routes");
          displayMenu();
        } else if(userChoice == "Add Department") {
          console.log("What is the name of the department?");
          displayMenu();
        } else if(userChoice == "Quit") {
          console.log("You chose the quit route");
          return;
        }
    })
}
displayMenu();