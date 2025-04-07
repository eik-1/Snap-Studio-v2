import OptionPanel from "@/Components/OptionsPanel";
import CustomImageForm from "@/Components/CustomImageForm";
import { useNavigation } from "@/contexts/NavigationContext";
import CustomImageModelTrainForm from "./CustomImageModelTrainForm";
import FashionModelForm from "./FashionModelForm";
import HeadshotForm from "./HeadshotForm";

function SidePanel({ children }) {
  const { state } = useNavigation();

  const modeComponents = {
    headshot: <HeadshotForm />,
    customImage: <CustomImageForm />,
    fashion: <FashionModelForm />,
    newCustomModelTrainForm: <CustomImageModelTrainForm />,

  };

  return (
    <div className="h-max sm:h-full relative bg-white  w-full flex z-10 top-0 border-r-[1px] overflow-y-auto">
      {modeComponents[state.tabs[state.tabs.length-1]] || <OptionPanel />}
    </div>
  );
}

export default SidePanel;
