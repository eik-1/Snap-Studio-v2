import {
    Black,
    CityLights,
    CitySkyline,
    GoldenHour,
    Office,
    UrbanStreet,
    WhiteStudio,
    Yellow,
} from "@/assets/image"
import {
    Globe2 as Ethnicity,
    Users2 as Gender,
    Images as Image,
    Edit3 as ModelName,
    Zap as TriggerWord,
} from "lucide-react"

const size = 16

/* TRAINING FORM */
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
        type: "select",
        options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
        ],
        Icon: <Gender size={size} />,
    },
    {
        name: "uploadImages",
        label: "Upload Images",
        description:
            "For the best results, upload at least 7-8 images of yourself from different angles and poses.",
        Icon: <Image size={size} />,
    },
]

/* HEADSHOT STYLES */
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
const ImageStyles= [
    {
        id:"ghibli",
        label:"Ghibli",
        image:"https://picsum.photos/id/25/400/400"

    },
    {
        id:"anime",
        label:"Anime",
        image:"https://picsum.photos/id/24/400/400"
    },
    {
        id:"simpsons",
        label:"Simpsons",
        image:"https://picsum.photos/id/26/400/400"
       
    },
    {
        id:"southpark",
        label:"South Park",
        image:"https://picsum.photos/id/27/400/400"
    },
    {
        id:"rickandmorty",
        label:"Rick and Morty",
        image:"https://picsum.photos/id/28/400/400"
    },
    {
        id:"manga",
        label:"Manga",
        image:"https://picsum.photos/id/29/400/400"
    },  
    {
        id:"pixar",
        label:"Pixar",
        image:"https://picsum.photos/id/30/400/400"
    },
    {
        id:"samurai",
        label:"Samurai",
        image:"https://picsum.photos/id/31/400/400"
    },
    {
        id:"Knight",
        label:"Knight",
        image:"https://picsum.photos/id/32/400/400"
    },
    {
        id:"genderswap",
        label:"Gender Swap",
        image:"https://picsum.photos/id/33/400/400"
    }

]

export { customImageTrainingField, headshotStyles, ImageStyles }
