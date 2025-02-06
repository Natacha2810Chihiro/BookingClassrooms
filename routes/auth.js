const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // pour crypter le mot de passe. 
const jwt = require("jsonwebtoken");
const db = require('../config/db');



//route pour login
router.post("/login", (req, res) => {
    // Récupération des paramètres POST (username et password)
    const { username, password } = req.body;
    if (password === "toto") {
        // Encodage du JWT via la variable d'environnement JWT_SECRET
        const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // Stockage du JWT dans un cookie HttpOnly
        res.cookie("jwtToken", jwtToken, { httpOnly: true, secure: true });
        res.json(jwtToken);
    } else {
        res.status(401).json({ message: "Authentification échouée." });
    }
});

//route pour s'inscrire si pas de compte
router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    // Vérification si l'utilisateur existe déjà
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, results) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la vérification de l'utilisateur" });
        } else if (results.length > 0) {
            res.status(409).json({ message: "L'utilisateur existe déjà" });
        } else {
            // Cryptage du mot de passe
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({ message: "Erreur lors du cryptage du mot de passe" });
                } else {
                    // Enregistrement de l'utilisateur
                    db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash], (err) => {
                        if (err) {
                            res.status(500).json({ message: "Erreur lors de l'inscription de l'utilisateur" });
                        } else {
                            res.status(201).json({ message: "Utilisateur enregistré" });
                        }
                    });
                }
            });
        }
    });
});

//route pour se déconnecter
router.post("/logout", (req, res) => {
    res.clearCookie("jwtToken");
    res.json({ message: "Déconnexion réussie" });
});

module.exports = router;