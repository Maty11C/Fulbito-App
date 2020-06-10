-- Create user
CREATE USER 'fulbito'@'localhost' IDENTIFIED BY 'fulbito';
GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,DROP ON *.* TO 'fulbito'@'localhost';
FLUSH PRIVILEGES;

-- Create database
CREATE DATABASE IF NOT EXISTS `fulbacho`