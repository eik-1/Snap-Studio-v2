import ServiceCard from "@/Components/ServiceCard"
import { img1, img2, img3, img4, img5, img6 } from "@/assets/images/index"
import WelcomeText from "@/Components/WelcomeText"
import { useNavigation } from "@/contexts/NavigationContext" 
const services = [
    {
        serviceType: "headshot",
        title: "Generate HeadShots",
        description: "Transform your photos into studio-quality headshots.",
        images: [img5, img6],
        className: "bg-serviceone hover:shadow-lg hover:shadow-amber-100 ",
    },
    {
        serviceType: "customImage",
        title: "Create Your Custom Images",
        description:
            "Create custom images of your choice with just a prompt",
        images: [img1, img2],
        className:
            "bg-servicetwo text-white hover:shadow-lg hover:shadow-violet-200",
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
            "bg-servicethree text-white hover:shadow-lg hover:shadow-rose-200",
    },
]


function OptionPanel() {
    
    const { state, dispatch } = useNavigation()

    const handleSelectOption = (option) => {
        dispatch({ type: "SET_TAB", payload: { tab: option } })
    }
    return (
        <section className="h-full w-full bg-white p-4 flex flex-col items-center gap-4">
            <div className="h-max w-full border-b-[1px] pb-6 text-center flex flex-col gap-2">
                <WelcomeText className="text-lg font-semibold bg-clip-text tracking-tight text-transparent bg-gradient-to-r from-violet-600  to-cyan-500  " />
                <p className=" text-[0.8rem] text-gray-500">
                    Select an Option to get started
                </p>
            </div>
            <div className="flex flex-col items-center gap-4 ">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        images={service.images}
                        handleClick={() =>
                            handleSelectOption(service.serviceType)
                        }
                        labelText={service?.labelText || null}
                        labelStyle={service?.labelStyle || null}
                        className={service.className}
                    />
                ))}
            </div>
        </section>
    )
}
export default OptionPanel
