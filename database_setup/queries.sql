-- Query for Question 1
SELECT c.country_name, SUM(s.total_ghg) AS TotalGHG
FROM Sector_Emissions s
JOIN Country c ON s.country_id = c.country_id
WHERE s.year BETWEEN 2020 AND 2024
  AND c.iso_code IS NOT NULL -- Exclude rows without ISO codes
  AND c.iso_code != ''       -- Exclude rows with empty ISO codes
  AND LENGTH(c.iso_code) = 3 -- Ensure the ISO code is valid (3 characters for countries)
GROUP BY c.country_name
ORDER BY TotalGHG DESC
LIMIT 3;
-- End

-- Query for Question 2
SELECT y.year AS Year, 
       SUM(se.total_ghg) AS TotalGHG
FROM Sector_Emissions se
JOIN Country c ON se.country_id = c.country_id
JOIN Year y ON se.year = y.year
WHERE c.country_name = 'China'
GROUP BY y.year
ORDER BY y.year;
-- End

-- Query for Question 3
SELECT 
    c.country_name AS Continent,
    SUM(pm.population) AS TotalPopulation,
    AVG(pm.co2_per_capita) AS AvgCO2PerCapita
FROM Population_Metrics pm
INNER JOIN Country c ON pm.country_id = c.country_id
WHERE pm.population > 0
  AND (c.country_name = 'Africa' 
       OR c.country_name = 'Asia' 
       OR c.country_name = 'Europe' 
       OR c.country_name = 'North America' 
       OR c.country_name = 'South America' 
       OR c.country_name = 'Oceania')
GROUP BY c.country_name
ORDER BY TotalPopulation DESC;
-- End

-- Query for Question 4
SELECT 
    'Cement CO2' AS Sector, 
    SUM(cement_co2) AS TotalEmissions
FROM Sector_Emissions
JOIN Country ON Sector_Emissions.country_id = Country.country_id
WHERE Country.country_name = 'China'
UNION ALL
SELECT 
    'Land Use Change CO2' AS Sector, 
    SUM(land_use_change_co2) AS TotalEmissions
FROM Sector_Emissions
JOIN Country ON Sector_Emissions.country_id = Country.country_id
WHERE Country.country_name = 'China';
-- End

-- Query for Question 5
SELECT 
    c.country_name AS Continent,
    SUM(se.total_ghg) AS TotalEmissions
FROM 
    Sector_Emissions se
JOIN 
    Country c ON se.country_id = c.country_id
WHERE 
    se.year BETWEEN 2020 AND 2023
    AND (c.country_name = 'Africa' 
         OR c.country_name = 'Asia' 
         OR c.country_name = 'Europe' 
         OR c.country_name = 'North America' 
         OR c.country_name = 'South America' 
         OR c.country_name = 'Oceania')
GROUP BY 
    c.country_name
ORDER BY 
    TotalEmissions DESC;
-- End 
