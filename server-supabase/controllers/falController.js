import { fal } from "@fal-ai/client";
import dotenv from "dotenv/config";

import { client } from "../configs/posthog.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  checkModelExists,
  createModel,
  getCredits,
  getModel,
  getModelById,
  updateCredits,
  updateFashionCredits,
  updateModel,
  updateModelCredits,
} from "./databaseController.js";
import axios from "axios";
import FormData from "form-data";
import { styleAndPrompts } from "../utils/headshotPrompts.js";
import { sendEventToClients } from "../routes/sseRoutes.js";

fal.config({
  credentials: process.env.FAL_API_KEY,
});

async function safelyRestoreCredits(userEmail, amountToRestore, type) {
  try {
    if (!userEmail || amountToRestore <= 0) {
      return false;
    }

    const creditsInfo = await getCredits(userEmail);

    if (type === "model") {
      return await updateModelCredits(
        userEmail,
        creditsInfo.model_credits + amountToRestore
      );
    } else if (type === "fashion") {
      return await updateFashionCredits(
        userEmail,
        creditsInfo.fashion_credits + amountToRestore
      );
    } else if (type === "normal") {
      return await updateCredits(
        userEmail,
        creditsInfo.credits + amountToRestore
      );
    }
  } catch (error) {
    console.error("Error restoring credits:", error);
    return false;
  }
}

export async function generateFashionImage(req, res) {
  const { userId, category, userEmail, numberOfImages } = req.body;

  let creditsInfo;
  let creditsUsed = numberOfImages * 10 || 10;
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
      await safelyRestoreCredits(userEmail, usedCredits, "fashion");
    }

    creditsInfo = await getCredits(userEmail);

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

    const result = await fal.subscribe("fal-ai/fashn/tryon/v1.5", {
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
      await safelyRestoreCredits(userEmail, usedCredits, "fashion");
    }

    creditsInfo = await getCredits(userEmail);

    client.captureException(err, userEmail);

    return res.status(500).json(
      new ApiResponse(500, "Failed to generate fashion image", {
        error: err.message,
        remainingCredits: creditsInfo.fashion_credits,
      })
    );
  }
}

export async function trainFluxModel(req, res) {
  const { modelName, userId, triggerWord, gender, ethnicity, userEmail } =
    req.body;

  let creditsInfo;
  let creditsDeducted = false;

  //Credits validation and deduction
  try {
    const modelExists = await checkModelExists(userId, modelName);
    if (modelExists) {
      return res.status(400).json(
        new ApiResponse(400, "Model name already exists", {
          error: "Model name already exists",
        })
      );
    }

    creditsInfo = await getCredits(userEmail);

    if (creditsInfo.model_credits <= 0) {
      return res.status(400).json(
        new ApiResponse(400, "You have exhausted your monthly model credits", {
          error: "You have exhausted your monthly model credits",
        })
      );
    }

    // Deduct model_credits
    const errorOrNot = await updateModelCredits(
      userEmail,
      creditsInfo.model_credits - 1
    );

    if (errorOrNot === 0) {
      return res.status(500).json(
        new ApiResponse(500, "We are having some issues", {
          error: "We are having some issues",
        })
      );
    }

    creditsDeducted = true;
  } catch (err) {
    console.log("Error in credit processing:", err);
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Error processing model credits", {
        error: err.message,
      })
    );
  }

  // Model training process
  try {
    client.capture({
      distinctId: userEmail,
      event: "model_training started",
      properties: {
        model_name: modelName,
        trigger_word: triggerWord,
        gender: gender,
      },
    });

    const zipBuffer = req.file.buffer;
    const zipBlob = new Blob([zipBuffer], { type: "application/zip" });

    // const formData = new FormData();
    // formData.append("content", zipBlob, "images.zip");

    // Upload images to Fal
    const uploadUrl = await fal.storage.upload(zipBlob);

    const result = await fal.queue.submit("fal-ai/turbo-flux-trainer", {
      input: {
        images_data_url: uploadUrl,
        trigger_phrase: triggerWord,
        steps: 1000,
        learning_rate: 0.00115,
        face_crop: true,
        training_style: "subject",
      },
      webhookUrl: process.env.FAL_WEBHOOK_URL,
    });

    console.log("Model training started");

    const createdModel = await createModel(
      userId,
      userEmail,
      result.request_id,
      modelName,
      triggerWord,
      "started",
      gender,
      ethnicity
    );

    if (createdModel.errorOrSuccessFlag === 0) {
      // Restore credit
      if (creditsDeducted) {
        await safelyRestoreCredits(userEmail, 1, "model");
      }
      return res.status(400).json(
        new ApiResponse(400, "Error in database", {
          error: "Error in database",
        })
      );
    }

    // Everything went well
    return res.status(200).json(
      new ApiResponse(200, "Model training started", {
        status: "started",
        model: createdModel.model,
      })
    );
  } catch (err) {
    console.log("Couldn't train the model. Error: ", err);

    await fal.queue.cancel("fal-ai/turbo-flux-trainer", {
      requestId: result.request_id,
    });

    // Restore credits if they were deducted
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, 1, "model");
    }
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Couldn't train the model", {
        error: "Couldn't train the model",
      })
    );
  }
}

// Example of a request from Fal AI
// {
//   status: 'IN_QUEUE',
//   request_id: '7d4a54ce-11a0-4705-90e6-b0cb934a7199',
//   response_url: 'https://queue.fal.run/fal-ai/turbo-flux-trainer/requests/7d4a54ce-11a0-4705-90e6-b0cb934a7199',
//   status_url: 'https://queue.fal.run/fal-ai/turbo-flux-trainer/requests/7d4a54ce-11a0-4705-90e6-b0cb934a7199/status',
//   cancel_url: 'https://queue.fal.run/fal-ai/turbo-flux-trainer/requests/7d4a54ce-11a0-4705-90e6-b0cb934a7199/cancel',
//   logs: null,
//   metrics: {},
//   queue_position: 0
// }

export async function runPromptFluxImage(req, res) {
  const { userId, modelName, prompt, numberOfImages, userEmail } = req.body;

  let creditsInfo;
  let usedCredits = 10 * numberOfImages;
  let creditsDeducted = false;

  client.capture({
    distinctId: userEmail,
    event: "custom_image generated",
  });

  // Create validation and deduction
  try {
    creditsInfo = await getCredits(userEmail);
    console.log(`Credits for ${userEmail} are ${creditsInfo.credits}`);
    if (creditsInfo.credits < usedCredits) {
      return res.status(400).json(
        new ApiResponse(400, "Insufficient credits to run the model", {
          error: "Insufficient credits to run the model",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    await updateCredits(userEmail, creditsInfo.credits - usedCredits);
    creditsDeducted = true;
  } catch (err) {
    client.captureException(err, userEmail);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Error processing credits", { error: err.message })
      );
  }

  // Model execution
  try {
    const model = await getModel(userId, modelName);

    //Validate model exists
    if (!model || model.length === 0) {
      if (creditsDeducted) {
        await safelyRestoreCredits(userEmail, usedCredits, "normal");
      }
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model was not found",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    const modelUrl = model[0].model_path;
    let modelGender = model[0].gender;
    if (modelGender.toLowerCase() === "other") {
      modelGender = " ";
    }
    const modelTriggerWord = model[0].trigger_word;
    const enhancedPrompt = `${modelTriggerWord} ${modelGender}. ${prompt}`;

    // Run model
    const result = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt: enhancedPrompt,
        image_size: "square_hd",
        loras: [
          {
            path: modelUrl,
            scale: 1,
          },
        ],
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: numberOfImages,
        enable_safety_checker: false,
        output_format: "png",
        sync_mode: true,
      },
    });

    const outputURL = [];
    result.data.images.forEach((image) => {
      outputURL.push(image.url);
    });

    return res.status(200).json(
      new ApiResponse(200, "Model run successfully", {
        imageUrls: outputURL,
        remainingCredits: creditsInfo.credits - usedCredits,
      })
    );
  } catch (err) {
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits, "normal");
    }
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Couldn't run the model", {
        error: err.message,
        remainingCredits: creditsInfo.credits,
      })
    );
  }
}

export async function runHeadshotFluxImage(req, res) {
  const { userId, modelName, numberOfImages, style, userEmail } = req.body;

  let creditsInfo;
  let usedCredits = 10 * numberOfImages;
  let creditsDeducted = false;

  client.capture({
    distinctId: userEmail,
    event: "headshot generated",
  });

  // Create validation and deduction
  try {
    creditsInfo = await getCredits(userEmail);
    console.log(`Credits for ${userEmail} are ${creditsInfo.credits}`);
    if (creditsInfo.credits < usedCredits) {
      return res.status(400).json(
        new ApiResponse(400, "Insufficient credits to run the model", {
          error: "Insufficient credits to run the model",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    await updateCredits(userEmail, creditsInfo.credits - usedCredits);
    creditsDeducted = true;
  } catch (err) {
    client.captureException(err, userEmail);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Error processing credits", { error: err.message })
      );
  }

  // Model execution
  try {
    const model = await getModel(userId, modelName);

    //Validate model exists
    if (!model || model.length === 0) {
      if (creditsDeducted) {
        await safelyRestoreCredits(userEmail, usedCredits, "normal");
      }
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model was not found",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    const modelUrl = model[0].model_path;
    const modelGender = model[0].gender;
    const modelTriggerWord = model[0].trigger_word;

    const prompt = styleAndPrompts.find((item) => {
      return (
        item.style.toLowerCase() === style.toLowerCase() &&
        item.gender.toLowerCase() === modelGender.toLowerCase()
      );
    });

    // Validate prompt exists
    if (!prompt) {
      if (creditsDeducted) {
        await safelyRestoreCredits(userEmail, usedCredits, "normal");
      }
      return res.status(400).json(
        new ApiResponse(400, "Invalid style or gender combination", {
          error: "No matching prompt found for the provided style and gender",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    const enhancedPrompt = `${modelTriggerWord} ${modelGender}. ${prompt.prompt}`;

    // Run model
    const result = await fal.subscribe("fal-ai/flux-lora", {
      input: {
        prompt: enhancedPrompt,
        image_size: "square_hd",
        loras: [
          {
            path: modelUrl,
            scale: 1,
          },
        ],
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: numberOfImages,
        enable_safety_checker: false,
        output_format: "png",
        sync_mode: true,
      },
    });

    const outputURL = [];
    result.data.images.forEach((image) => {
      outputURL.push(image.url);
    });

    return res.status(200).json(
      new ApiResponse(200, "Model run successfully", {
        imageUrls: outputURL,
        remainingCredits: creditsInfo.credits - usedCredits,
      })
    );
  } catch (err) {
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits, "normal");
    }
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Couldn't run the model", {
        error: err.message,
        remainingCredits: creditsInfo.credits,
      })
    );
  }
}

export async function runStyleImages(req, res) {
  const { userId, userEmail, style } = req.body;

  let creditsInfo;
  let creditsUsed = 10;
  let creditsDeducted = false;

  // Credit validation and deduction
  try {
    creditsInfo = await getCredits(userEmail);
    console.log(`Credits for ${userEmail} are ${creditsInfo.credits}`);

    if (creditsInfo.credits < creditsUsed) {
      return res.status(400).json(
        new ApiResponse(
          400,
          "Insufficient credits for style image generation",
          {
            error: "Insufficient credits for style image generation",
            remainingCredits: creditsInfo.credits,
          }
        )
      );
    }

    await updateCredits(userEmail, creditsInfo.credits - creditsUsed);
    creditsDeducted = true;

    client.capture({
      distinctId: userEmail,
      event: "style_image_generated",
    });
  } catch (err) {
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Error processing credits", {
        error: err.message,
        remainingCredits: creditsInfo?.credits || 0,
      })
    );
  }

  // Validate required image
  if (!req.file) {
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits, "normal");
    }

    creditsInfo = await getCredits(userEmail);

    return res.status(400).json(
      new ApiResponse(400, "Missing required image", {
        error: "Missing required image",
        remainingCredits: creditsInfo.credits,
      })
    );
  }

  // Upload image to Fal
  const imageFile = req.file;
  const imageBlob = new Blob([imageFile.buffer], {
    type: imageFile.mimetype,
  });
  imageBlob.name = imageFile.originalname;

  // Run the styles
  try {
    const imageUrl = await fal.storage.upload(imageBlob);

    let output;

    switch (style) {
      case "ghibli":
        output = await runStyle(
          imageUrl,
          "Turn this image into a Ghibli style image"
        );
        break;
      case "simpsons":
        output = await runStyle(
          imageUrl,
          "Turn this image into a Simpsons style image"
        );
        break;
      case "southpark":
        output = await runStyle(
          imageUrl,
          "Turn this image into a Southpark style image"
        );
        break;
      case "rickandmorty":
        output = await runStyle(
          imageUrl,
          "Turn this image into a Rick and Morty style image"
        );
        break;
      case "manga":
        output = await runStyle(
          imageUrl,
          "Turn this image into a black & white manga panel"
        );
        break;
      case "pixar":
        output = await runStyle(
          imageUrl,
          "Turn this image into a Pixar style image"
        );
        break;
      case "samurai":
        output = await runStyle(imageUrl, "Turn this person into a samurai");
        break;
      case "knight":
        output = await runStyle(
          imageUrl,
          "Turn this person into a Medieval Knight"
        );
        break;
      case "genderswap":
        output = await runStyle(
          imageUrl,
          "Turn this person into the opposite gender"
        );
        break;
      default:
        if (creditsDeducted) {
          await safelyRestoreCredits(userEmail, creditsUsed, "normal");
        }
        return res.status(400).json(
          new ApiResponse(400, "Invalid style", {
            error: "Invalid style",
          })
        );
    }

    if (!output) {
      throw new Error("No output from style");
    }

    // Return successful response
    return res.status(200).json(
      new ApiResponse(200, "Styles image generated successfully", {
        imageUrls: [output],
        remainingCredits: creditsInfo.credits,
      })
    );
  } catch (err) {
    // Restore credits if they were deducted
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, creditsUsed, "normal");
    }
    client.captureException(err, userEmail);
    return res.status(500).json(
      new ApiResponse(500, "Error generating styles image", {
        error: err.message,
        remainingCredits: creditsInfo.credits,
      })
    );
  }
}

async function runStyle(imageUrl, prompt) {
  try {
    const result = await fal.subscribe("fal-ai/flux-pro/kontext/max", {
      input: {
        image_url: imageUrl,
        prompt: prompt,
        safety_tolerance: 5,
        output_format: "png",
      },
      logs: true,
    });
    return result.data.images[0].url;
  } catch (err) {
    console.error("Error running style:", err);
    return null;
  }
}

export async function falWebhook(req, res) {
  console.log("Received webhook from Fal AI");
  console.log(req.body);

  const { request_id, status, payload } = req.body;

  const model = await getModelById(request_id);

  if (!model || model.length === 0) {
    return res.json({ detail: "Model not found" }, { status: 404 });
  }

  const userId = model[0].user_id;
  const userEmail = model[0].email;

  if (status === "OK") {
    const { diffusers_lora_file } = payload;
    const { url } = diffusers_lora_file;

    await updateModel(request_id, "succeeded", url);
    sendEventToClients({ request_id: request_id, status: "succeeded" }, userId);
    return res.status(200).json({ detail: "Webhook received and succeeded" });
  } else if (status === "ERROR") {
    const creditsInfo = await getCredits(userEmail);
    await updateModelCredits(userEmail, creditsInfo.model_credits + 1);
    await updateModel(request_id, "failed");
    sendEventToClients({ request_id: request_id, status: "failed" }, userId);
    return res.status(200).json({ detail: "Webhook received and failed" });
  } else {
    return res.status(200).json({ detail: "Webhook received but not handled" });
  }
}

// {
//   request_id: '5b25097d-c4f4-4460-a15c-467cca3aaf2e',
//   gateway_request_id: '5b25097d-c4f4-4460-a15c-467cca3aaf2e',
//   status: 'OK',
//   error: null,
//   payload: {
//     diffusers_lora_file: {
//       url: 'https://v3.fal.media/files/lion/HCxFT01QJeAJ0Ma9KjGXM_pytorch_lora_weights.safetensors',
//       content_type: 'application/octet-stream',
//       file_name: 'pytorch_lora_weights.safetensors',
//       file_size: 129184944
//     },
//     config_file: {
//       url: 'https://v3.fal.media/files/zebra/LE8q19r4AuahfKgR6SlyN_config.json',
//       content_type: 'application/octet-stream',
//       file_name: 'config.json',
//       file_size: 1232
//     }
//   }
// }
