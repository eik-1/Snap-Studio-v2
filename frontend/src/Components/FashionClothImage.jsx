import FashionImageInputBox from "./FashionImageInputBox"
import { GiClothes as ClothIcon } from "react-icons/gi";
function FashionClothImage({ clothesImages, setClothesImages }) {
    return (
        <div className="w-full h-1/2 bg-white/90 backdrop-blur-lg border rounded-2xl p-5 shadow-md flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <ClothIcon className="text-gray-800" size={20} />
                <h2 className="text-base font-medium text-gray-800">
                    Upload Clothes Image
                </h2>
            </div>
            

            <div className="overflow-y-auto flex-grow pr-1 -mr-1">
                <FashionImageInputBox
                    selectedImages={clothesImages}
                    setSelectedImages={setClothesImages}
                
                    id="clothes-images"
                />
            </div>
        </div>
    )
}
export default FashionClothImage
