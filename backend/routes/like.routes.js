const router = require("express").Router();
const likeController = require("../controllers/like.controllers");
const auth = require("../middleware/auth");
//Créer un like pour un post
router.post("/:id", auth, likeController.likePost);
//Obtenir le nombre de like pour un post
router.get("/:id", auth, likeController.numberOfLikes);
module.exports = router;
