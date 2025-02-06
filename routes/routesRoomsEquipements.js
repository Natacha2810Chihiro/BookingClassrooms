const express = require('express');
const router = express.Router();
const db = require("../config/db"); 


router.post('/', (req, res) => {
    const { room_id, equipement_id, quantity } = req.body;
    db.query('INSERT INTO room_equipements (room_id, equipement_id, quantity) VALUES (?, ?, ?)', [room_id, equipement_id, quantity], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur d\'ajout de l\'équipement à la salle', error: err });
      } else {
        res.status(201).json({ message: 'Équipement ajouté à la salle', roomEquipementId: results.insertId });
      }
    });
  });
  
  module.exports = router;