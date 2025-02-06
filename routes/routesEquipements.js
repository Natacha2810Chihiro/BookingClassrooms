const express = require('express');
const router = express.Router();
const db = require("../config/db"); 


router.get('/', (req, res) => {
    db.query('SELECT * FROM equipements', (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur de récupération des équipements', error: err });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
 
  router.post('/', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO equipements (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur d\'ajout de l\'équipement', error: err });
      } else {
        res.status(201).json({ message: 'Équipement ajouté', equipementId: results.insertId });
      }
    });
  });

  module.exports = router; // Exporter le router pour l'utiliser dans app.js