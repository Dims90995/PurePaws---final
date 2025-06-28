CREATE TABLE users (
    _id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    second_name VARCHAR(50) NOT NULL,
    gender VARCHAR(10),
    phone_number VARCHAR(20),
    birthday DATE,
    passwordHash VARCHAR(100) NOT NULL,
    user_id VARCHAR(36) UNIQUE NOT NULL,
    createdAt INT NOT NULL
);
CREATE TABLE category (
    _id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50),
    color VARCHAR(20)
);