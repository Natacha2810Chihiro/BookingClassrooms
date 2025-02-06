const express = require('express');
const router = express.Router();

// Exemple de route pour récupérer tous les utilisateurs
router.get('/', (req, res) => {
  res.send('Liste des utilisateurs');
});

// Exemple de route pour ajouter un utilisateur
router.post('/', (req, res) => {
  res.send('Ajout d\'un utilisateur');
});

module.exports = router; // Exporter le router pour l'utiliser dans app.js
