import express from "express";

import {
  getImages,
  getUserModels,
  getUserSubscriptionDetails,
  saveImage,
} from "../controllers/databaseController.js";
import isUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/save-image", isUserAuthenticated, saveImage);
router.post("/get-saved-images", isUserAuthenticated, getImages);
router.get("/user-models", isUserAuthenticated, getUserModels);
//router.post("/get-credits", isUserAuthenticated, checkCredits);
router.post(
  "/get-subscription",
  isUserAuthenticated,
  getUserSubscriptionDetails
);

export default router;
