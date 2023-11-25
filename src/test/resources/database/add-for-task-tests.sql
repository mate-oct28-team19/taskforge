INSERT INTO users(id, email, password, language, color_scheme, enabled) VALUE
(1, 'arsenbuter@gmail.com', '$2a$10$ntvMPyd53LJwgUCV5KGx1eNwA/WTReip1vnWXxgJene/KbqEw4Q3m', 'ENGLISH', 'LIGHT', true);
INSERT INTO tasks (id, title, creation_date, status, user_id) VALUES
(1, 'Task 1', '2023-10-25', 'IN_PROCESS', 1),
(2, 'Task 2', '2023-10-25', 'DONE', 1),
(3, 'Task 3', '2023-11-25', 'DONE', 1);
