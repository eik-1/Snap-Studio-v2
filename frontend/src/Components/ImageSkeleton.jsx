import { useImage } from "@/contexts/ImageContext";
function ImageSkeleton()
{
    const { state:imageState } = useImage();
    const {  numberOfImages, status}= imageState.generationStatus

    return (
        <>
            {status === "generating" && [...Array(numberOfImages)].map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg"></div>
                    
                </div>
            ))}
        </>
    );
}
export default ImageSkeleton;