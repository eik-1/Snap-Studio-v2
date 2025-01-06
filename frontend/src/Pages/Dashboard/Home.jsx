import ModelTrainForm from "@/Components/ModelTrainForm"
import ImageGenerateSection from "@/Components/ImageGenerateSection";

function Home() {

    return (
        <div className="h-screen w-max flex justify-between gap-3 relative overflow-hidden">
            <div className="h-[90dvh] w-[30dvw] mt-[10dvh]">
                <ModelTrainForm  
                />
            </div>
            <main className="h-max w-max overflow-y-scroll">
               <ImageGenerateSection />
            </main>
        </div>
    )
}
export default Home
