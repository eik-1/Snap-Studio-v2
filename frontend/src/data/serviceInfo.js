import { img1, img2, img3, img4, img5, img6, GoldenHour, CitySkyline, Black } from "@/assets/images/index"
import { FashionIcon, HeadshotIcon, ImageIcon } from "@/data/Icons"

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
        title: "Create AI Fashion Model",
        description: "Create your own AI fashion model for your shopify store",
        images: [img3, img4],
        labelText: "Coming Soon",
        labelStyle: "text-rose-600",
        className:
            "bg-servicethree text-white/90 hover:shadow-lg hover:shadow-rose-200",
        icon: FashionIcon,
    },
]
export { services }
