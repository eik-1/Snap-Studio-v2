import { useState } from "react"
import { motion } from "framer-motion"
import { Download, Bookmark, Trash2 } from "lucide-react"
import SaveImageButton from "./SaveImageButton"
import DeleteImageButton from "./DeleteImageButton"
import { downloadImageFromReplicate } from "@/services/utils/downloadImage"
const trs = {
    type: "spring",
    stiffness: 250,
    damping: 30,
}
function ImageThumbnail({ src, index, onClick, usedFor,imageDeleteState, setImageDeleteState }) {
    const [isHovering, setIsHovering] = useState(false)
    return (
        <motion.div
            layoutId={`container-${index}`}
            onClick={onClick}
            className="cursor-pointer overflow-hidden rounded-lg   relative"
            whileHover={{ scale: 1.03 }}
            transition={trs}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <motion.img
                src={src}
                alt={`Image ${index + 1}`}
                className=" object-cover aspect-square"
                layoutId={`image-${index}`}
                transition={trs}
            />
            {isHovering && (
                <div className=" absolute h-max w-max top-1 right-2 flex flex-col jusitfy-center items-center gap-1 ">
                    <button
                        className="block  text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 "
                        download={"image" + index + ".png"}
                        onClick={(e) => {
                            e.stopPropagation()

                            downloadImageFromReplicate(src)
                        }}
                    >
                        <Download color="white" size={12} />
                    </button>
                    {usedFor === "generatedImage" ? (
                        <SaveImageButton imageUrl={src} size="12" />
                    ) : (
                        <DeleteImageButton
                            imageUrl={src}
                            size="12"

                        />
                    )}
                </div>
            )}
        </motion.div>
    )
}
export default ImageThumbnail
