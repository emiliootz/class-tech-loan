

CREATE TABLE `mccormack` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(100) NOT NULL,
  `Make` varchar(64) NOT NULL,
  `Model` varchar(64) NOT NULL,
  `Serial` varchar(128) DEFAULT NULL,
  `Tag` varchar(64) DEFAULT NULL,
  `Description` varchar(128) DEFAULT NULL,
  `Status` varchar(32) NOT NULL,
  `Person` varchar(64) DEFAULT NULL,
  `Room` varchar(45) NOT NULL,
  `Notes` varchar(128) DEFAULT NULL,
  `Exp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT = 1000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `uhall` (
  `ID` int NOT NULL,
  `Type` varchar(100) NOT NULL,
  `Make` varchar(64) NOT NULL,
  `Model` varchar(64) NOT NULL,
  `Serial` varchar(128) DEFAULT NULL,
  `Tag` varchar(64) DEFAULT NULL,
  `Desc` varchar(128) DEFAULT NULL,
  `Status` varchar(32) NOT NULL,
  `Person` varchar(64) DEFAULT NULL,
  `Room` varchar(45) NOT NULL,
  `Notes` varchar(128) DEFAULT NULL,
  `Exp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT = 2000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `wheatley` (
  `ID` int NOT NULL,
  `Type` varchar(100) NOT NULL,
  `Make` varchar(64) NOT NULL,
  `Model` varchar(64) NOT NULL,
  `Serial` varchar(128) DEFAULT NULL,
  `Tag` varchar(64) DEFAULT NULL,
  `Desc` varchar(128) DEFAULT NULL,
  `Status` varchar(32) NOT NULL,
  `Person` varchar(64) DEFAULT NULL,
  `Room` varchar(45) NOT NULL,
  `Notes` varchar(128) DEFAULT NULL,
  `Exp` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT = 3000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  role VARCHAR(50)
);
