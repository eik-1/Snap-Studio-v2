import { Minus, Plus } from "lucide-react"

function NumberOfImages({ numberOfImages, setNumberOfImages }) {
    function increment() {
        if (numberOfImages < 4) {
            setNumberOfImages(numberOfImages + 1)
        }
    }

    function decrement() {
        if (numberOfImages > 1) {
            setNumberOfImages(numberOfImages - 1)
        }
    }
    return (
        <div className="w-24 h-10  p-1 flex-shrink-0 flex items-center justify-between  rounded-full bg-gray-100">
            <button
                type="button"
                onClick={decrement}
                className="w-7 h-7 flex items-center justify-center text-gray-500 disabled:text-gray-300 hover:bg-[rgba(0,0,0,0.1)] disabled:hover:bg-transparent rounded-full transition"
                disabled={numberOfImages <= 1}
            >
                <Minus size={12} />
            </button>

            <div className="text-sm font-medium text-gray-800">
                {numberOfImages}
            </div>

            <button
                type="button"
                onClick={increment}
                className="w-7 h-7 flex items-center justify-center text-gray-500 disabled:text-gray-300 hover:bg-[rgba(0,0,0,0.1)] disabled:hover:bg-transparent rounded-full transition"
                disabled={numberOfImages >= 4}
            >
                <Plus size={12} />
            </button>
        </div>
    )
}
export default NumberOfImages
