import express from "express";

import {
  deleteImage,
  getFashionImages,
  getHeadshotImages,
  getImages,
  getUserModels,
  getUserSubscriptionDetails,
  saveFashionImage,
  saveHeadshot,
  saveImage,
  updateModelAck,
} from "../controllers/databaseController.js";
import isUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user-models", isUserAuthenticated, getUserModels);
router.post("/update-model-ack", isUserAuthenticated, updateModelAck);

router.post("/save-image", isUserAuthenticated, saveImage);
router.post("/save-headshot-image", isUserAuthenticated, saveHeadshot);
router.post("/save-fashion-image", isUserAuthenticated, saveFashionImage);
router.post("/get-saved-images", isUserAuthenticated, getImages);
router.post("/get-saved-headshots", isUserAuthenticated, getHeadshotImages);
router.post("/get-saved-fashion-images", isUserAuthenticated, getFashionImages);
router.post("/delete-image", isUserAuthenticated, deleteImage);

//router.post("/get-credits", isUserAuthenticated, checkCredits);
router.post(
  "/get-subscription",
  isUserAuthenticated,
  getUserSubscriptionDetails
);

export default router;
