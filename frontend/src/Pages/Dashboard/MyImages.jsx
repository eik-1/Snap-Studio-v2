import FilterSelector from "@/Components/FilterSelector"
import SavedImages from "./SavedImages"
function MyImages() {
  const services=[
    { id: 1, name: "All" },
    { id: 2, name: "Headshots" },
    { id: 3, name: "Fashion" },
    { id: 4, name: "Styles" },
    { id: 5, name: "Custom" }
  ]

    return (
        <div className="sm:w-full h-screen flex flex-col   relative overflow-hidden  ">
              <div className="absolute bottom-4 bg-white/85 border shadow-md backdrop-blur-md px-4 py-1 rounded-full  left-1/2 transform -translate-x-1/2 z-[120]   flex flex-col gap-4">
            <div className="flex items-center  gap-4 h-[3rem]">
               {services.map((service) => (
                <FilterSelector 
                  key={service.id} 
                  label={service.name} 
                  isActive={service.id === 1} 
                  onClick={() => {}}
                />
              ))}
            </div>
            
          </div>
          <SavedImages /> 
        </div>
    )
}

export default MyImages
