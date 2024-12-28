import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";

import { response } from "express";
import { replicate } from "../configs/replicateConfig.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  createModel,
  deleteModel,
  getModel,
  updateModel,
} from "./databaseController.js";

dotenv.config();

export async function trainOstrisModel(req, res) {
  try {
    const { modelName, userId, triggerWord } = req.body;
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
      "29337367d801d93e9193dafd8fcfb5653eeacd841fe85db9118023fbb10ebed0",
      {
        destination: `eik-1/snapshot`,
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
      }
    );
    console.log("Training started: ", training);
    await createModel(
      userId,
      modelName,
      triggerWord,
      training.status,
      training.id
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
  const { userId } = req.body;
  try {
    const model = await getModel(userId);
    if (!model || !model.documents || model.documents.length === 0) {
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model is not found.",
        })
      );
    }

    const modelId = model.documents[0].model_id;
    const response = await replicate.trainings.get(modelId);
    if (response.status === "failed") {
      await deleteModel(userId);
    }
    if (response.status === "succeeded") {
      await updateModel(userId, response.status, response.output.version);
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
  const { userId } = req.body;
  try {
    const model = await getModel(userId);
    if (!model || !model.documents || model.documents.length === 0) {
      return res.status(404).json(
        new ApiResponse(404, "Model not found", {
          error: "The requested model is not found.",
        })
      );
    }
    const triggerWord = model.documents[0].trigger_word;
    const modelName = model.documents[0].model_name;
    return res.status(200).json(
      new ApiResponse(200, "Trigger word", {
        triggerWord,
        modelName,
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
  const { userId, prompt, numberOfImages } = req.body;
  console.log(userId, prompt, numberOfImages);
  try {
    const model = await getModel(userId);
    const modelVersion = model.documents[0].model_version;
    console.log("Generating images...");
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
