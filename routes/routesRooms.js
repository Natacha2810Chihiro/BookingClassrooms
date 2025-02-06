const express = require('express');
const router = express.Router();
const db = require("../config/db"); 


router.get('/', (req, res) => {
    db.query('SELECT * FROM rooms', (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur de récupération des salles', error: err });
      } else {
        res.status(200).json(results);
      }
    });
  });
  

  router.post('/', (req, res) => {
    const { name, capacity } = req.body;
    db.query('INSERT INTO rooms (name, capacity) VALUES (?, ?)', [name, capacity], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur d\'ajout de la salle', error: err });
      } else {
        res.status(201).json({ message: 'Salle ajoutée', roomId: results.insertId });
      }
    });
  });

  module.exports = router; // Exporter le router pour l'utiliser dans app.js
