const axios = require("axios");
const FormData = require("form-data");
const getCurrentTimestamp = require("../helpers/TimeStamp");

const UploadToImgbb = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("key", process.env.IMGBB_KEY);
    formData.append("image", imageData.buffer, {
      filename: imageData.originalname,
    });

    const response = await axios.post("https://api.imgbb.com/1/upload", formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const imageUrl = response.data.data.url;
    return imageUrl;
  } catch (error) {
    console.error("Gagal mengunggah gambar ke ImgBB:", error.message);
    throw error;
  }
};

module.exports = UploadToImgbb;
