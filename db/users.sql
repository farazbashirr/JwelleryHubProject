CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  createdAt DATETIME
);

INSERT INTO users (fullName, email, password, createdAt) VALUES
(NULL, 'faraz@example.com', '$2b$12$8jqO68TVg/PEFz8daZPrR.avzHCn3ApXO1HYI8B5z8vU7tdTf7FBS', '2025-11-24 15:15:55'),
(NULL, 'testuser@demo.com', '$2b$12$IYxqdCmEctkODUJMmf3b3ejfPJGQvxfjcB4b0eTGINyn6SA.9ICh.', '2025-11-24 15:15:55'),
(NULL, 'mudassir@example.com', '$2b$12$8jqO68TVg/PEFz8daZPrR.avzHCn3ApXOlHYlB85z8vU7tdTf7FBS', '2025-12-16 09:30:00'),
(NULL, 'mudassir2@example.com', '$2b$12$Qf8tXxq8oZ6u0p1YqYtV8u5t8x6xq9uYpJxJf8u8QxYt8u8QxYt8u', '2025-12-16 09:45:00'),
('Mudassir', 'mudassir@gmail.com', '$2b$12$EKjrGbF2VKqZEUvQTOokbe3XUnTCU4ckRf/ziWBfMuf1xDsWAIU2q', '2025-12-16 04:53:45'),
('Jaweria Kamran', 'jaweria@gmail.com', '$2b$12$J.GhyRtvT7wdnikNA3YFcuvlFn3r2XStN4OvWRO2L3FAADt2KTQaa', '2025-12-16 04:59:01'),
('sabakhalil', 'saba@example.com', '$2b$12$PgFpJvXz18.gnWadZPFzAunGSdeyDAWFqfaPNkNfiqGJ0d2dk5J.q', '2025-12-16 05:04:46'),
('samia akbar', 'samia@example.com', '$2b$12$tG7nS8vW2kL4pM5qR1uY7eA8jB9kC0lD1mN2oP3qR4sT5uV6wX7yZ', '2026-05-02 16:55:42');
