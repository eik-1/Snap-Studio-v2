import HeadShotSidebar from "@/Components/HeadshotSidebar";
import HeadshotActionDock from "@/Components/HeadshotActionDock";
import { useState } from "react";   

import ContentPanel from "@/Components/ContentPanel";



function HeadshotServicePage() {
    const [selectedStyle, setSelectedStyle] = useState(null);

   
  return (
    <div className="w-[calc(100%-4rem)] h-full ml-16   pt-12 flex">
        <section className="h-full w-1/3 max-w-xl py-4 ">
              
                     <HeadShotSidebar selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
        </section>
        <section className="h-full w-2/3 relative pt-4 ">
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center` ">
              <ContentPanel></ContentPanel>
            </div>

          <HeadshotActionDock 
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
          />

        </section>

    </div>
  );
}
export default HeadshotServicePage;