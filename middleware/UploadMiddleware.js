const multer = require("multer");
const UploadToImgbb = require("../helpers/UploadToImgbb");
const SendResponse = require("../helpers/SendResponse");

const upload = multer();

const uploadMiddleware = async (req, res, next) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).send(SendResponse(500, "Internal Server Error", err.message, null));
      } else if (err) {
        return res.status(500).send(SendResponse(500, "Internal Server Error", err, null));
      }

      try {
        const imageUrl = await UploadToImgbb(req.file);
        req.imageUrl = imageUrl;
        next();
      } catch (error) {
        return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
      }
    });
  } catch (error) {
    return res.status(500).send(SendResponse(500, "Internal Server Error", error, null));
  }
};

module.exports = uploadMiddleware;
