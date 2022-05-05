const db = require("../models");
//Créer un commentaire
exports.createComment = (req, res) => {
  if (req.body.content.trim().length === 0)
    //Vérifie si le commentaire est nul
    return res.status(400).json({
      message:
        "Saisie incorrecte, vous ne pouvez pas saisir uniquement des caractères spéciaux",
    });
  const comment = { ...req.body };
  db.Comment.create({ ...comment })
    .then(() => res.status(201).json(comment))
    .catch((err) => res.status(400).json(err));
};
// Mise à jour du commentaire
exports.updateComment = (req, res) => {
  if (req.body.content.length === 0) {
    return res.status(400).json({
      message:
        "Un post ne peut pas être vide et ne peut pas contenir uniquement des caractères spéciaux.",
    });
  }
  db.Comment.findOne({
    where: {
      id: req.params.id,
    },
  }).then((comment) => {
    if (!comment)
      return res.status(404).json({ message: "Commentaire non trouvé" });
    if (req.auth.userId !== comment.userId)
      return res.status(401).json({ message: "Requête non autorisée" });
    comment
      .update({ content: req.body.content })
      .then(() => res.status(200).json(req.body.content));
  });
};
// Obtenir tous les commentaire d'un post
exports.getAllCommentsAboutPost = (req, res) => {
  db.Comment.findAll({
    where: {
      postId: req.params.postId,
    },
    include: [
      {
        model: db.User,
      },
    ],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};
//Supprimer un commentaire
exports.deleteComment = (req, res) => {
  db.Comment.findOne({
    where: { id: req.params.id },
  })
    .then((comment) => {
      if (!comment) {
        return res.status(400).json({ message: "Commentaire introuvable" });
      }
      //Vérifie si c'est le créateur du commentaire ou l'admin qui effectue la requête
      if (comment.userId !== req.auth.userId && req.admin.isAdmin === false) {
        return res.status(401).json({ message: "Requête non autorisée" });
      }
      comment
        .destroy()
        .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json(err));
};
