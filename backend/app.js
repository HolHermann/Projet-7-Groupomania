const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// Router
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const likeRoutes = require("./routes/like.routes");
require("dotenv").config();
const helmet = require("helmet");
const app = express(); // Création de l'application express
const db = require("./models");
db.sequelize // Connexion à la base de données
  .authenticate()
  .then(() => {
    console.log("Connecté à la base de données avec succès");
  })
  .catch((error) => {
    console.log("Impossible de se connecter à la base de données : ", error);
  });

app.use((req, res, next) => {
  // Accès à l'API à partir de toutes les origines
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Reqûete uniquement avec le CRUD
  next();
});
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Autoriser le front et le back à partager des ressources
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/comment", commentRoutes);

app.use("/public", express.static(path.join(__dirname, "public")));

module.exports = app; // Exportation de l'app qui nous permet de l'utiliser dans tous les fichiers du projet
