-- Create user
CREATE USER 'fulbito'@'localhost' IDENTIFIED BY 'fulbito';
GRANT ALL PRIVILEGES ON *.* TO 'fulbito'@'localhost';
FLUSH PRIVILEGES;

-- Create database
CREATE DATABASE IF NOT EXISTS `fulbito`