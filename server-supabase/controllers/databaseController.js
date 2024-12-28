import dotenv from "dotenv";
import fs from "fs";
import { File } from "node-fetch-native-with-agent";
import path from "path";
import { pipeline } from "stream/promises";
dotenv.config();

import supabase from "../configs/supabase.js";
import ApiResponse from "../utils/ApiResponse.js";

export async function createModel(
  userId,
  modelName,
  triggerWord,
  status,
  modelId,
  modelVersion
) {
  try {
    const { data, error } = await supabase
      .from("Models")
      .insert({
        model_name: modelName,
        trigger_word: triggerWord,
        status: status,
        model_id: modelId,
        model_version: modelVersion,
        user_id: userId,
      })
      .select();
    if (error) {
      throw error;
    }
    console.log("Model created: ", data);
  } catch (err) {
    console.log("Error creating model: ", err);
  }
}

export async function getModel(userId, modelName) {
  try {
    const { data, error } = await supabase
      .from("Models")
      .select("*")
      .eq("user_id", userId)
      .eq("model_name", modelName);

    if (error) {
      throw error;
    }
    console.log("Models fetched: ", data);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateModel(modelId, status, modelVersion) {
  try {
    const { data, error } = await supabase
      .from("Models")
      .update({
        model_version: modelVersion,
        status: status,
      })
      .eq("model_id", modelId)
      .select();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteModel(modelId) {
  try {
    await supabase.from("Models").delete().eq("model_id", modelId);
  } catch (err) {
    throw err;
  }
}

const InputFile = {
  fromBuffer: (parts, name) => {
    return new File([parts], name);
  },
  fromPath: (path) => {
    const realPath = fs.realpathSync(path);
    const contents = fs.readFileSync(realPath);
    return new File([contents], path.split("/").pop());
  },
};

export async function saveImage(req, res) {
  const { userId, fileUrl } = req.body;
  const endpoint = process.env.APPWRITE_ENDPOINT;
  const storageId = process.env.APPWRITE_STORAGE_ID;
  const projectId = process.env.APPWRITE_PROJECTID;

  try {
    const tempFilePath = path.join(process.cwd(), Date.now() + ".webp");

    const responseFile = await fetch(fileUrl);
    const fileStream = fs.createWriteStream(tempFilePath);
    await pipeline(responseFile.body, fileStream);

    const file = InputFile.fromPath(tempFilePath);

    const image = await storage.createFile(
      process.env.APPWRITE_STORAGE_ID,
      ID.unique(),
      file
    );

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
    console.log("Image created: ", image.$id);

    /* Get file url from storage */
    const imageUrl = `${endpoint}/storage/buckets/${storageId}/files/${image.$id}/view?project=${projectId}`;

    /* Create image document in database */
    const response = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_IMAGES_COLLECTION_ID,
      ID.unique(),
      {
        user_id: userId,
        image_url: imageUrl,
      }
    );
    return res.status(200).json(
      new ApiResponse(200, "Image saved", {
        response,
      })
    );
  } catch (err) {
    return res.status(500).json(
      new ApiResponse(500, "Error saving image", {
        error: err.message,
      })
    );
  }
}

export async function getImages(req, res) {
  const { userId } = req.body;
  const query = Query.equal("user_id", userId);
  try {
    /* Get images from database */
    const response = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID,
      process.env.APPWRITE_IMAGES_COLLECTION_ID,
      [query]
    );
    let imageUrls = [];
    response.documents.forEach((image) => {
      imageUrls.push(image.image_url);
    });
    console.log("Images fetched: ", imageUrls);
    return res
      .status(200)
      .json(new ApiResponse(200, "Images fetched", { imageUrls }));
  } catch (err) {
    return res
      .status(500)
      .json(
        new ApiResponse(500, "Error fetching images", { error: err.message })
      );
  }
}
