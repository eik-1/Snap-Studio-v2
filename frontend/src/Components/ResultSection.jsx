import { useImage } from "@/contexts/ImageContext";
import { Image } from "lucide-react";
import {motion} from "motion/react";
import { Player } from "@lottiefiles/react-lottie-player";
function ResultSection()
{
    const { state : imageState } = useImage();
    const { generatedImageUrls } = imageState;
    if (!generatedImageUrls || generatedImageUrls?.length === 0) {
        return (
            <div className="h-full w-full ">
                <div className="flex  items-center justify-center h-full w-full ">
                    <div className="flex flex-col items-center justify-center -translate-y-10">
                        <Image size={64} className="text-gray-200" />
                        <h2 className=" mt-4 font-medium text-gray-500">No images generated yet</h2>
                    </div>
                
                   
                  
                
                </div>

            </div>);
    }

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Generated Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedImageUrls?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Generated Image ${index + 1}`}
                        className="w-full h-auto rounded-lg shadow-md"
                    />
                ))}
            </div>
        </div>
    );
}
export default ResultSection;