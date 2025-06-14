import { useState } from "react"
import FilterSelector from "@/Components/FilterSelector"
import SavedImages from "./SavedImages"
function MyImages() {
  const [activeService, setActiveService] = useState(1)
  const handleServiceChange = (serviceId) => {
    setActiveService(serviceId)
  
  }
  const services=[
    { id: 1, name: "All" },
    { id: 2, name: "Headshots" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Styles" },
    { id: 5, name: "Custom" }
  ]

    return (
        <div className="sm:w-full h-screen flex flex-col   relative overflow-hidden  ">
              <div className="absolute bottom-2    px-4 py-1 rounded-full  left-1/2 transform -translate-x-1/2 z-[120]   flex flex-col gap-4">
            <div className="flex items-center  gap-4 h-[3rem]">
               {services.map((service) => (
                <FilterSelector 
                  key={service.id} 
                  label={service.name} 
                  isActive={service.id === activeService} 
                  onClick={() => handleServiceChange(service.id)}
                />
              ))}
            </div>
            
          </div>
          <SavedImages /> 
        </div>
    )
}

export default MyImages
