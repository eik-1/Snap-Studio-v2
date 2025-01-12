import { useImage } from "@/contexts/ImageContext";
import OptionPanel from "@/Components/OptionsPanel";
import ModelTrainForm from "@/Components/ModelTrainFormOld";

function SidePanel({ children }) {
  const { state } = useImage();

  const modeComponents = {
    headshot: <ModelTrainForm />,
    customImage: <ModelTrainForm />,
    fashionModel: <ModelTrainForm />,
  };

  return (
    <div className="h-full w-1/3 flex bg-gray-200 sm:w-[24rem] z-10 top-0 border-r-[1px] overflow-y-auto">
      {modeComponents[state.mode] || <OptionPanel />}
    </div>
  );
}

export default SidePanel;
