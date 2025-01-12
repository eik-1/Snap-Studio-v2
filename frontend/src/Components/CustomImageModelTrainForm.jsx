import { Upload } from "lucide-react"
import { Button } from "./UI/Button"
function CustomImageModelTrainForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
    } 
    const selectedFiles = []   /*These are just placeholders values defined to make sure that code won't break, actual functions and states to be implemented*/
    let isDragging 
    return (
        <div className="w-full h-full mx-auto  bg-white border-r-[1px] relative">
            <div className="h-[90%] max-w-sm m-0 px-4 py-4 overflow-y-scroll oveflow-x-hidden">
                <div className="font-sans flex flex-col gap-1 h-max pb-6 border-b-[1px] ">
                    <h1 className="font-sans font-medium tracking-tight text-lg text-purple-500">
                        Train Model
                    </h1>
                    <p className="text-xs font-regular tracking-tight text-gray-500">
                        Train a new model using your images. The model will be
                        used to generate images based on the provided images.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="flex flex-col h-max pb-2">
                        <label className="block text-xs font-medium text-gray-700">
                            Model Name
                        </label>
                        <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                            Pick a name for your model
                        </p>

                        <input
                            type="text"
                            required
                            className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Trigger Word
                        </label>
                        <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                            Choose a trigger word for the model to generate
                            images using the provided images. It should be a
                            unique term that doesn't have any meaning in natural
                            language.
                        </p>
                        <input
                            type="text"
                            className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                            Choose your gender type
                        </p>
                        <input
                            type="text"
                            className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Ethnicity
                        </label>
                        <p className="text-[0.575rem] font-regular tracking-tight text-gray-500">
                            Choose your Ethnicity
                        </p>
                        <input
                            type="text"
                            className="px-3 py-2 mt-2 block w-full border border-gray-700 rounded-md  focus:ring-slate-500 focus:border-slate-500 text-sm"
                        />
                    </div>
                    <div className="flex flex-col h-max pb-2 mt-3">
                        <p className="block text-sm font-medium text-gray-700">
                            Upload Images
                        </p>
                        <p className="text-[0.675rem] font-regular tracking-tight text-gray-500">
                            For the best results, upload at least 5 images of
                            yourself from different angles and poses.
                        </p>
                    </div>
                    <div
                        className={`w-full h-32 mx-auto border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                    >
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                            Drag your file(s) or{" "}
                            <label
                                htmlFor="images"
                                className="text-blue-500 cursor-pointer"
                            >
                                browse
                                <input
                                    type="file"
                                    id="images"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                />
                            </label>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2 py-2">
                            Selected images: {selectedFiles.length}
                        </p>
                        <div className="max-h-28 grid grid-cols-3 gap-2 ">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
            <div className="w-full h-[10%] flex justify-center items-center border-t-[1px]">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={selectedFiles.length === 0}
                    className="w-2/3 mx-auto"
                >
                    Train Model
                </Button>
            </div>
        </div>
    )
}
export default CustomImageModelTrainForm
