INSERT INTO department (department_name)
VALUES
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");
INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Lead", 150000, 1),
  ("Lead Engineer", 200000, 2),
  ("Software Engineer", 300000, 2),
  ("Accountant", 100000, 3),
  ("Lawyer", 400000, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Michael", "Scott", 1, null),
  ("Jim", "Halpert", 2, null),
  ("Dwight", "Schrute", 3, 2),
  ("Pam", "Beasley", 4, 1),
  ("Kevin", "Malone", 5, 1);