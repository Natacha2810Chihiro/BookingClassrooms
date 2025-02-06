const express = require('express');
const router = express.Router();
const db = require("../config/db"); 
const auth = require('../middlewares/auth');



//route get pour recupérer toutes les salles
router.get('/', (req, res) => {
    db.query('SELECT * FROM rooms', (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur de récupération des salles', error: err });
      } else {
        res.status(200).json(results);
      }
    });
  });
  

    //route post pour ajouter une salle
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

  // route put pour modifier une salle (reserver a l'administrateur)
    router.put('/:id', auth, (req, res) => {
        const { name, capacity } = req.body;
        db.query('UPDATE rooms SET name = ?, capacity = ? WHERE id = ?', [name, capacity, req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de modification de la salle', error: err });
        } else {
            res.status(200).json({ message: 'Salle modifiée', roomId: req.params.id });
        }
        });
    });

    // route pour supprimer une salle (reserver a l'administrateur)
    router.delete('/:id', auth, (req, res) => {
        db.query('DELETE FROM rooms WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur de suppression de la salle', error: err });
        } else {
            res.status(200).json({ message: 'Salle supprimée', roomId: req.params.id });
        }
        });
    });

  module.exports = router; // Exporter le router pour l'utiliser dans app.js
