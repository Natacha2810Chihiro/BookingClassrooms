const express = require("express");
const router = express.Router();

// Importation des autres fichiers de routes
const routesUsers = require("./routesUsers");  // Routes utilisateurs

const routesRooms = require("./routesRooms");  // Routes salles
const routesEquipements = require("./routesEquipements");  // Routes équipements
const routesReservations = require("./routesReservations");  // Routes réservations
const routesEquipementsRooms = require("./routesRoomsEquipements");  // Routes équipements des salles
const authRoutes = require("./auth");  // Routes d'authentification


// Utilisation des routes
router.use("/routes", routesUsers); // users pour les utilisateurs

router.use("/rooms", routesRooms); // rooms pour les salles
router.use("/equipements", routesEquipements); // equipements pour les équipements
router.use("/reservations", routesReservations); // reservations pour les réservations  
router.use("/rooms-equipements", routesEquipementsRooms); // rooms-equipements pour les équipements des salles

router.use("/auth", authRoutes);   // auth pour l'authentification

module.exports = router;  // Exportation des routes pour qu'elles soient utilisées dans app.js
