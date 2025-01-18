import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

import { replicate } from "../configs/replicateConfig.js";
import { sendEventToClients } from "../routes/sseRoutes.js";
import ApiResponse from "../utils/ApiResponse.js";
import { styleAndPrompts } from "../utils/headshotPrompts.js";
import {
  createModel,
  deleteModel,
  getModel,
  getModelById,
  updateModel,
} from "./databaseController.js";

dotenv.config();

export async function trainOstrisModel(req, res) {
  try {
    const { modelName, userId, triggerWord, gender, ethnicity } = req.body;
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
    console.log(fileUrl);

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
    await createModel(
      userId,
      modelName,
      triggerWord,
      gender,
      ethnicity,
      training.status,
      training.id // to identify model's ID while version is used to run the model
    );
    return res.status(200).json(
      new ApiResponse(200, "Model training started", {
        status: training.status,
      })
    );
  } catch (err) {
    console.log("Couldn't train the model. Error: ", err);
    return res
      .status(500)
      .json({ error: "Couldn't train the model", details: err.message });
  }
}

export async function getTrainingStatus(req, res) {
  const { userId, modelName } = req.body;
  try {
    const model = await getModel(userId, modelName);
    if (!model || model.length === 0) {
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model is not found.",
        })
      );
    }

    const modelId = model[0].model_id;
    const response = await replicate.trainings.get(modelId);
    if (response.status === "failed") {
      await deleteModel(modelId);
    }
    if (response.status === "succeeded") {
      await updateModel(modelId, response.status, response.output.version);
    }
    return res.status(200).json(
      new ApiResponse(200, "Training status", {
        trainingStatus: response.status,
      })
    );

    // response.output.version
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model is not found.",
        })
      );
    }
    return res.status(500).json(
      new ApiResponse(500, "Error getting training status", {
        error: err.message,
      })
    );
  }
}

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
  const { userId, modelName, prompt, numberOfImages } = req.body;
  console.log(userId, prompt, numberOfImages);
  try {
    const model = await getModel(userId, modelName);
    const modelVersion = model[0].model_version;
    const output = await replicate.run(`${modelVersion}`, {
      input: {
        model: "dev",
        prompt: prompt,
        aspect_ratio: "1:1",
        output_format: "webp",
        output_quality: 90,
        num_outputs: numberOfImages,
      },
    });
    const outputURL = [];
    output.forEach((fileOutput) => {
      outputURL.push(fileOutput.url().href);
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Model run successfully", { output: outputURL })
      );
  } catch (err) {
    console.log("Couldn't run the model. Error: ", err);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Couldn't run the model", { error: err.message })
      );
  }
}

export async function runHeadshotUserModel(req, res) {
  const { userId, modelName, numberOfImages, style } = req.body;
  try {
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
        output_format: "webp",
        output_quality: 90,
        num_outputs: numberOfImages,
      },
    });
    const outputURL = [];
    output.forEach((fileOutput) => {
      outputURL.push(fileOutput.url().href);
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Model run successfully", { output: outputURL })
      );
  } catch (err) {
    console.log("Couldn't run the model. Error: ", err);
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Couldn't run the model", { error: err.message })
      );
  }
}

export async function replicateWebhook(req, res) {
  console.log("Replicate Webhook called");
  const { id, output, status } = req.body;
  const model = await getModelById(id);
  if (!model || model.length === 0) {
    return res.status(404).json(
      new ApiResponse(404, "Model not found", {
        error: "The requested model is not found.",
      })
    );
  }
  if (status === "failed") {
    await deleteModel(id);
    sendEventToClients({ id, status: "failed" });
  } else if (status === "succeeded") {
    await updateModel(id, status, output.version);
    sendEventToClients({ id, status: "succeeded" });
  } else {
    console.log("Don't care about this status");
  }
}

// {
//   "id": "ufawqhfynnddngldkgtslldrkq",
//   "version": "5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
//   "created_at": "2022-04-26T22:13:06.224088Z",
//   "started_at": null,
//   "completed_at": null,
//   "status": "starting",
//   "input": {
//     "text": "Alice"
//   },
//   "output": null,
//   "error": null,
//   "logs": null,
//   "metrics": {}
// }
