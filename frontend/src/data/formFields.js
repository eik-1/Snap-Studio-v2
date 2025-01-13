const customImageTrainingField = [
    {
    
        name: "modelName",
        label: "Model Name",
        description: "Pick a name for your model",
        type: "text",
        
    },
    {
        name:"triggerWord",
        label: "Trigger Word",
        description:
            "Choose a trigger word for the model to generate images using the provided images. It should be a unique term that doesn't have any meaning in natural language.",
        type: "text",
    },
    {
        name:"gender",
        label:"Gender",
        description:" Choose your gender type",
        type:"text"
    },
    {
        name:"ethnicity",
        label:"Ethnicity",
        description:" Choose your Ethnicity",
        type:"text"

    },
    {
        name:"uploadImages",
        label: "Upload Images",
        description:
            "For the best results, upload at least 5 images of yourself from different angles and poses.",
    }
]
export {customImageTrainingField}