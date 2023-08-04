const inquirer = require('inquirer');
const connect = require('./connection')

function displayMenu() {
  inquirer.prompt([
    {
      name: 'homescreen',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View all Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    },
  ])
    .then((response) =>{
      var userChoice = response.homescreen;
      console.log("This is my user choice " + userChoice);
      if(userChoice == "View All Employees") {
        console.log("You chose the view employee option");
        const viewAllEmployeesQuery = `SELECT employees.id AS id, employees.first_name AS first_name, employees.last_name AS last_name, roles.title AS title, department.department_name AS department, roles.salary AS salary, CONCAT(managers.first_name, " ", managers.last_name) AS manager
        FROM employees
        JOIN roles ON employees.role_id = roles.id
        JOIN department ON roles.department_id = department.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`;
        connect.query(viewAllEmployeesQuery, function (err, results) {
          if (err) throw err;
          console.table(results);
          displayMenu();
        })
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
          {
            type: "list",
            name: "roleID",
            message: "Please select employee role!",
            choices: ["Software Engineer", "Accountant", "Lawyer"]
          },
          {
            type: "list",
            name: "manager",
            message: "Please select employee role!",
            choices: ["Michael Scott", "Jim Halpert"]
          },
        ])
          .then((response) => {
            const firstName = response.firstName;
            const lastName = response.lastName;
            const role = response.roleID;
            const manager = response.manager;
            if (role == "Software Engineer") {
              idNum = 3;
            } else if (role == "Accountant") {
              idNum = 4;
            } else if (role == "Lawyer") {
              idNum = 5;
            };
            if (manager == "Michael Scott") {
              mgNum = 1;
            } else if (manager == "Jim Halpert") {
              mgNum = 2;
            };
            console.log("Employee First Name: " + firstName);
            console.log("Employee Last Name: " + lastName);
            const addEmployee = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
            connect.query(addEmployee, [firstName, lastName, idNum, mgNum], function (err, results) {
              if (err) throw err;
              console.log("Employee added successfully!");
              displayMenu();
            })
          })
      } else if (userChoice == "Update Employee Role") {
        console.log("You chose the update employee route");
        inquirer.prompt([
          {
            type: "list",
            name: "eeName",
            message: "Please select which employee you would like to update",
            choices: ["Michael Scott", "Jim Halpert", "Dwight Schrute", "Pam Beasley", "Kevin Malone"]
          },
          {
            type: "list",
            name: "eeRole",
            message: "Please select the employee's new role",
            choices: ["Sales Lead", "Lead Engineer", "Software Engineer", "Accountant", "Lawyer"]
          },
        ])
          .then((response) => {
            eeName = response.eeName;
            eeRole = response.eeRole;
            if (eeRole == "Sales Lead") {
              roleID = 1;
            } else if (eeRole == "Lead Engineer") {
              roleID = 2;
            } else if (eeRole == "Software Engineer") {
              roleID = 3;
            } else if (eeRole == "Accountant") {
              roleID = 4;
            } else if (eeRole == "Lawyer") {
              roleID = 5;
            };
            const updateEmployee = `UPDATE employees
            SET role_id = ?
            WHERE CONCAT(first_name, ' ', last_name) = ?`;
            connect.query(updateEmployee, [roleID, eeName], function (err, results) {
              if (err) throw err;
              console.log("Employee role updated successfully!");
              displayMenu();
            })
          })
      } else if (userChoice == "View all Roles") {
        console.log("You chose the view all roles route");
        const viewAllRolesQuery = `SELECT roles.id AS id, roles.title AS title, department.department_name AS department, roles.salary AS salary
        FROM department
        JOIN roles ON department.id = roles.department_id;`;
        connect.query(viewAllRolesQuery, function (err, results) {
          if (err) throw err;
          console.table(results);
          displayMenu();
        })
      } else if (userChoice == "Add Role") {
        console.log("You chose the add role route");
        inquirer.prompt([
          {
            type: "input",
            name: "newRole",
            message: "Please enter the new role"
          },
          {
            type: "number",
            name: "salary",
            message: "Please enter the new role's salary"
          },
          {
            type: "list",
            name: "deptID",
            message: "Please select the new role's department",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
          },
        ])
          .then((response) => {
            const newRole = response.newRole;
            const salary = response.salary;
            const dept = response.deptID;
            if (dept === "Sales") {
              deptNum = 1;
            } else if (dept === "Engineering") {
              deptNum = 2;
            } else if (dept === "Finance") {
              deptNum = 3;
            } else if (dept === "Legal") {
              deptNum = 4;
            }
            const addRole = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            connect.query(addRole, [newRole, salary, deptNum], function (err, results) {
              if (err) throw err;
              console.log("Role added successfully!");
              displayMenu();
            })
          })
      } else if (userChoice == "View All Departments") {
        console.log("You chose the view all department routes");
        const viewAllDepts = `SELECT * FROM department`;
        connect.query(viewAllDepts, function (err, results) {
          if (err) throw err;
          console.table(results);
          displayMenu();
        })
      } else if (userChoice == "Add Department") {
        console.log("What is the name of the department?");
        inquirer.prompt([
          {
            type: "input",
            name: "deptName",
            message: "Please enter the new department"
          },
        ])
          .then((response) => {
            const deptName = response.deptName;

            const addDept = `INSERT INTO department (department_name) VALUES (?)`;
            connect.query(addDept, [deptName], function (err, results) {
              if (err) throw err;
              console.log("New department added successfully!");
              displayMenu();
            })
          })
      } else if(userChoice == "Quit") {
        console.log("You chose the quit route");
        return;
      }
    })
}

displayMenu();