import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

import {
  createModel,
  deleteModel,
  getCredits,
  getModel,
  getModelById,
  updateCredits,
  updateModel,
  updateModelCredits,
} from "./databaseController.js";

import { client } from "../configs/posthog.js";
import { replicate } from "../configs/replicateConfig.js";
import { sendEventToClients } from "../routes/sseRoutes.js";
import ApiResponse from "../utils/ApiResponse.js";
import { styleAndPrompts } from "../utils/headshotPrompts.js";

dotenv.config();

export async function trainOstrisModel(req, res) {
  try {
    const { modelName, userId, triggerWord, gender, ethnicity, userEmail } =
      req.body;

    const creditsInfo = await getCredits(userEmail);

    if (creditsInfo.model_credits <= 0) {
      return res.status(500).json(
        new ApiResponse(500, "You have exhausted your monthly model credits", {
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

    client.capture({
      distinctId: userEmail,
      event: "model_training started",
      properties: {
        model_name: modelName,
        trigger_word: trigger,
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
      "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
      {
        destination: `snapxstudio/snapstudio`,
        input: {
          steps: 1000,
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
        },
        webhook:
          "https://6bea-2405-201-6804-8156-297d-440-288e-5c1f.ngrok-free.app/webhook/replicate",
        webhook_events_filter: ["start", "completed"],
      }
    );

    console.log("Training started: ", training);
    const modelData = {
      userId,
      userEmail,
      modelName,
      triggerWord,
      gender,
      ethnicity,
      status: training.status,
      version: training.id,
      statusAcknowledged: false,
    };
    const errorOrSuccessFlag = await createModel(
      userId,
      modelName,
      triggerWord,
      gender,
      ethnicity,
      training.status,
      training.id // to identify model's ID while version is used to run the model
    );

    if (errorOrSuccessFlag === 0) {
      return res.status(500).json(
        new ApiResponse(500, "Model Name Already Exists", {
          error: "Model Name Already Exists",
        })
      );
    }

    return res.status(200).json(
      new ApiResponse(200, "Model training started", {
        status: training.status,
        modelData,
      })
    );
  } catch (err) {
    console.log("Couldn't train the model. Error: ", err);
    client.captureException(err, userEmail);
    const errorOrNot = await updateModelCredits(
      userEmail,
      creditsInfo.model_credits + 1
    );
    if (errorOrNot === 0) {
      return res.status(500).json(
        new ApiResponse(500, "We are having some issues", {
          error: "We are having some issues",
        })
      );
    }
    return res.status(500).json(
      new ApiResponse(500, "Couldn't train the model", {
        error: "Couldn't train the model",
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

export async function runUserModel(req, res) {
  const { userId, modelName, prompt, numberOfImages, userEmail } = req.body;
  let creditsInfo;
  let usedCredits;
  client.capture({
    distinctId: userEmail,
    event: "custom_image generated",
  });
  try {
    creditsInfo = await getCredits(userEmail);
    if (creditsInfo.credits <= 0) {
      return res.status(500).json(
        new ApiResponse(500, "Insufficient credits to run the model", {
          error: "Insufficient credits to run the model",
        })
      );
    }
    usedCredits = 10 * numberOfImages;
    await updateCredits(userEmail, creditsInfo.credits - usedCredits);
  } catch (err) {
    console.log("Couldn't run the model. Error: ", err);
    await updateCredits(userEmail, creditsInfo.credits + usedCredits);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Couldn't run the model", { error: err.message })
      );
  }

  try {
    const model = await getModel(userId, modelName);
    const modelVersion = model[0].model_version;
    const modelGender = model[0].gender;
    const modelTriggerWord = model[0].trigger_word;
    const enhancedPrompt = `${modelTriggerWord} ${modelGender}. ${prompt}`;

    const output = await replicate.run(`${modelVersion}`, {
      input: {
        model: "dev",
        prompt: enhancedPrompt,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 100,
        num_outputs: numberOfImages,
      },
    });
    const outputURL = [];
    output.forEach((fileOutput) => {
      outputURL.push(fileOutput.url().href);
    });
    console.log(outputURL);
    return res.status(200).json(
      new ApiResponse(200, "Model run successfully", {
        imageUrls: outputURL,
        remainingCredits: creditsInfo.credits - usedCredits,
      })
    );
  } catch (err) {
    console.log("Couldn't run the model. Error: ", err);
    await updateCredits(userEmail, creditsInfo.credits + usedCredits);
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
  let usedCredits;
  client.capture({
    distinctId: userEmail,
    event: "headshot generated",
  });
  try {
    creditsInfo = await getCredits(userEmail);
    console.log(creditsInfo);
    if (creditsInfo.credits <= 0) {
      return res.status(500).js>on(
        new ApiResponse(500, "Insufficient credits to run the model", {
          error: "Insufficient credits to run the model",
          remainingCredits: creditsInfo.credits,
        })
      );
    }
    usedCredits = 10 * numberOfImages;
    await updateCredits(userEmail, creditsInfo.credits - usedCredits);
  } catch (err) {
    console.log("Couldn't run the model. Error: ", err);
    await updateCredits(userEmail, creditsInfo.credits + usedCredits);
    client.captureException(err, userEmail);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Couldn't run the model", { error: err.message,
          remainingCredits: creditsInfo.credits,
         })
      );
  }

  try {
    console.log(creditsInfo);
    console.log(usedCredits);
    const model = await getModel(userId, modelName);
    const modelVersion = model[0].model_version;
    const modelGender = model[0].gender;
    const modelTriggerWord = model[0].trigger_word;
    //const modelEthnicity = model[0].ethnicity;
    const prompt = styleAndPrompts.find((item) => {
      return item.style === style && item.gender === modelGender;
    });
    const enhancedPrompt = `${modelTriggerWord} ${modelGender}. ${prompt.prompt}`;

    const output = await replicate.run(`${modelVersion}`, {
      input: {
        model: "dev",
        prompt: enhancedPrompt,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 90,
        num_outputs: numberOfImages,
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
    console.log("Couldn't run the model. Error: ", err);
    await updateCredits(userEmail, creditsInfo.credits + usedCredits);
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
  console.log("Replicate Webhook called");
  const { id, output, status } = req.body;
  const model = await getModelById(id);
  const userId = model[0].user_id;
  if (!model || model.length === 0) {
    return res.status(404).json(
      new ApiResponse(404, "Model not found", {
        error: "The requested model is not found.",
      })
    );
  }
  if (status === "failed") {
    await deleteModel(id);
    sendEventToClients({ id, status: "failed" }, userId);
  } else if (status === "succeeded") {
    await updateModel(id, status, output.version);
    sendEventToClients({ id, status: "succeeded" }, userId);
  } else {
    console.log("Don't care about this status");
  }
}
