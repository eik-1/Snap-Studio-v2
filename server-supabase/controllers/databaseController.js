import dotenv from "dotenv";
dotenv.config();

import supabase from "../configs/supabase.js";
import ApiResponse from "../utils/ApiResponse.js";

/*MODELS TABLE*/

export async function createModel(
  userId,
  userEmail,
  modelName,
  triggerWord,
  status,
  modelId,
  gender,
  ethnicity
) {
  const { data: pre_existModel } = await supabase
    .from("Models")
    .select("*")
    .eq("model_id", userId)
    .eq("model_name", modelName);

  if (pre_existModel.length > 0) {
    console.log("Model already exists: ", pre_existModel);
    return 0;
  }
  const model = {
    user_id: userId,
    email: userEmail,
    model_id: modelId,
    model_name: modelName,
    trigger_word: triggerWord,
    status: status,
    gender: gender,
    ethnicity: ethnicity,
    status_ack: false,
  };

  try {
    const { data, error } = await supabase
      .from("Models")
      .insert(model)
      .select();
    if (error) {
      return {};
    }
    console.log("Model created: ", data);
    return {
      model: model,
      errorOrSuccessFlag: 1,
    };
  } catch (err) {
    console.log("Error creating model: ", err);
    return {
      model: model,
      errorOrSuccessFlag: 0,
    };
  }
}

// To identify the model (for generating the images)
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
    console.log("Model fetched: ", data);
    return data;
  } catch (err) {
    throw err;
  }
}

// To identify the model in replicate webhook
export async function getModelById(modelId) {
  try {
    const { data, error } = await supabase
      .from("Models")
      .select("*")
      .eq("model_id", modelId);

    if (error) {
      throw error;
    }
    console.log("Model fetched: ", data);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getUserModels(req, res) {
  const userId = req.header("userId");
  console.log("User ID: ", userId);
  try {
    const { data, error } = await supabase
      .from("Models")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      throw error;
    }
    return res.status(200).json(
      new ApiResponse(200, "User models", {
        models: data, // Array of user models
      })
    );
  } catch (err) {
    return res.status(500).json(
      new ApiResponse(500, "Error fetching user models", {
        error: err.message,
      })
    );
  }
}

export async function updateModel(modelId, status, modelVersion = null) {
  try {
    const { data, error } = await supabase
      .from("Models")
      .update({
        model_version: modelVersion,
        status: status,
      })
      .eq("model_id", modelId)
      .select();
    if (error) {
      throw error;
    }
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

/*IMAGES TABLE*/

export async function saveHeadshot(req, res) {
  const { userId, fileUrl } = req.body;
  try {
    const blob = await fetch(fileUrl).then((r) => r.blob());
    const supabaseUrl = process.env.SUPABASE_URL;
    const fileName = `ai-headshot-${Date.now()}.png`;

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
        image_url: imageUrl,
        user_id: userId,
        type: "headshot",
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

export async function saveImage(req, res) {
  const { userId, fileUrl } = req.body;
  try {
    const blob = await fetch(fileUrl).then((r) => r.blob());
    const supabaseUrl = process.env.SUPABASE_URL;
    const fileName = `ai-image-${Date.now()}.png`;

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
        image_url: imageUrl,
        user_id: userId,
        type: "custom",
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
  if (userId !== req.userId && !req.userId) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: "Unauthorized access",
      })
    );
  }
  try {
    /* Get images from database */
    const { data, error } = await supabase
      .from("Images")
      .select("image_url")
      .eq("user_id", userId)
      .eq("type", "custom");

    if (error) {
      throw error;
    }

    let imageUrls = [];
    data.forEach((image) => {
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

export async function getHeadshotImages(req, res) {
  const { userId } = req.body;
  if (userId !== req.userId && !req.userId) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: "Unauthorized access",
      })
    );
  }
  try {
    /* Get images from database */
    const { data, error } = await supabase
      .from("Images")
      .select("image_url")
      .eq("user_id", userId)
      .eq("type", "headshot");

    if (error) {
      throw error;
    }

    let imageUrls = [];
    data.forEach((image) => {
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

export async function deleteImage(req, res) {
  const { userId, imageUrl } = req.body;
  if (userId !== req.userId && !req.userId) {
    return res.status(401).json(
      new ApiResponse(401, "Unauthorized", {
        error: "Unauthorized access",
      })
    );
  }

  try {
    const { error: imageDBDelete } = await supabase
      .from("Images")
      .delete()
      .eq("image_url", imageUrl)
      .eq("user_id", userId);

    if (imageDBDelete) {
      throw new Error("Error deleting image from database");
    }

    const fileName = imageUrl.split("/").pop();

    const { error: imageBucketDelete } = await supabase.storage
      .from("images")
      .remove([fileName]);

    if (imageBucketDelete) {
      throw new Error("Error deleting image from bucket");
    }

    return res.status(200).json(
      new ApiResponse(200, "Image deleted successfully", {
        success: true,
      })
    );
  } catch (err) {
    return res.status(500).json(
      new ApiResponse(500, "Error deleting the image", {
        error: err.message,
      })
    );
  }
}

/*SUBSCRIPTION TABLE*/
// export async function checkCredits(req, res) {
//   const { email } = req.body;
//   try {
//     const { data, error } = await supabase
//       .from("Subscription")
//       .select("credits")
//       .eq("email", email);
//     if (error) {
//       throw error;
//     }
//     return res.status(200).json(
//       new ApiResponse(200, "User credits", {
//         credits: data[0].credits,
//       })
//     );
//   } catch (err) {
//     return res.status(500).json(
//       new ApiResponse(500, "Error fetching credits", {
//         error: err.message,
//       })
//     );
//   }
// }

export async function getUserSubscriptionDetails(req, res) {
  const { email } = req.body;
  try {
    const { data, error } = await supabase
      .from("Subscription")
      .select("*")
      .eq("email", email);
    if (error) {
      throw error;
    }
    // If user subscription details do not exist, create a new subscription
    if (data.length === 0) {
      const { data: newData, error: createError } = await supabase
        .from("Subscription")
        .insert([
          {
            email: email,
          },
        ]);
      if (createError) {
        throw createError;
      }
      return res.status(200).json(
        new ApiResponse(200, "User subscription details", {
          subscription: newData[0],
        })
      );
    }
    return res.status(200).json(
      new ApiResponse(200, "User subscription details", {
        subscription: data[0],
      })
    );
  } catch (err) {
    return res.status(500).json(
      new ApiResponse(500, "Error fetching subscription details", {
        error: err.message,
      })
    );
  }
}

export async function getCredits(userEmail) {
  try {
    const { data, error } = await supabase
      .from("Subscription")
      .select("credits", "model_credits")
      .eq("email", userEmail);
    console.log("Credits: ", data);
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw err;
  }
}

export async function updateCredits(userEmail, credits) {
  try {
    const { error } = await supabase
      .from("Subscription")
      .update({
        credits: credits,
      })
      .eq("email", userEmail);

    if (error) {
      throw error;
    }
  } catch (err) {
    throw err;
  }
}

export async function updateModelCredits(userEmail, modelCredits) {
  try {
    const { error } = await supabase
      .from("Subscription")
      .update({
        model_credits: modelCredits,
      })
      .eq("email", userEmail);

    if (error) {
      return 0;
    }
    return 1;
  } catch (err) {
    return 0;
  }
}
