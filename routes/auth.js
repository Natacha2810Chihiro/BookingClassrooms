const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require('../config/db');

// Route pour login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Recherche de l'utilisateur dans la base de données
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la connexion" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }

        const user = results[0];

        // Comparaison du mot de passe
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Erreur de vérification du mot de passe" });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }

            // Création du token JWT
            const jwtToken = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: "1h", // expiration du token après 1 heure
            });

            // Renvoi du JWT
            res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.json({ message: "Authentification réussie", token: jwtToken });
        });
    });
});

// Route pour signup (inscription)
router.post("/signup", (req, res) => {
    const { username, password } = req.body;

    // Validation de la présence des champs
    if (!username || !password) {
        return res.status(400).json({ message: "Veuillez fournir un nom d'utilisateur et un mot de passe" });
    }

    // Vérification si l'utilisateur existe déjà
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la vérification de l'utilisateur" });
        } else if (results.length > 0) {
            return res.status(409).json({ message: "L'utilisateur existe déjà" });
        } else {
            // Cryptage du mot de passe
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: "Erreur lors du cryptage du mot de passe" });
                } else {
                    // Enregistrement de l'utilisateur
                    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err) => {
                        if (err) {
                            return res.status(500).json({ message: "Erreur lors de l'inscription de l'utilisateur" });
                        } else {
                            res.status(201).json({ message: "Utilisateur enregistré avec succès" });
                        }
                    });
                }
            });
        }
    });
});

// Route pour logout (déconnexion)
router.post("/logout", (req, res) => {
    res.clearCookie("jwtToken");
    res.json({ message: "Déconnexion réussie" });
});

module.exports = router;
