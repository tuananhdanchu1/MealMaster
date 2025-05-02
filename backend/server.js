const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const config = require('./config.js');

const db = mysql.createConnection(config.db);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

const app = express();
app.use(bodyParser.json());

app.get('/api/dishes', (req, res) => {
    db.query('SELECT * FROM Dishes', (err, results) => {
        if (err) {
            res.status(500).send({ error : err.message });
        } else {
            res.json(results);
        }
    });
});

app.post('/api/dishes', (req, res) => {
    const { name, description, price } = req.body;
    db.query('INSERT INTO Dishes (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, results) => {
        if (err) {
            res.status(500).send({ error : err.message });
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const dishesRoutes = require('./routes/dishesRoutes.js');
app.use('/api', dishesRoutes);