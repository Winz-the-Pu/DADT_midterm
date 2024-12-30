-- Disable foreign key checks to allow truncation of tables
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate the tables to avoid duplicate or inconsistent data
TRUNCATE TABLE sector_emissions;
TRUNCATE TABLE population_metrics;
TRUNCATE TABLE year;
TRUNCATE TABLE country;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Extract and Insert into the Country Table
INSERT INTO Country (country_name, iso_code)
SELECT DISTINCT country AS country_name, iso_code
FROM Temp_Emissions
WHERE year BETWEEN 2020 AND 2024;

-- Extract and Insert into the Year Table
INSERT IGNORE INTO year (year)
SELECT DISTINCT year
FROM Temp_Emissions
WHERE year BETWEEN 2020 AND 2024;

-- Extract and Insert into the Sector_Emissions Table
INSERT INTO sector_emissions (country_id, year, cement_co2, land_use_change_co2, total_ghg)
SELECT 
    c.country_id,
    y.year,
    t.cement_co2,
    t.land_use_change_co2,
    t.total_ghg
FROM Temp_Emissions t
INNER JOIN country c ON t.country = c.country_name
INNER JOIN year y ON t.year = y.year
WHERE t.year BETWEEN 2020 AND 2024;

-- Extract and Insert into the Population_Metrics Table
INSERT INTO Population_Metrics (country_id, year, population, co2_per_capita)
SELECT 
    c.country_id,
    t.year,
    t.population,
    t.co2_per_capita
FROM Temp_Emissions t
INNER JOIN Country c ON t.country = c.country_name
WHERE t.year BETWEEN 2020 AND 2023;

