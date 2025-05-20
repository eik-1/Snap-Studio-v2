import ServiceCard from "@/Components/ServiceCardOld"
import { services } from "@/data/serviceInfo"
import WelcomeText from "@/Components/WelcomeText"
import { useNavigation } from "@/contexts/NavigationContext"
import {useImage} from "@/contexts/ImageContext"
import { useNavigate } from "react-router-dom"

function OptionPanel() {
    const { dispatch:navDispatch } = useNavigation()
    const {dispatch:imageDispatch} = useImage()
    const navigate = useNavigate()

    const handleSelectOption = (option) => {

       // navDispatch({ type: "SET_TAB", payload: { tab: option } })
       // imageDispatch({type:"SET_MODE", payload:option})
        if (option === "customImage") {
            navigate("/app/custom-image")
        } else if (option === "fashion") {
            navigate("/app/fashion")
        } else if (option === "image") {
            navigate("/app/image")
        } else if (option === "video") {
            navigate("/app/video")
        } else if (option === "text") {
            navigate("/app/text")
        }
    }
    return (
        <section className="h-max  w-full p-4 bg-white  flex flex-col gap-4 items-center justify-center ">
            <div className="h-max w-full pb-3 border-b-[1px] border-neutral-100">
                <div className="h-max w-full  brounded-xl p-4  text-center flex flex-col gap-2">
                   

                    <p className=" text-[0.8rem] text-gray-700">
                        Select an Option to get started
                    </p>
                </div>
            </div>
            <div className="h-max w-full flex flex-col items-center gap-5 ">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        Icon={service.icon}
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
