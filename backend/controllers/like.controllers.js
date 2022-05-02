const db = require("../models/index");

exports.likePost = (req, res) => {
  db.Like.findOne({
    where: { userId: req.auth.userId, postId: req.params.id },
  })
    .then((like) => {
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
exports.numberOfLikes = (req, res) => {
  db.Like.count({
    where: { postId: req.params.id },
  })
    .then((number) => res.status(200).json({ number }))
    .catch((err) => res.status(400).json(err));
};
