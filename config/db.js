const mysql = require("mysql2");

// Création de la connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "BookingClassroom",
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log(" Connecté à la base de données MySQL");
  }
});

module.exports = db; // On exporte `db` pour l'utiliser ailleurs
