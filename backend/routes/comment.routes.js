const router = require("express").Router();
const auth = require("../middleware/auth");
const commentController = require("../controllers/comment.controllers");
const inputsValidation = require("../middleware/inputsValidation");
// Routes pour les commentaires
//Créer un commentaire
router.post(
  "/create/:postId",
  auth,
  inputsValidation.contentComment,
  commentController.createComment
);
//Modification d'un commentaire
router.put(
  "/update/:id",
  auth,
  inputsValidation.contentComment,
  commentController.updateComment
);
//Obtenir un commentaire
router.get("/:postId", auth, commentController.getAllCommentsAboutPost);
//Supprimer un commentaire
router.delete("/delete/:id", auth, commentController.deleteComment);
module.exports = router;
