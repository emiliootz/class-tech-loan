CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  role VARCHAR(50)
);

CREATE TABLE Equipment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  status VARCHAR(20),
  location VARCHAR(50)
);
