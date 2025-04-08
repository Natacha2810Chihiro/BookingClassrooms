const express = require('express');
const router = express.Router();
const db = require("../config/db");
const auth = require("../middlewares/auth"); // Middleware d'authentification
const bcrypt = require("bcrypt"); // Librairie pour le hachage des mots de passe


// Créer un nouvel utilisateur
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si les informations nécessaires sont présentes
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nom, email et mot de passe sont requis' });
  }

  // Vérifier si l'email existe déjà dans la base de données
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de vérification de l\'email', error: err });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Hacher le mot de passe avant de le stocker
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur de hachage du mot de passe', error: err });
      }

      // Insérer l'utilisateur dans la base de données
      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur de création de l\'utilisateur', error: err });
        }
        res.status(201).json({ message: 'Utilisateur créé avec succès' });
      });
    });
  });
});



// Récupérer tous les utilisateurs
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur de récupération des utilisateurs', error: err });
    } else {
      res.status(200).json(results);
    }
  });
});

// Récupérer un utilisateur par son id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur de récupération de l\'utilisateur', error: err });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Mettre à jour un utilisateur
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  // Vérifier si le champ name ou email est renseigné
  if (!name && !email) {
    return res.status(400).json({ message: 'Le nom d\'utilisateur ou l\'email est requis' });
  }

  // Hacher le mot de passe si il est renseigné
  if (password) {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur de hachage du mot de passe', error: err });
      }
      db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, hash, userId], (err, results) => {
        if (err) {
          res.status(500).json({ message: 'Erreur de mise à jour de l\'utilisateur', error: err });
        } else {
          res.status(200).json({ message: 'Utilisateur mis à jour' });
        }
      });
    });
  } else {
    // Si aucun mot de passe n'est fourni, mettre à jour seulement name et email
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur de mise à jour de l\'utilisateur', error: err });
      } else {
        res.status(200).json({ message: 'Utilisateur mis à jour' });
      }
    });
  }
});

// Supprimer un utilisateur
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur de suppression de l\'utilisateur', error: err });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      res.status(200).json({ message: 'Utilisateur supprimé' });
    }
  });
});

module.exports = router; // Exporter le router pour l'utiliser dans app.js
