const multer = require("multer");

//(destination/file name)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `public/profilPic/picOf-${req.auth.userId}`);
  },
  filname: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // Suppression des espaces avec _ à la palce

    const extension = file.mimetype.split("/")[1];
    callback(null, name + Date.now() + "." + extension); // On renomme le fichier
  },
});
const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
    const ext = file.mimetype.split("/")[1];
    if (ext !== "png" && ext !== "jpg" && ext !== "gif" && ext !== "jpeg") {
      return callback({ message: "Seules les images sont accéptées" });
    } else {
      callback(null, true);
    }
  },
  //1 Mo => 1 048 576 octets
  // 3.5 => 3670016
  limits: {
    fileSize: 3670016,
  },
}).single("image");

module.exports = (req, res, next) => {
  upload(req, res, (err) => (err ? res.status(400).json(err) : next()));
};
