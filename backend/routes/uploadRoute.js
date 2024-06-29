const express = require("express");
const router = express.Router();
const upload = require("../config/upload.js"); // Path to your multer configuration file
const uploadController = require("../controllers/uploadController"); // Path to your controller file

/**
 * @swagger
 * /api/upload/image:
 *   post:
 *     summary: Upload an image
 *     description: Upload an image to the server. The image type should be specified in the request body.
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The image file to upload.
 *         required: true
 *       - in: formData
 *         name: type
 *         type: string
 *         description: The type of image (facility or user).
 *         required: true
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the uploaded image.
 *       400:
 *         description: No file uploaded.
 */
router.post(
  "/image",
  upload.single("file"),
  uploadController.uploadImage
);

/**
 * @swagger
 * /api/upload/video:
 *   post:
 *     summary: Upload a video
 *     description: Upload a video to the server. The video type should be specified in the request body.
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The video file to upload.
 *         required: true
 *       - in: formData
 *         name: type
 *         type: string
 *         description: The type of video (facility or event).
 *         required: true
 *     responses:
 *       200:
 *         description: Video uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videoUrl:
 *                   type: string
 *                   description: The URL of the uploaded video.
 *       400:
 *         description: No file uploaded.
 */
router.post(
  "/video",
  upload.single("file"),
  uploadController.uploadVideo
);

module.exports = router;
