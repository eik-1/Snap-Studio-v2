import { Camera, X } from "lucide-react"
import { useState, useEffect } from "react"

function FashionImageInputBox({
    selectedImage,
    setSelectedImage,
    id = "image-upload"
}) {
    const [isDragging, setIsDragging] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(null)

    useEffect(() => {
        // Create preview URL whenever image changes
        if (selectedImage) {
            const objectUrl = URL.createObjectURL(selectedImage)
            setPreviewUrl(objectUrl)
            
            // Free memory when this component unmounts
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreviewUrl(null)
        }
    }, [selectedImage])
    
    function handleDragOver(e) {
        e.preventDefault()
        setIsDragging(true)
    }
    
    function handleDragLeave(e) {
        e.preventDefault()
        setIsDragging(false)
    }
    
    function handleDrop(e) {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        if (file) {
            handleImageSelect(file)
        }
    }
    
    function handleFileChange(e) {
        const file = e.target.files[0]
        if (file) {
            handleImageSelect(file)
        }
    }
    
    function handleImageSelect(file) {
        // Only accept image files
        if (!file.type.startsWith('image/')) {
            alert("Please select an image file.")
            return
        }
        
        // Update the array for compatibility with parent component
        setSelectedImage(file)
    }
    
    function removeImage() {
        setSelectedImage(null)
    }

    if (selectedImage && previewUrl) {
        return (
            <div className="relative w-full">
                <div className="relative overflow-hidden rounded-md shadow-sm">
                    <img
                        src={previewUrl}
                        alt={`selected ${id}`}
                        className="w-full h-64 object-contain"
                    />
                    
                    {/* Subtle overlay that appears on hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <div className="absolute top-3 left-3 flex space-x-2">
                            {/* Remove button */}
                            <button
                                type="button"
                                onClick={removeImage}
                                className="bg-white/90 text-gray-700 p-2 rounded-md shadow-sm transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                                title="Remove image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            
                            {/* Change image button */}
                            <label
                                htmlFor={id}
                                className="bg-white/90 text-gray-700 p-2 rounded-md shadow-sm transition-colors duration-200 hover:bg-gray-50 cursor-pointer"
                                title="Change image"
                            >
                                <Camera className="w-4 h-4" />
                                <input
                                    type="file"
                                    id={id}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                
                {/* Simple filename display */}
                <div className="mt-2 px-1">
                    <p className="text-xs text-gray-500 truncate">
                        {selectedImage.name}
                    </p>
                </div>
            </div>
        )
    }
    
    // Minimal upload box
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className={`block transition-all duration-200 w-full h-40 border border-gray-200 ${
                    isDragging ? "border-gray-400 bg-gray-50" : ""
                } rounded-md cursor-pointer hover:bg-gray-50`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="h-full flex flex-col items-center justify-center p-4">
                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1">
                        Add an image
                    </p>
                    <p className="text-xs text-gray-400">
                        Drag and drop or click to browse
                    </p>
                    
                    <input
                        type="file"
                        id={id}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </label>
        </div>
    )
}


export default FashionImageInputBox