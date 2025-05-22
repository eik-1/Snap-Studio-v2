import FashionSidebar from "@/Components/FashionSidebar"
import { useState } from "react"

import ContentPanel from "@/Components/ContentPanel"
import FashionActionDock from "@/Components/FashionActionDock"

function FashionTryOnPage() {
    const [clothesImages, setClothesImages] = useState(null)
    const [modelImages, setModelImages] = useState(null)

    return (
        <div className="w-[calc(100%-4rem)] h-full ml-16   pt-12 flex">
            <section className="h-full w-1/4 max-w-xl py-4">
                <FashionSidebar
                    clothesImages={clothesImages}
                    setClothesImages={setClothesImages}
                    modelImages={modelImages}
                    setModelImages={setModelImages}
                />
            </section>
            <section className="h-full w-3/4 relative pt-4 ">
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center` ">
                    <ContentPanel></ContentPanel>
                </div>

                <FashionActionDock
                    clothesImages={clothesImages}
                    modelImages={modelImages}
                />
            </section>
        </div>
    )
}
export default FashionTryOnPage
