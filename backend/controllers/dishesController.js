const db = require('../config.js').db;

exports.getAllDishes = (req, res) => {
    db.query('SELECT * FROM Dishes', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
}

exports.addDish = (req, res) => {
    const { name, description, price } = req.body;
    db.query('INSERT INTO Dishes (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
}
