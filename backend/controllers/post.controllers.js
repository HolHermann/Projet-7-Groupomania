const db = require("../models/index");
const fs = require("fs");
//Creation d'un post
exports.createPost = (req, res) => {
  if (req.body.content && req.body.content.trim().length === 0 && !req.file) {
    return res.status(400).json({
      message:
        "Un post ne peut pas être vide et ne peut pas contenir uniquement des caractères spéciaux.",
    });
  }
  const newPost = req.file // On vérifie s'il n'y a pas de ficher
    ? {
        ...JSON.parse(req.body.post),
        attachment: `${req.protocol}://${req.get(
          "host"
        )}/public/postPic/picOf-${req.auth.userId}/${req.file.filename}`,
      }
    : { ...req.body };
  if (newPost.userId !== req.auth.userId) {
    return res.status(401).json({ message: "Requête non autorisée" });
  }
  db.Post.create({ ...newPost })
    .then(() => res.status(201).json(newPost))
    .catch((err) => res.status(400).json({ err }));
};
//Mise à jour d'un post
exports.updatePost = (req, res) => {
  const postUpdate = req.body;
  if (postUpdate.content.trim().length === 0 && !req.file) {
    return res.status(400).json({
      message:
        "Un post ne peut pas être vide et ne peut pas contenir uniquement des caractères spéciaux.",
    });
  }
  db.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
      }
      if (req.auth.userId !== post.userId) {
        return res.status(401).json({ message: "Requête non autorisée" });
      }
      db.Post.update({ ...postUpdate }, { where: { id: req.params.id } })
        .then(() =>
          res.status(200).json({ ...postUpdate, id: parseInt(req.params.id) })
        )
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
// Mise à jour d'un photo d'un post
exports.updatePostPic = (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      if (!post) {
        return res.status(400).json({ message: "Post non trouvé" });
      }
      if (req.auth.userId !== post.userId) {
        return res.status(401).json({ message: "Requête non autorisée" });
      }
      if (req.file && post.attachment !== "") {
        const imageToDelete = post.attachment.split(
          // On supprime la photo avant d'en stocker une autre
          `/public/postPic/picOf-${post.userId}`
        )[1];
        fs.unlinkSync(`public/postPic/picOf-${post.userId}/${imageToDelete}`);
      }
      post
        .update({
          attachment: `${req.protocol}://${req.get(
            "host"
          )}/public/postPic/picOf-${req.auth.userId}/${req.file.filename}`,
        })
        .then(() =>
          res.status(200).json({ message: "post mis à jour avec succés" })
        )
        .catch((err) => res.status(500).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
//Suppression d'une photo
exports.deletePostPic = (req, res) => {
  db.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (!post) {
        return res.status(400).json({ message: "Post non trouvé" });
      }
      //On vérifie si la requête vient du créateur du post ou d'un admin
      if (post.userId !== req.auth.userId && req.admin.isAdmin === false) {
        return res.status(401).json({ message: "Requête non autorisée" });
      }
      if (post.attachment && post.attachment !== "") {
        const imageToDelete = post.attachment.split(
          `/public/postPic/picOf-${post.userId}`
        )[1];
        fs.unlink(`public/postPic/picOf-${post.userId}/${imageToDelete}`, () =>
          console.log("image supprimée")
        );
      }

      post
        .update({ attachment: "" })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
// Suppresion d'un post
exports.deletePost = (req, res) => {
  db.Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (!post) {
        return res.status(400).json({ message: "Post non trouvé" });
      }
      if (post.userId !== req.auth.userId && req.admin.isAdmin === false) {
        return res.status(401).json({ message: "Requête non autorisée" });
      }
      if (post.attachment && post.attachment !== "") {
        const imageToDelete = post.attachment.split(
          `/public/postPic/picOf-${post.userId}`
        )[1];
        fs.unlink(`public/postPic/picOf-${post.userId}/${imageToDelete}`, () =>
          console.log("image supprimée")
        );
      }

      post
        .destroy()
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
//Obtenir tous les posts
exports.getAllPost = (req, res) => {
  db.Post.findAll({
    include: [
      { model: db.User },
      { model: db.Like },
      { model: db.Comment, order: [["id", "ASC"]] },
    ],
    order: [["id", "DESC"]], //Permet d'afficher du plus récent au plus ancien
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
//Obtenir tous les posts d'un utilisateur
exports.getAllPostOfOneUser = (req, res) => {
  db.Post.findAll({
    where: { userId: req.params.userId },
    include: [
      { model: db.User },
      { model: db.Like },
      { model: db.Comment, order: [["id", "ASC"]] },
    ],
    order: [["id", "DESC"]], //Permet d'afficher du plus récent au plus ancien
  })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};
