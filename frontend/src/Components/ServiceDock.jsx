import ServiceCard from "./ServiceCard"
import { services } from "@/data/serviceInfo"
function ServiceDock()
{
    return(
        <div className=" max-w-6xl w-full sm:w-max  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-center  bg-white/85 backdrop-blur-md shadow-serviceDock rounded-3xl p-6   gap-4 mx-auto border mt-20">
          {services.map((service) => (
            <ServiceCard
                key={service.id}
                image={service.images[0]}
                title={service.title}
                icon={service.icon}
                path={service.path}
                id={service.id}
                className={service.className}
            />
          ))}
        </div>
    )
}
export default ServiceDock