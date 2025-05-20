import React from 'react';

import FashionModelImage from './FashionModelImage';
import FashionClothImage from './FashionClothImage';

function FashionSidebar({
  clothesImages,
  setClothesImages,
  modelImages,
  setModelImages
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <FashionModelImage
        modelImages={modelImages}
        setModelImages={setModelImages}
      />
      <FashionClothImage
        clothesImages={clothesImages}
        setClothesImages={setClothesImages}
      />
    </div>
  );
}

export default FashionSidebar;