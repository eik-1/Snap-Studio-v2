import FashionModelImage from './FashionModelImage';
import FashionClothImage from './FashionClothImage';

function FashionSidebar({
  dressImage,
  setDressImage,
  modelImage,
  setModelImage
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <FashionModelImage
        modelImage={modelImage}
        setModelImage={setModelImage}
      />
      <FashionClothImage
        dressImage={dressImage}
        setDressImage={setDressImage}
      />
    </div>
  );
}

export default FashionSidebar;