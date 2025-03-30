import { Upload } from "lucide-react";
import { useState } from "react";

function ImageInputBox({ selectedImages, setSelectedImages, maxImages = 25, id='images' }) {
    const [isDragging, setIsDragging] = useState(false);

    function handleDragOver(e) {
        e.preventDefault();
        setIsDragging(true);
    }
    function handleDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }
    function handleDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        addImages(files);
    }
    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        addImages(files);
    }
    function addImages(files) {
        if (selectedImages.length + files.length > maxImages) {
            alert(`You can only upload up to ${maxImages} images.`);
            return;
        }
        setSelectedImages((prevFiles) => [...prevFiles, ...files]);
    }
    const removeFile = (index) => {
        setSelectedImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    return (
        <>
            <div
                className={`w-full h-32 mx-auto border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                    Drag your file(s) or {" "}
                    <label
                        htmlFor={id}
                        className="text-blue-500 cursor-pointer hover:underline hover:text-blue-600"
                    >
                        browse
                        <input
                            type="file"
                            id={id}
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                            className="hidden"
                            disabled={selectedImages.length >= maxImages}
                        />
                    </label>
                </p>
            </div>
            <div>
                <p className="text-sm text-gray-600 mb-2 py-2">
                    Selected images: {selectedImages.length} / {maxImages}
                </p>
                <div className="max-h-28 grid grid-cols-3 gap-2  ">
                    {selectedImages.map((file, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-28 object-contain rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute top-1 right-1 bg-rose-500 backdrop-blur-lg text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default ImageInputBox;