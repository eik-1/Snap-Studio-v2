import  { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const trs={
    type:"spring",
    stiffness: 250,
    damping: 30,
}
function ImageThumbnail({ src, index, onClick }) {
  return(
  <motion.div
    layoutId={`container-${index}`}
    onClick={onClick}
    className="cursor-pointer overflow-hidden rounded-lg bg-black/5"
    whileHover={{ scale: 1.03 }}
    transition={trs}
  >
    
    <motion.img
      src={src}
      alt={`Image ${index + 1}`}
      className="w-full h-48 object-cover"
      layoutId={`image-${index}`}
      transition={trs}
    />
  </motion.div>);
};

function ImageGrid({ images }){
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleKeydown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        handlePrev();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      case 'Escape':
        closeModal();
        break;
      default:
        break;
    }
  }, [handlePrev, handleNext, closeModal]);

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }
  }, [selectedIndex, handleKeydown]);

  return (
    <div className="p-2 sm:p-4 sm:pt-8">
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 ">
        {images.map((imageUrl, index) => (
          <>
          
          <ImageThumbnail
            key={index}
            src={imageUrl}
            index={index}
            onClick={() => setSelectedIndex(index)}
          />
          </>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={trs}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[90]"
            onClick={closeModal}
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                className="relative w-full sm:w-[32rem] md:h-[32rem]"
                onClick={e => e.stopPropagation()}
              >
               
                <div className="absolute inset-0 z-50">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  >
                    <X size={24} />
                  </button>

                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

               
                <motion.div
                  layoutId={`container-${selectedIndex}`}
                  className="h-full w-full aspect-square flex items-center justify-center"
                  transition={trs}
                >
                  <motion.img
                    layoutId={`image-${selectedIndex}`}
                    src={images[selectedIndex]}
                    alt={`Image ${selectedIndex + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                    transition={trs}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGrid;