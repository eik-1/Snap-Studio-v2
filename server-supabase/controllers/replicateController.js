import axios from "axios";
import dotenv from "dotenv/config";
import FormData from "form-data";
import { v4 as uuidv4 } from "uuid";

import {
  checkModelExists,
  createModel,
  getCredits,
  getModel,
  getModelById,
  updateCredits,
  updateModel,
  updateModelCredits,
} from "./databaseController.js";

import { validateWebhook } from "replicate";
import { client } from "../configs/posthog.js";
import { replicate } from "../configs/replicateConfig.js";
import { sendEventToClients } from "../routes/sseRoutes.js";
import ApiResponse from "../utils/ApiResponse.js";
import { styleAndPrompts } from "../utils/headshotPrompts.js";

export async function trainOstrisModel(req, res) {
  const { modelName, userId, triggerWord, gender, ethnicity, userEmail } =
    req.body;

  let creditsInfo;
  let creditsDeducted = false;

  // Credit validation and deduction
  try {
    // Check if model name already exists
    const modelExists = await checkModelExists(userId, modelName);
    if (modelExists) {
      return res.status(400).json(
        new ApiResponse(400, "Model Name Already Exists", {
          error: "Model Name Already Exists",
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

  // Model Training Process
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

    /* Upload zip to Replicate's File API */
    const formData = new FormData();
    formData.append("content", zipBuffer, {
      filename: "images.zip",
      contentType: "application/zip",
    });

    const uploadResponse = await axios.post(
      "https://api.replicate.com/v1/files",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const fileUrl = uploadResponse.data.urls.get;

    const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "b6af14222e6bd9be257cbc1ea4afda3cd0503e1133083b9d1de0364d8568e6ef",
      {
        destination: "snapxstudio/snapstudio",
        input: {
          steps: 1500,
          lora_rank: 16,
          optimizer: "adamw8bit",
          batch_size: 1,
          resolution: "512,768,1024",
          autocaption: true,
          input_images: fileUrl,
          trigger_word: triggerWord,
          learning_rate: 0.0004,
          wandb_project: "flux_train_replicate",
          wandb_save_interval: 100,
          caption_dropout_rate: 0.05,
          cache_latents_to_disk: false,
          wandb_sample_interval: 100,
          gradient_checkpointing: false,
        },
        webhook: process.env.REPLICATE_WEBHOOK_URL,
        webhook_events_filter: ["start", "completed", "output", "logs"],
      }
    );

    const createdModel = await createModel(
      userId,
      userEmail,
      modelName,
      triggerWord,
      training.status,
      training.id, // to identify model's ID while version is used to run the model
      gender,
      ethnicity
    );

    // If the model creation failed
    if (createdModel.errorOrSuccessFlag === 0) {
      // Cancel the training on Replicate
      try {
        await replicate.trainings.cancel(training.id);
        console.log(`Training ${training.id} cancelled due to database error`);
      } catch (cancelError) {
        console.error(`Failed to cancel training ${training.id}:`, cancelError);
      }

      // Restore credit
      if (creditsDeducted) {
        await safelyRestoreCredits(userEmail, 1, true);
      }

      return res.status(400).json(
        new ApiResponse(400, "Error in database", {
          error: "Error in database",
        })
      );
    }

    return res.status(200).json(
      new ApiResponse(200, "Model training started", {
        status: training.status,
        model: createdModel.model,
      })
    );
  } catch (err) {
    console.log("Couldn't train the model. Error: ", err);

    // Restore credits if they were deducted
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, 1, true);
    }

    client.captureException(err, userEmail);

    return res.status(500).json(
      new ApiResponse(500, "Couldn't train the model", {
        error: "Couldn't train the model",
      })
    );
  }
}

export async function trainingTest(req, res) {
  try {
    const { modelName, userId, triggerWord, gender, ethnicity, userEmail } =
      req.body;
    console.log(req.body);

    console.log(`[TEST API] Starting test training for model: ${modelName}`);

    // Use your real DB call to get credits
    const creditsInfo = await getCredits(userEmail);
    console.log(`[TEST API] User credits: ${creditsInfo.model_credits}`);

    if (creditsInfo.model_credits <= 0) {
      return res.status(500).json(
        new ApiResponse(500, "You have exhausted your monthly model credits", {
          error: "You have exhausted your monthly model credits",
        })
      );
    }

    // Use your real DB call to deduct credits
    const updateResult = await updateModelCredits(
      userEmail,
      creditsInfo.model_credits - 1
    );

    if (updateResult === 0) {
      return res.status(500).json(
        new ApiResponse(500, "We are having some issues", {
          error: "We are having some issues",
        })
      );
    }

    let fileUrl = "https://example.com/images.zip";
    console.log(`[TEST API] Mock file URL: ${fileUrl}`);

    // Simulate training process
    const trainingId = uuidv4();
    const trainingStatus = "starting";

    console.log(
      `[TEST API] Training started: ${trainingId}, status: ${trainingStatus}`
    );

    // Use your real DB call to create the model
    const createdModel = await createModel(
      userId,
      userEmail,
      modelName,
      triggerWord,
      trainingStatus,
      trainingId,
      gender,
      ethnicity
    );

    if (createdModel.errorOrSuccessFlag === 0) {
      // Refund credits if model creation fails
      await updateModelCredits(userEmail, creditsInfo.model_credits);

      return res.status(500).json(
        new ApiResponse(500, "Model Name Already Exists", {
          error: "Model Name Already Exists",
        })
      );
    }

    // Success response
    setTimeout(() => {
      console.log(`[TEST API] Training completed: ${trainingId}`);
      updateModel(trainingId, "succeeded");
      sendEventToClients({ model_id: trainingId, status: "succeeded" }, userId);
      console.log("event sent to client");
    }, 60000);
    return res.status(200).json(
      new ApiResponse(200, "Model training started", {
        status: trainingStatus,
        model: createdModel.model,
      })
    );
  } catch (error) {
    console.error("Error training model:", error);

    // Refund credits on error
    if (req.body?.userEmail) {
      const creditsInfo = await getCredits(req.body.userEmail);
      await updateModelCredits(req.body.userEmail, creditsInfo.model_credits);
    }

    return res.status(500).json(
      new ApiResponse(500, "Could not train the model", {
        error: error.message || "Could not train the model",
      })
    );
  }
}

// export async function getTrainingStatus(req, res) {
//   const { userId, modelName } = req.body;
//   try {
//     const model = await getModel(userId, modelName);
//     if (!model || model.length === 0) {
//       return res.status(404).json(
//         new ApiResponse(404, "Model not found", {
//           error: "The requested model is not found.",
//         })
//       );
//     }

//     const modelId = model[0].model_id;
//     const response = await replicate.trainings.get(modelId);
//     if (response.status === "failed") {
//       await deleteModel(modelId);
//     }
//     if (response.status === "succeeded") {
//       await updateModel(modelId, response.status, response.output.version);
//     }
//     return res.status(200).json(
//       new ApiResponse(200, "Training status", {
//         trainingStatus: response.status,
//       })
//     );

//     // response.output.version
//   } catch (err) {
//     if (err.response?.status === 404) {
//       return res.status(404).json(
//         new ApiResponse(404, "Model not found", {
//           error: "The requested model is not found.",
//         })
//       );
//     }
//     return res.status(500).json(
//       new ApiResponse(500, "Error getting training status", {
//         error: err.message,
//       })
//     );
//   }
// }

export async function getTriggerWord(req, res) {
  const { userId, modelName } = req.body;
  try {
    const model = await getModel(userId, modelName);
    if (!model || model.documents.length === 0) {
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model is not found.",
        })
      );
    }
    const triggerWord = model[0].trigger_word;
    return res.status(200).json(
      new ApiResponse(200, "Trigger word", {
        triggerWord,
      })
    );
  } catch (err) {
    return res.status(500).json(
      new ApiResponse(500, "Error getting trigger word", {
        error: err.message,
      })
    );
  }
}

/* HELPER FUNCTION */
async function safelyRestoreCredits(
  userEmail,
  amountToRestore,
  isModelCredit = false
) {
  try {
    if (!userEmail || amountToRestore <= 0) return false;

    const creditsInfo = await getCredits(userEmail);

    if (isModelCredit) {
      return await updateModelCredits(
        userEmail,
        creditsInfo.model_credits + amountToRestore
      );
    } else {
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

export async function runUserModel(req, res) {
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
        await safelyRestoreCredits(userEmail, usedCredits);
      }
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model was not found",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    const modelVersion = model[0].model_version;
    let modelGender = model[0].gender;
    if (modelGender.toLowerCase() === "other") {
      modelGender = " ";
    }
    const modelTriggerWord = model[0].trigger_word;
    const enhancedPrompt = `${modelTriggerWord} ${modelGender}. ${prompt}`;

    // Run model
    const output = await replicate.run(`${modelVersion}`, {
      input: {
        model: "dev",
        prompt: enhancedPrompt,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 100,
        num_outputs: numberOfImages,
        guidance_scale: 3.5,
      },
    });
    const outputURL = [];
    output.forEach((fileOutput) => {
      outputURL.push(fileOutput.url().href);
    });

    return res.status(200).json(
      new ApiResponse(200, "Model run successfully", {
        imageUrls: outputURL,
        remainingCredits: creditsInfo.credits - usedCredits,
      })
    );
  } catch (err) {
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits);
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

export async function runHeadshotUserModel(req, res) {
  const { userId, modelName, numberOfImages, style, userEmail } = req.body;

  let creditsInfo;
  let usedCredits = 10 * numberOfImages;
  let creditsDeducted = false;

  client.capture({
    distinctId: userEmail,
    event: "headshot generated",
  });

  // Credit validation and deduction
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
    return res.status(500).json(
      new ApiResponse(500, "Error processing credits", {
        error: err.message,
        remainingCredits: creditsInfo.credits,
      })
    );
  }

  // Model execution
  try {
    const model = await getModel(userId, modelName);

    //Validate model exists
    if (!model || model.length === 0) {
      if (creditsDeducted) {
        await safelyRestoreCredits(userEmail, usedCredits);
      }
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model was not found",
          remainingCredits: creditsInfo.credits,
        })
      );
    }

    const modelVersion = model[0].model_version;
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
        await safelyRestoreCredits(userEmail, usedCredits);
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
    const output = await replicate.run(`${modelVersion}`, {
      input: {
        model: "dev",
        prompt: enhancedPrompt,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 90,
        num_outputs: numberOfImages,
        guidance_scale: 3.5,
      },
    });
    const outputURL = [];
    output.forEach((fileOutput) => {
      outputURL.push(fileOutput.url().href);
    });

    return res.status(200).json(
      new ApiResponse(200, "Model run successfully", {
        imageUrls: outputURL,
        remainingCredits: creditsInfo.credits - usedCredits,
      })
    );
  } catch (err) {
    if (creditsDeducted) {
      await safelyRestoreCredits(userEmail, usedCredits);
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

export async function replicateWebhook(req, res) {
  const secret = process.env.REPLICATE_WEBHOOK_SECRET;
  if (!secret) {
    console.log(
      "Skipping webhook validation. To validate webhooks, set REPLICATE_WEBHOOK_SIGNING_SECRET"
    );
    const body = await req.json();
    console.log(body);
    return res.json(
      { detail: "Webhook received (but not validated)" },
      { status: 200 }
    );
  }

  const webhookIsValid = await validateWebhook(req, secret);
  if (!webhookIsValid) {
    return res.json({ detail: "Webhook is invalid" }, { status: 401 });
  }

  const webhookData = JSON.parse(req.body.toString());
  const { id, output, status } = webhookData;
  console.log("From Replicate: ", id, status);

  const model = await getModelById(id);
  if (!model || model.length === 0) {
    return res.json({ detail: "Model not found" }, { status: 404 });
  }

  const userId = model[0].user_id;
  const userEmail = model[0].email;
  if (status === "failed" || status === "canceled") {
    const creditsInfo = await getCredits(userEmail);
    await updateModelCredits(userEmail, creditsInfo.model_credits + 1);
    await updateModel(id, status);
    sendEventToClients({ model_id: id, status: "failed" }, userId);
    return res.json(
      { detail: "Webhook received but failed training" },
      { status: 200 }
    );
  } else if (status === "succeeded") {
    await updateModel(id, status, output.version);
    sendEventToClients({ model_id: id, status: "succeeded" }, userId);
    return res.json(
      { detail: "Webhook received and succeeded" },
      { status: 200 }
    );
  } else {
    console.log("Don't care about this status");
    return res.json(
      { detail: "Webhook received but not handled" },
      { status: 200 }
    );
  }
}
