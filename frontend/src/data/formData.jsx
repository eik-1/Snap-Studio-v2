import {
    Black,
    CityLights,
    CitySkyline,
    GoldenHour,
    Office,
    UrbanStreet,
    WhiteStudio,
    Yellow,
} from "@/assets/images/index"
import {
    Globe2 as Ethnicity,
    Users2 as Gender,
    Images as Image,
    Edit3 as ModelName,
    Zap as TriggerWord,
} from "lucide-react"
const size = 16
const customImageTrainingField = [
    {
        name: "modelName",
        label: "Model Name",
        description: "Pick a name for your model",
        type: "text",
        Icon: <ModelName size={size} />,
    },
    {
        name: "triggerWord",
        label: "Trigger Word",
        description:
            "Choose a trigger word for the model to generate images using the provided images. It should be a unique term that doesn't have any meaning in natural language.",
        type: "text",
        Icon: <TriggerWord size={size} />,
    },
    {
        name: "gender",
        label: "Gender",
        description: " Choose your gender type",
        type: "text",
        Icon: <Gender size={size} />,
    },
    {
        name: "ethnicity",
        label: "Ethnicity",
        description: " Choose your Ethnicity",
        type: "text",
        Icon: <Ethnicity size={size} />,
    },
    {
        name: "uploadImages",
        label: "Upload Images",
        description:
            "For the best results, upload at least 5 images of yourself from different angles and poses.",
        Icon: <Image size={size} />,
    },
]
const headshotStyles = [
    {
        id: "black",
        label: "Midnight Studio",
        image: Black,
    },
    {
        id: "grey",
        label: "Classic Studio",
        image: WhiteStudio,
    },
    {
        id: "yellow",
        label: "Sunburst Yellow",
        image: Yellow,
    },
    {
        id: "citySkyline",
        label: "Skyline Executive",
        image: CitySkyline,
    },
    {
        id: "office",
        label: "Corporate Office",
        image: Office,
    },
    {
        id: "goldenHour",
        label: "Golden Hour",
        image: GoldenHour,
    },
    {
        id: "cityLights",
        label: "City Lights",
        image: CityLights,
    },
    {
        id: "urbanSidewalk",
        label: "Urban Sidewalk",
        image: UrbanStreet,
    },
]

export { customImageTrainingField, headshotStyles }
