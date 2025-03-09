import ServiceCard from "@/Components/ServiceCard"
import { services } from "@/data/serviceInfo"
import WelcomeText from "@/Components/WelcomeText"
import { useNavigation } from "@/contexts/NavigationContext"
import {useImage} from "@/contexts/ImageContext"

function OptionPanel() {
    const { dispatch:navDispatch } = useNavigation()
    const {dispatch:imageDispatch} = useImage()

    const handleSelectOption = (option) => {
        navDispatch({ type: "SET_TAB", payload: { tab: option } })
        imageDispatch({type:"SET_MODE", payload:option})
    }
    return (
        <section className="h-max  w-full p-4 bg-white  flex flex-col gap-4 items-center justify-center ">
            <div className="h-max w-full pb-3 border-b-[1px] border-neutral-100">
                <div className="h-max w-full  brounded-xl p-4  text-center flex flex-col gap-2">
                    <WelcomeText className="text-xl font-semibold bg-clip-text tracking-tight text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500" />

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
