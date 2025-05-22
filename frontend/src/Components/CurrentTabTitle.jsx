import { useLocation } from "react-router-dom";

function CurrentTabTitle() {

    const location = useLocation();
    const path = location.pathname.split("/").pop();

    let title = "";
    switch (path) {
        case "headshot":
            title = "Generate Headshot";
            break;
        case "fashion":
            title = "AI Fashion Try-On";
            break;
        case "style":
            title = "Style Generation";
            break;
        case "custom-image":
            title = "Custom Image Generation";
            break;
        case "myimages":
            title = "Saved Images";
            break;
        default:
            title = "";
    }

    return (
        <>
         {path!=="app" && title && <h2 className="text-black/80 hidden md:block py-2 px-4 bg-white/80 backdrop-blur-md  rounded-full">{title}</h2>}
        </>
    )
}
export default CurrentTabTitle;