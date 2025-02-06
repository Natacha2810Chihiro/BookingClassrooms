require('dotenv').config();
const express = require("express");
const userRoutes = require('./routes/routesUsers');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'BookingClassroom' 
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});


const app = express();
const routes = require('./routes/index');
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/", routes);



app.listen(port, hostname, () => {
  console.log(`Serveur démarré sur http://${hostname}:${port}`);
});

