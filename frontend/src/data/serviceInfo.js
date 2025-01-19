import { img1, img2, img3, img4, img5, img6 } from "@/assets/images/index"
import { HeadshotIcon, ImageIcon, FashionIcon} from "@/data/icons"
const services = [
    {
        serviceType: "headshot",
        title: "Generate HeadShots",
        description: "Transform your photos into studio-quality headshots.",
        images: [img5, img6],
        className: "bg-serviceone text-black/80 hover:shadow-lg hover:shadow-yellow-100 ",
        icon:HeadshotIcon
    },
    {
        serviceType: "customImage",
        title: "Create Your Custom Images",
        description:
            "Create custom images of your choice with just a prompt",
        images: [img1, img2],
        className:
            "bg-servicetwo text-white/90 hover:shadow-lg hover:shadow-blue-200",
            icon:ImageIcon
    },
    {
        serviceType: "fashionModel",
        title: "Create Your AI Fashion Model",
        description:
            "Create your own AI fashion model for your shopify store",
        images: [img3, img4],
        labelText: "Coming Soon",
        labelStyle: "text-rose-600",
        className:
            "bg-servicethree text-white/90 hover:shadow-lg hover:shadow-rose-200",
            icon:FashionIcon
    },
]
export { services }