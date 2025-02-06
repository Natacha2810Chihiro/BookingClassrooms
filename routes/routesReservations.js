const express = require('express');
const router = express.Router();
const db = require("../config/db"); 


router.get('/', (req, res) => {
    db.query('SELECT * FROM reservations', (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur de récupération des réservations', error: err });
      } else {
        res.status(200).json(results);
      }
    });
  });

  router.post('/', (req, res) => {
    const { user_id, room_id, start_time, end_time } = req.body;
    db.query('INSERT INTO reservations (user_id, room_id, start_time, end_time) VALUES (?, ?, ?, ?)', [user_id, room_id, start_time, end_time], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur d\'ajout de la réservation', error: err });
      } else {
        res.status(201).json({ message: 'Réservation ajoutée', reservationId: results.insertId });
      }
    });
  });
  
  module.exports = router; // Exporter le router pour l'utiliser dans app.js