import express from "express";

import { saveImage, getImages } from "../controllers/databaseController.js";

const router = express.Router();

router.post("/save-image", saveImage);
router.post("/get-saved-images", getImages);

export default router;
