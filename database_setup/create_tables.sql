-- Defines the schema by creating normalized tables
-- Create table: Country
CREATE TABLE Country (
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(255) NOT NULL,
    iso_code VARCHAR(10)
);

-- Create table: Year
CREATE TABLE Year (
    year INT PRIMARY KEY
);

-- Create table: Sector_Emissions
CREATE TABLE Sector_Emissions (
    emission_id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT NOT NULL,
    year INT NOT NULL,
    cement_co2 FLOAT,
    land_use_change_co2 FLOAT,
    total_ghg FLOAT,
    FOREIGN KEY (country_id) REFERENCES Country(country_id),
    FOREIGN KEY (year) REFERENCES Year(year)
);

-- Create table: Population_Metrics
CREATE TABLE Population_Metrics (
    population_id INT AUTO_INCREMENT PRIMARY KEY,
    country_id INT NOT NULL,
    year INT NOT NULL,
    population BIGINT,
    co2_per_capita FLOAT,
    FOREIGN KEY (country_id) REFERENCES Country(country_id),
    FOREIGN KEY (year) REFERENCES Year(year)
);

-- Create table: Temp_Emissions
CREATE TABLE Temp_Emissions (
    country VARCHAR(255),
    year INT,
    iso_code VARCHAR(10),
    cement_co2 FLOAT,
    land_use_change_co2 FLOAT,
    total_ghg FLOAT,
    population BIGINT,
    co2_per_capita FLOAT
);