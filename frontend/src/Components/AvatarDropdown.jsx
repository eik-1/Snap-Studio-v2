import React, { useEffect, useRef, useState } from "react"
import { PlusIcon, ChevronUp } from "lucide-react"


const AvatarDropdown = ({
    trainedModels = [],
    selectedModel,
    setSelectedModel,
    error,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleSelect = (modelName) => {
        setSelectedModel(modelName)
        setIsOpen(false)
    }

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () =>
            document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const isDisabled = trainedModels.length === 0

    return (
        <div className="relative z-40" ref={dropdownRef}>
            <div
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                className={`min-w-32 w-max h-10 max-w-1/2 text-xs px-3 py-2   text-black font-medium rounded-full cursor-pointer bg-gray-100 flex justify-between items-center gap-2 ${
                    isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[rgba(0,0,0,0.08)]"
                }`}
            >
                <div>
                    {selectedModel ||
                        (!trainedModels.length
                            ? "No trained models"
                            : "Select Avatar")}
                </div>
                <ChevronUp
                    className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </div>

            {/* Dropdown options (open upward) */}
            {isOpen && !isDisabled && (
                <div className="min-w-44 max-w-56 absolute bottom-full mb-2 p-1  bg-white border border-gray-200 rounded-xl drop-shadow-lg  h-max overflow-y-auto text-xs flex flex-col">
                    <div
                            key={"newModel"}
                            
                            className="h-max w-full border-b"
                        >
                            <div className="px-3 py-2 mb-1 flex items-center gap-2  hover:bg-gray-100 cursor-pointer text-gray-500 hover:text-black/90  rounded-lg">
                            
                             <div>
                            <PlusIcon className="h-4 w-4" />
                         
                          </div>
                          <div>
                           Create New Avatar
                          </div>
                            </div>
                         
                           
                        </div>
                        <div className="flex items-center gap-2 px-3 pt-2">
                            <span className="text-gray-400 text-[0.65rem]">Created Avatars</span>
                        </div>
                    {trainedModels.map((model, index) => (
                        <div
                            key={index}
                            onClick={() => handleSelect(model.model_name)}
                            className="px-3 py-2  rounded-lg  hover:bg-gray-100 cursor-pointer text-black/90"
                        >
                            {model.model_name}
                        </div>
                    ))}
                </div>
            )}

            {error?.modelSelect && (
                <p className="text-red-500 text-xs mt-1">{error.modelSelect}</p>
            )}
        </div>
    )
}
export default AvatarDropdown