CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  message TEXT,
  createdAt DATETIME
);

INSERT INTO contacts (name, email, message, createdAt) VALUES
('Mudassir Shahzad', 'mudassirshahzad613@gmail.com', 'Yr aj uni q ni ayaaa?', '2025-12-16 05:24:13'),
('Mudassir Shahzad', 'mudassirshahzad613@gmail.com', 'thanks', '2025-12-16 05:44:07'),
('Mam Saba', 'sabakhalil426@gmail.com', 'Good Student!', '2025-12-16 05:50:47');
