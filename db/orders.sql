CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  address VARCHAR(255),
  notes TEXT,
  createdAt DATETIME
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  name VARCHAR(100),
  price DECIMAL(10,2),
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Example Inserts
INSERT INTO orders (fullName, email, phone, address, notes, createdAt) VALUES
('faraz bashir', 'faraz@example.com', '03017005899', 'street 03 phase 01 wapda town', '', '2025-11-24 15:38:46'),
('faraz bashir', 'faraz@example.com', '03017005899', 'street 03 phase 01 wapda town', 'kghhj', '2025-12-16 04:21:07'),
('faraz bashir', 'mudassir@gmail.com', '03017005899', 'street 03 phase 01 wapda town', 'wefefew', '2025-12-16 04:58:08'),
('Saba', 'saba@example.com', '03475631481', '1223', 'fdgfhgjgj', '2025-12-16 05:07:17'),
('Jaweria Kamran', 'faraz@example.com', '03475631484', 'Rawalpindi', 'Thanks For Shoping', '2026-05-02 19:56:06');

-- Items (example for first order)
INSERT INTO order_items (order_id, name, price, quantity) VALUES
(1, 'Classic Gold Band', 18000, 1);
