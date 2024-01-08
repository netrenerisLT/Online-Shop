const uuid = require("uuid").v4;
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "product-data/images",
    filename: function (req, file, cb) {
      cb(null, uuid() + "-" + file.originalname);
    },
  }),
});

const configuredMulterMiddleware = upload.single("image");

module.exports = configuredMulterMiddleware;
