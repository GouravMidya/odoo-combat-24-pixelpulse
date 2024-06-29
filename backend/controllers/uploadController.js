const path = require("path");

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  const imageUrl = `/uploads/images/${req.body.type}/${req.file.filename}`;
  res.json({ success: true, imageUrl });
};

exports.uploadVideo = (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }
  const videoUrl = `/uploads/videos/${req.body.type}/${req.file.filename}`;
  res.json({ success: true, videoUrl });
};
