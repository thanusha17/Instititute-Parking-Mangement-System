-- Create the database
CREATE DATABASE IF NOT EXISTS ParkingManagementSystem;
USE ParkingManagementSystem;

-- Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE Locations (
    location_id INT PRIMARY KEY AUTO_INCREMENT,
    location_name VARCHAR(255) NOT NULL,
    two_wheeler_slots INT NOT NULL,
    four_wheeler_slots INT NOT NULL,
    bus_parking_slots INT NOT NULL -- Added column for bus parking slots
);

CREATE TABLE ParkingSlots (
    slot_id INT PRIMARY KEY AUTO_INCREMENT,
    location_id INT,
    vehicle_type ENUM('two-wheeler', 'four-wheeler', 'bus') NOT NULL,
    is_empty BOOLEAN NOT NULL DEFAULT TRUE,
    permanently_reserved BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (location_id) REFERENCES Locations(location_id) ON DELETE CASCADE
);
ALTER TABLE Locations ADD COLUMN image_url VARCHAR(500);