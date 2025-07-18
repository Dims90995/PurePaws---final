-- for testing only-- DO NOT USE IN PRODUCTION
DROP TABLE IF EXISTS ads;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    _id VARCHAR(12) PRIMARY KEY,
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

CREATE TABLE categories (
  id VARCHAR(12) PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('pet', 'car', 'realestate', 'general')),
  color TEXT NOT NULL,
  location TEXT,
  schema JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE ads (
  id VARCHAR(12) PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT NOT NULL,
  category_id VARCHAR(12) REFERENCES categories(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  dynamic_fields JSONB NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_category()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_timestamp_category ON categories;

CREATE TRIGGER set_timestamp_category
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_category();


CREATE OR REPLACE FUNCTION update_updated_at_ad()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS set_timestamp_ad ON ads;

CREATE TRIGGER set_timestamp_ad
BEFORE UPDATE ON ads
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_ad();
