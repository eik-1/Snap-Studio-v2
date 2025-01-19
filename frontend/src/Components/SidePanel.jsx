
import OptionPanel from "@/Components/OptionsPanel";
import ModelTrainForm from "@/Components/ModelTrainFormOld";
import CustomImageForm from "@/Components/CustomImageForm";
import { useNavigation } from "@/contexts/NavigationContext";
import CustomImageModelTrainForm from "./CustomImageModelTrainForm";

function SidePanel({ children }) {
  const { state } = useNavigation();

  const modeComponents = {
    headshot: <ModelTrainForm />,
    customImage: <CustomImageForm />,
    fashionModel: <ModelTrainForm />,
    newCustomModelTrainForm: <CustomImageModelTrainForm />,

  };

  return (
    <div className="h-max sm:h-full relative bg-white  w-full flex z-10 top-0 border-r-[1px] overflow-y-auto custom-scrollbar">
      {modeComponents[state.tabs[state.tabs.length-1]] || <OptionPanel />}
    </div>
  );
}

export default SidePanel;
