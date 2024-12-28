import dotenv from "dotenv";
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

export async function saveImage(req, res) {
  const { userId, fileUrl } = req.body;
  try {
    const blob = await fetch(fileUrl).then((r) => r.blob());
    const supabaseUrl = process.env.SUPABASE_URL;
    const fileName = `ai-image-${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, blob);

    if (error) {
      throw error;
    }

    const imageUrl = `${supabaseUrl}/storage/v1/object/public/images/${fileName}`;

    /* Create image document in database */
    const { data: response, error: dbError } = await supabase
      .from("Images")
      .insert({
        image_urls: imageUrl,
        user_id: userId,
      });
    if (dbError) {
      throw dbError;
    }

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
