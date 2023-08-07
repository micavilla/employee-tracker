// Imports inquirer, console.table Node packages, and mysql connection module
const inquirer = require('inquirer');
const connect = require('./db/connection')
require('console.table');

// Function to display menu and to be called again inside every task function
function displayMenu() {
  inquirer.prompt([
    // List of task options user can choose from
    {
      name: 'menu',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },
  ])
    .then((response) => {
      var userChoice = response.menu;
      if (userChoice == "View All Employees") {
        // Query joins employee data
        const viewAllEmps = `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN department ON roles.department_id = department.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`;
        connect.query(viewAllEmps, function (err, results) {
          if (err) throw err;
          console.table(results);
          displayMenu();
        });
      } else if (userChoice == "Add Employee") {
        // Query selects all roles as choices for new employee
        connect.query('SELECT * FROM roles', (err, data) => {
          const roleList = data.map((role) => ({
            name: `${role.title}`,
            value: role.id
          }))
          inquirer.prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?"
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?"
            },
            {
              type: "list",
              name: "roleID",
              message: "What is the employee's role?",
              choices: roleList
            },
            {
              type: "list",
              name: "manager",
              message: "Who is the employee's manager?",
              choices: ['Michael Scott', 'Jim Halpert', 'None']
            },
          ])
            .then((response) => {
              const firstName = response.firstName;
              const lastName = response.lastName;
              const roleID = response.roleID;
              // Links manager to respective manager ID
              const manager = response.manager;
              if (manager == "Michael Scott") {
                mgNum = 1;
              } else if (manager == "Jim Halpert") {
                mgNum = 2;
              } else if (manager == "None") {
                mgNum = null;
              };
              // Query creates new employee with user input data
              const addEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
              connect.query(addEmployee, [firstName, lastName, roleID, mgNum], function (err, results) {
                if (err) throw err;
                console.log("Employee added successfully!");
                displayMenu();
              })
            })
        })
      } else if (userChoice == "Update Employee Role") {
        // Queries select all employees and roles as choices for the user
        connect.query('SELECT * FROM employees', (err, data) => {
          const eeList = data.map((emp) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
          }))
          connect.query('SELECT * FROM roles', (err, data) => {
            const roleList = data.map((role) => ({
              name: `${role.title}`,
              value: role.id
            }))
            inquirer.prompt([
              {
                type: "list",
                name: "eeName",
                message: "Which employee you would like to update?",
                choices: eeList
              },
              {
                type: "list",
                name: "eeRole",
                message: "What is the employee's new role?",
                choices: roleList
              },
            ])
              .then((response) => {
                eeID = response.eeName;
                eeRole = response.eeRole;
                // Query updates employee data
                const updateEmp = `UPDATE employees
                SET role_id = ?
                WHERE id= ?`;
                connect.query(updateEmp, [eeRole, eeID], function (err, results) {
                  if (err) throw err;
                  console.log("Employee role updated successfully!");
                  displayMenu();
                })
              })
          })
        })
      } else if (userChoice == "View all Roles") {
        // Query joins all roles data
        const viewAllRoles = `SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
        FROM department
        JOIN roles ON department.id = roles.department_id;`;
        connect.query(viewAllRoles, function (err, results) {
          if (err) throw err;
          console.table(results);
          displayMenu();
        })
      } else if (userChoice == "Add Role") {
        // Query selects all departments as user options
        connect.query('SELECT * FROM department', (err, data) => {
          const deptList = data.map((dept) => ({
            name: `${dept.department_name}`,
            value: dept.id
          }))
          inquirer.prompt([
            {
              type: "input",
              name: "newRole",
              message: "What is the new role?"
            },
            {
              type: "number",
              name: "salary",
              message: "What is the new role's salary?"
            },
            {
              type: "list",
              name: "deptID",
              message: "What is the new role's department?",
              choices: deptList
            },
          ])
            .then((response) => {
              const newRole = response.newRole;
              const salary = response.salary;
              const deptID = response.deptID;
              // Query creates new role with user input data
              const addRole = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
              connect.query(addRole, [newRole, salary, deptID], function (err, results) {
                if (err) throw err;
                console.log("Role added successfully!");
                displayMenu();
              })
            })
        })
      } else if (userChoice == "View All Departments") {
        // Query selects all departments
        const viewAllDepts = `SELECT * FROM department`;
        connect.query(viewAllDepts, function (err, results) {
          if (err) throw err;
          console.table(results);
          displayMenu();
        })
      } else if (userChoice == "Add Department") {
        inquirer.prompt([
          {
            type: "input",
            name: "deptName",
            message: "What is the new department?"
          },
        ])
          .then((response) => {
            const deptName = response.deptName;
            // Query creates new department with user input data
            const addDept = `INSERT INTO department (department_name) VALUES (?)`;
            connect.query(addDept, [deptName], function (err, results) {
              if (err) throw err;
              console.log("New department added successfully!");
              displayMenu();
            })
          })
        // Ends the menu
      } else if (userChoice == "Quit") {
        console.log("Thank you!");
        return;
      }
    })
}

// Calls the initial display of menu
displayMenu();