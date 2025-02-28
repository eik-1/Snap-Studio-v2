import express from "express";

import {
  deleteImage,
  getHeadshotImages,
  getImages,
  getUserModels,
  getUserSubscriptionDetails,
  saveHeadshot,
  saveImage,
} from "../controllers/databaseController.js";
import isUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/user-models", isUserAuthenticated, getUserModels);

router.post("/save-image", isUserAuthenticated, saveImage);
router.post("/save-headshot-image", isUserAuthenticated, saveHeadshot);
router.post("/get-saved-images", isUserAuthenticated, getImages);
router.post("/get-saved-headshots", isUserAuthenticated, getHeadshotImages);
router.post("/delete-image", isUserAuthenticated, deleteImage);

//router.post("/get-credits", isUserAuthenticated, checkCredits);
router.post(
  "/get-subscription",
  isUserAuthenticated,
  getUserSubscriptionDetails
);

export default router;
