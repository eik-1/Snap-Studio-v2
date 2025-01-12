
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
    <div className="h-full w-1/3 flex bg-gray-200 sm:w-[24rem] z-10 top-0 border-r-[1px] overflow-y-auto">
      {modeComponents[state.tabs[state.tabs.length-1]] || <OptionPanel />}
    </div>
  );
}

export default SidePanel;
