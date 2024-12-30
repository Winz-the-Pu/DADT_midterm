require('dotenv').config(); // Load .env file as the first statement

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Middleware to serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Path to the queries.sql file
const queriesPath = path.join(__dirname, 'database_setup', 'queries.sql'); 

// Helper function to extract a query from `queries.sql`
function extractQuery(marker) {
    const data = fs.readFileSync(queriesPath, 'utf8'); // Read the file
    const queryStart = data.indexOf(`-- ${marker}`);
    const queryEnd = data.indexOf('-- End', queryStart);
    if (queryStart === -1 || queryEnd === -1) {
        throw new Error(`Query marker "${marker}" not found in queries.sql.`);
    }
    return data.substring(queryStart, queryEnd).replace(`-- ${marker}\n`, '').trim();
}

// Route for Question 1: Top 3 countries with the highest GHG emissions (2020–2023)
app.get('/top-emitting-countries', (req, res) => {
    try {
        const query = extractQuery('Query for Question 1');
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Database query failed.');
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// Route for Question 2: Total GHG emissions for China over the years
app.get('/china-ghg-over-years', (req, res) => {
    try {
        const query = extractQuery('Query for Question 2');
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Database query failed.');
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// Route for Question 3: Population and CO₂ per capita correlation by continent
app.get('/population-co2-continent', (req, res) => {
    try {
        const query = extractQuery('Query for Question 3');
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Database query failed.');
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});

// Route for Question 4: Sector contribution to China's GHG emissions
app.get('/q4', (req, res) => {
    try {
        const query = extractQuery('Query for Question 4');
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Database query failed.');
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});


app.get('/q5', (req, res) => {
    try {
        const query = extractQuery('Query for Question 5');
        db.query(query, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Database query failed.');
            } else {
                res.json(results);
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
