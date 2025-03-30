import { fal } from "@fal-ai/client";
import dotenv from "dotenv/config";

import { client } from "../configs/posthog.js";
import ApiResponse from "../utils/ApiResponse.js";
import { getCredits, updateFashionCredits } from "./databaseController.js";

fal.config({
  credentials: process.env.FAL_API_KEY,
});

async function safelyRestoreCredits(userEmail, amountToRestore) {
  try {
    if (!userEmail || amountToRestore <= 0) {
      return false;
    }

    const creditsInfo = await getCredits(userEmail);

    return await updateFashionCredits(
      userEmail,
      creditsInfo.fashion_credits + amountToRestore
    );
  } catch (error) {
    console.error("Error restoring credits:", error);
    return false;
  }
}

export async function generateFashionImage(req, res) {
  const { userId, category, userEmail, numberOfImages } = req.body;

  let creditsInfo;
  let creditsUsed = numberOfImages || 1;
  let creditsDeducted = false;

  // Credit validation and deduction
  try {
    creditsInfo = await getCredits(userEmail);
    console.log(`Credits for ${userEmail} are ${creditsInfo.fashion_credits}`);

    if (creditsInfo.fashion_credits < creditsUsed) {
      return res.status(400).json(
        new ApiResponse(
          400,
          "Insufficient credits for fashion image generation",
          {
            error: "Insufficient credits for fashion image generation",
            remainingCredits: creditsInfo.fashion_credits,
          }
        )
      );
    }

    await updateFashionCredits(
      userEmail,
      creditsInfo.fashion_credits - creditsUsed
    );
    creditsDeducted = true;

    client.capture({
      distinctId: userEmail,
      event: "fashion_image_generated",
    });
  } catch (err) {
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Error processing credits", {
        error: err.message,
        remainingCredits: creditsInfo?.fashion_credits || 0,
      })
    );
  }

  // Validate required files
  if (!req.files || !req.files.modelImg || !req.files.dressImg) {
    // Restore credits if they were deducted
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits);
    }

    return res.status(400).json(
      new ApiResponse(400, "Missing required images", {
        error: "Both model and dress images are required",
        remainingCredits: creditsInfo.fashion_credits,
      })
    );
  }

  // Define the model and dress images
  // Assuming the files are sent as multipart/form-data
  const multerModelImage = req.files["modelImg"]?.[0];
  const multerDressImage = req.files["dressImg"]?.[0];

  const modelImage = new Blob([multerModelImage.buffer], {
    type: multerModelImage.mimetype,
  });
  modelImage.name = multerModelImage.originalname;

  const dressImage = new Blob([multerDressImage.buffer], {
    type: multerDressImage.mimetype,
  });
  dressImage.name = multerDressImage.originalname;

  try {
    console.log("Uploading images to Fal AI...");

    const modelUrl = await fal.storage.upload(modelImage);
    const dressUrl = await fal.storage.upload(dressImage);

    let outputUrls = [];

    const result = await fal.subscribe("fashn/tryon", {
      input: {
        model_image: modelUrl,
        garment_image: dressUrl,
        category: category || "tops",
        garment_photo_type: "auto",
        guidance_scale: 2,
        num_samples: numberOfImages || 1,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    outputUrls = result.data.images.map((img) => {
      return img.url;
    });

    console.log(outputUrls);

    // Return successful response
    return res.status(200).json(
      new ApiResponse(200, "Fashion image generated successfully", {
        imageUrls: outputUrls,
        remainingCredits: creditsInfo.fashion_credits,
      })
    );
  } catch (err) {
    console.error("Error generating fashion image:", err);

    // Restore credits if they were deducted
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits);
    }

    client.captureException(err, userEmail);

    return res.status(500).json(
      new ApiResponse(500, "Failed to generate fashion image", {
        error: err.message,
        remainingCredits: creditsInfo.fashion_credits,
      })
    );
  }
}

// {
//   images: [
//     {
//       url: 'https://v3.fal.media/files/zebra/4-O1N9o4y3Mi_xEKhXqSd_db05f5dc15d54290a57b6b1918667274.png',
//       content_type: 'image/png',
//       file_name: 'db05f5dc15d54290a57b6b1918667274.png',
//       file_size: 671511,
//       width: 567,
//       height: 864
//     },
//     {
//       url: 'https://v3.fal.media/files/lion/hyXg3__GpN410hgqOf8lT_57c089168694400aba36da307b732c69.png',
//       content_type: 'image/png',
//       file_name: '57c089168694400aba36da307b732c69.png',
//       file_size: 681921,
//       width: 567,
//       height: 864
//     }
//   ]
// }
