const {
  getAll,
  create,
  removeImage,
} = require("../controllers/image.controllers");
const express = require("express");
const upload = require("../utils/multer");
const imageRouter = express.Router();
const verifyJWT = require("../utils/verifyJWT");

imageRouter.route("/").get(verifyJWT, getAll);

imageRouter.route("/").post(verifyJWT, upload.single("image"), create);

imageRouter.route("/:id").delete(verifyJWT, removeImage);

module.exports = imageRouter;
