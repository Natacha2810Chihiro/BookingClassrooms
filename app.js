require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");
const db = require("./config/db"); // On importe la connexion MySQL

const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/", routes);

// Démarrage du serveur
app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
});
