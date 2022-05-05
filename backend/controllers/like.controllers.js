const db = require("../models/index");

exports.likePost = (req, res) => {
  db.Like.findOne({
    //On trouve l'userId grâce au middleware d'authentification
    where: { userId: req.auth.userId, postId: req.params.id },
  })
    .then((like) => {
      // On supprime le like si l'user avait liké le post
      if (like) {
        db.Like.destroy({
          where: { userId: req.auth.userId, postId: req.params.id },
        })
          .then(() =>
            res.status(200).json({
              ...req.body,
              postId: parseInt(req.params.id),
              userId: req.auth.userId,
            })
          )
          .catch((err) => res.status(400).json(err));
        // si l'user n'était pas dans le tableau on met un like et on incréamente de 1 le like
      } else {
        const newLike = {
          ...req.body,
          postId: parseInt(req.params.id),
          userId: req.auth.userId,
        };
        db.Like.create({
          ...newLike,
        })
          .then(() => res.status(201).json(newLike))
          .catch((err) => res.status(400).json({ err }));
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
//Obtenir le nombre de like sur un post
exports.numberOfLikes = (req, res) => {
  db.Like.count({
    where: { postId: req.params.id },
  })
    .then((number) => res.status(200).json({ number }))
    .catch((err) => res.status(400).json(err));
};
