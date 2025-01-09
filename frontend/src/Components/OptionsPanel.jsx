import ServiceCard from "@/Components/ServiceCard"
import {img1, img2, img3, img4,img5, img6} from "@/assets/images/index"
import WelcomeText from "./WelcomeText"
const OptionPanel = () => {
    return (
        <section className="h-full w-full bg-white p-4 flex flex-col items-center gap-4">
            <div className="h-max w-full border-b-[1px] pb-6 text-center flex flex-col gap-2">
                <WelcomeText className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600  to-cyan-500  "/>
                <p className=" text-[0.8rem] text-gray-500">Select an Option to get started</p>
            </div>
                <div className="flex flex-col items-center gap-4 ">
            <ServiceCard 
                title="Generate HeadShots"
                description="Transform your photos into studio-quality headshots."
                images={[img5, img6]}
                className="bg-serviceone hover:shadow-lg hover:shadow-amber-100 "
            />
             <ServiceCard 
                title="Create Your Custom Images"
                description="Create custom images of your choice with just a prompt"
                images={[img1, img2]}
                className="bg-servicetwo text-white hover:shadow-lg hover:shadow-violet-200"
            />
             <ServiceCard 
                title="Create Your AI Fashion Model"
                description="Create your own AI fashion model for your shopify store"
                images={[img3, img4]}
                className="bg-servicethree text-white hover:shadow-lg hover:shadow-rose-200"
                lablelText={"Coming Soon"}
                labelStyle="text-rose-600"
            />
           
        </div>
        </section>
        
    )
}
export default OptionPanel
