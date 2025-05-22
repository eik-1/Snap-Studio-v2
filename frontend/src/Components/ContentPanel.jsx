import TabSwitcher from "./TabSwitcher"
import { ImageIcon, BookmarkIcon, SearchIcon } from "lucide-react";
import ResultSection from "./ResultSection";
import { useState } from "react";
function ContentPanel()
{
    const tabs=[
        { label: "Results", icon: <ImageIcon size={16} />,
            content: <ResultSection />
        },
       {
        label: "Saved",
        icon: <BookmarkIcon size={16} />,
        content: <div className="h-full w-full flex flex-col items-center justify-center ">
            <h2 className="text-lg font-semibold">No Saved Images</h2> </div>          
       },
        {
            label: "Explore",
            icon: <SearchIcon size={16} />,
            content: <div className="h-full w-full flex flex-col items-center justify-center ">
                <h2 className="text-lg font-semibold">No Search Results</h2> </div>
        }
    ]
    const [activeTab, setActiveTab] = useState(0);

    return(<section className="w-full min-h-full flex flex-col items-center justify-center relative ">
        <div className="w-full h-max flex justify-center items-center ">
            <TabSwitcher
                tabs={tabs}
                defaultActiveTab={0}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
        <div className="w-full grow  flex flex-col items-center justify-center ">
            {tabs[activeTab].content}
        </div>

    </section>)
}
export default ContentPanel;