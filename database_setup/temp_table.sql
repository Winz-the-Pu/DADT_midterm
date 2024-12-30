-- Loads the entire dataset (data.csv) into a temporary table (Temp_Emissions)
LOAD DATA LOCAL INFILE '../data.csv'
INTO TABLE Temp_Emissions
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(country, year, iso_code, population, @dummy1, cement_co2, @dummy2, @dummy3, @dummy4, @dummy5, @dummy6, @dummy7, @dummy8, @dummy9, @dummy10, co2_per_capita, @dummy11, @dummy12, @dummy13, @dummy14, @dummy15, @dummy16, @dummy17, @dummy18, @dummy19, @dummy20, @dummy21, @dummy22, @dummy23, @dummy24, @dummy25, @dummy26, @dummy27, @dummy28, @dummy29, @dummy30, @dummy31, @dummy32, @dummy33, @dummy34, @dummy35, @dummy36, @dummy37, land_use_change_co2, @dummy38, @dummy39, @dummy40, @dummy41, @dummy42, @dummy43, @dummy44, @dummy45, @dummy46, total_ghg);
