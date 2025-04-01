import { img1, img2, img3, img4, img5, img6, GoldenHour, CitySkyline, Black } from "@/assets/images/index"
import { FashionIcon, HeadshotIcon, ImageIcon } from "@/data/Icons"
import { PiDressBold, PiTShirtBold } from "react-icons/pi"

const services = [
    {
        serviceType: "headshot",
        name:"Headshots",
        title: "Generate HeadShots",
        description: "Transform your photos into studio-quality headshots.",
        images: [Black, CitySkyline],
        className:
            "bg-serviceone text-black/70 hover:shadow-lg hover:shadow-amber-100 ",
        icon: HeadshotIcon,
        route:"headshots"
    },
    {
        serviceType: "customImage",
        name:"Images",
        title: "Create Custom Images",
        description: "Create custom images of your choice with just a prompt",
        images: [img1, img2],
        className:
            "bg-servicetwo text-white/90 hover:shadow-lg hover:shadow-blue-200",
        icon: ImageIcon,
        route:"custom-images"
    },
    {
        serviceType: "fashionModel",
        name:"Fashion Model",
        title: "AI Fashion Try-On",
        description: "Try on clothes virtually with our AI model.",
        images: [img3, img4],
        className:
            "bg-servicethree text-white/90 hover:shadow-lg hover:shadow-rose-200",
        icon: PiTShirtBold,
    },
]
export { services }
