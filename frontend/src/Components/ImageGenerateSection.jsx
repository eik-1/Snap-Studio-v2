/* important this is an old component and is not in use*/


import PromptForm from "./PromptForm"
import ImageGrid from "./ImagesOld"

function ImageGenerateSection() {
    /* const [generationStatus, setGenerationStatus] = useState({
        status: "generated",
        message: "",
    })
    const [generatedImageUrls, setGeneratedImageUrls] = useState(["https://replicate.delivery/yhqm/H7fviwusK2xiWisJwHNovMJSQrKbOVg1Uu3u1WueNiP1ADsTA/out-1.png", "https://replicate.delivery/yhqm/8PTVfzqW6BStdqSJfzubhGCxm9jHW5GBJ3M9YcKsq7J1ADsTA/out-0.png"])*/

    return (
        <section className="h-max sm:h-[85dvh] w-[67dvw] mt-[12dvh] p-2 flex flex-col sm:flex-row justify-between gap-4  bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
            <PromptForm />
            <ImageGrid />
        </section>
    )
}
export default ImageGenerateSection
