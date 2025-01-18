import { Image } from "lucide-react"
function ImageResultSection() {
    return (
        <>
            <section className="w-full h-full  p-4 bg-white flex flex-col items-center justify-center gap-2 drop-shadow-sm">
                <h2 className="text-lg font-semibold bg-clip-text text-transparent text-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-max">
                    Your Generated Images
                </h2>
                <div className="w-full h-full gap-4  p-2 bg-gray-50 rounded-lg  shadow-sm flex flex-col justify-center items-center">
                    <Image size={64} color="lightgray" />
                    <p className="text-center text-neutral-300 text-sm">
                        No Image is generated, Your Generated images will be
                        shown here.
                    </p>
                </div>
            </section>
        </>
    )
}
export default ImageResultSection
