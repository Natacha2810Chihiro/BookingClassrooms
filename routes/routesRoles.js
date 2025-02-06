const express = require('express');
const router = express.Router();
const db = require("../config/db"); 


router.get('/', (req, res) => {
    db.query('SELECT * FROM roles', (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur de récupération des rôles', error: err });
      } else {
        res.status(200).json(results);
      }
    });
  });
  

  router.post('/', (req, res) => {
    const { status, description } = req.body;
    db.query('INSERT INTO roles (status, description) VALUES (?, ?)', [status, description], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur d\'ajout du rôle', error: err });
      } else {
        res.status(201).json({ message: 'Rôle ajouté', roleId: results.insertId });
      }
    });
  });

  module.exports = router; // Exporter le router pour l'utiliser dans app.js
