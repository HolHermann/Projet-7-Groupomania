const { body, validationResult } = require("express-validator");
const passwordValidator = require("password-validator");

exports.email = [
  body("email")
    .notEmpty()
    .isEmail() //Vérifie si c'est bien un email
    .normalizeEmail({ lowercase: true })
    .withMessage("Format email invalide"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.mapped());
    }
    next();
  },
];
exports.password = (req, res, next) => {
  // Create a schema
  var schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum 8 caractères
    .is()
    .max(15) // Maximum 15 caractères
    .has()
    .uppercase() // Minimum 1 lettre majuscule
    .has()
    .lowercase() // Minimum 1 lettre minuscule
    .has()
    .digits(2) // Minimum 2 chiffres
    .has()
    .not()
    .spaces(); // Pas d'espaces
  const password = req.body.password;
  if (schema.validate(password)) {
    next();
  } else {
    return res.status(422).json({
      message:
        "Le mot de passe doit faire entre 8 et 15 caractères, comprenant  au moins 1 lettre majuscule 1 minuscule et 2 chiffres SANS caractères spéciaux.",
    });
  }
};
exports.username = [
  body("username")
    .notEmpty() // Ne peut pas être vide
    .isLength({ min: 3 }) // Taille minimum de trois
    .withMessage("Votre prénom doit contenir minimum 3 caractères !")
    .blacklist("{}$<>=") //Interdire ces caractères spéciaux
    .isAlpha("fr-FR", { ignore: "-" })
    .withMessage(
      "Votre username ne doit pas contenir de chiffres ni caractères spéciaux, 3 caractères minimum"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.mapped());
    }
    next();
  },
];
exports.bio = [
  body("bio")
    .notEmpty()
    .isLength({ min: 4 })
    .withMessage("Votre biographie doit contenir au minimum 4 caractères !")
    .blacklist("{}$<>=")
    .isAlpha("fr-FR", { ignore: " -" })
    .withMessage(
      "Le champ ne doit pas contenir de chiffres ni caractères spéciaux"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.mapped());
    }
    next();
  },
];
exports.content = [
  body("content").blacklist("{}$<>="),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.mapped());
    }
    next();
  },
];
exports.contentComment = [
  body("content")
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage("Minimum 2 caractères !")
    .blacklist("{}$<>=*")
    .isAlpha("fr-FR", { ignore: "-' ?" })
    .withMessage(
      "Le champ ne doit pas contenir de chiffres ni caractères spéciaux"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.mapped());
    }
    next();
  },
];
