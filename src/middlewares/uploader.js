const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.multerStorage = (destination, allowtypes = /jpg|jpeg|png|webp/) => {
  if (!path.resolve(destination)) {
    fs.mkdirSync(destination);
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname + Math.floor(Math.random() * 999);
      const extName = path.extname(file.originalname);
      cb(null, `${fileName}${extName}`);
    },
  });

  const fileFilter = function (req, file, cb) {
    if (allowtypes.test(file.mimetype)) {
      cb(null, true);
    } else {
      return cb(new Error("File type isn't Allowed"));
    }
  };

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 3 * 1000 * 1000, //3 MB
    },
  });
  return upload;
};
