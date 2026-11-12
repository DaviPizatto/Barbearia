DELETE FROM users;
ALTER TABLE users AUTO_INCREMENT = 1;

INSERT INTO users (username, password, tipo) VALUES
('Davi',  '$2b$12$ZB7EwMdbzLZAHHSfJULrQ.jZIl2jTXDVo9sL07rGFFi7EODT4colm', 'adm'),
('Bruno', '$2b$12$ZB7EwMdbzLZAHHSfJULrQ.jZIl2jTXDVo9sL07rGFFi7EODT4colm', 'adm'),
('Bianca','$2b$12$ZB7EwMdbzLZAHHSfJULrQ.jZIl2jTXDVo9sL07rGFFi7EODT4colm', 'adm'),
('André', '$2b$12$ZB7EwMdbzLZAHHSfJULrQ.jZIl2jTXDVo9sL07rGFFi7EODT4colm', 'adm'),
('Igor',  '$2b$12$ZB7EwMdbzLZAHHSfJULrQ.jZIl2jTXDVo9sL07rGFFi7EODT4colm', 'adm');

SET SQL_SAFE_UPDATES = 0;