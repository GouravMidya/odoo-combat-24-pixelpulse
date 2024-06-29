const multer = require("multer");
const path = require("path");

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath;
    console.log("Mimetype: ", file.mimetype);
    console.log("Request body type: ", req.body.type);
    if (file.mimetype.startsWith("image/")) {
      if (req.body.type === "facility") {
        uploadPath = path.resolve(
          __dirname,
          "../public/uploads/images/facilities"
        );
      } else if (req.body.type === "user") {
        uploadPath = path.resolve(__dirname, "../public/uploads/images/users");
      }
    } else if (file.mimetype.startsWith("video/")) {
      if (req.body.type === "facility") {
        uploadPath = path.resolve(
          __dirname,
          "../public/uploads/videos/facilities"
        );
      } else if (req.body.type === "event") {
        uploadPath = path.resolve(__dirname, "../public/uploads/videos/events");
      }
    }
    if (!uploadPath) {
      const errMsg = `Invalid upload type (${req.body.type}) or mimetype (${file.mimetype})`;
      console.error(errMsg);
      return cb(new Error(errMsg));
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
  },
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // Limit file size to 50MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|mp4|avi|mov/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images and Videos Only!");
    }
  },
});

module.exports = upload;
