USE employee_db;

INSERT INTO department (name)
VALUES
    ('Marketing'),
    ('Product Development'),
    ('Human Resources'),
    ('Operations');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Marketing Manager', 110000, 1),
    ('Marketing Specialist', 90000, 1),
    ('Senior Developer', 140000, 2),
    ('Junior Developer', 110000, 2),
    ('HR Manager', 155000, 3),
    ('HR Coordinator', 120000, 3),
    ('Operations Manager', 175000, 4),
    ('Operations Analyst', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Emily', 'Johnson', 1, NULL),
    ('Ryan', 'Smith', 2, 1),
    ('Sophia', 'Garcia', 3, NULL),
    ('Daniel', 'Lee', 4, 3),
    ('Olivia', 'Miller', 5, NULL),
    ('Ethan', 'Brown', 6, 5),
    ('Ava', 'Wilson', 7, NULL),
    ('Noah', 'Anderson', 8, 7);

