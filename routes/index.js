const express = require("express");
const router = express.Router();

// Importation des autres fichiers de routes
const routesUsers = require("./routesUsers");  // Routes utilisateurs
const authRoutes = require("./auth");  // Routes d'authentification

// Utilisation des routes
router.use("/users", routesUsers); // Exemple : /users pour les utilisateurs
router.use("/auth", authRoutes);   // Exemple : /auth pour l'authentification

module.exports = router;  // Exportation des routes pour qu'elles soient utilisées dans app.js
