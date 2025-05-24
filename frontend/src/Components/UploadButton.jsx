import { useRef, useState, useEffect } from 'react';
import { UploadCloud, Check, X } from 'lucide-react';

export default function ImageUploadButton({image, setImage, text="upload image", icon=<UploadCloud />, id="image-upload" }) {
  const fileInputRef = useRef(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setIsUploaded(true);
  };
  

  const handleClick = () => {
    if (isUploaded) {
      setShowModal(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    setIsUploaded(false);
    setShowModal(false);
    fileInputRef.current.value = '';
  };

  const closeModal = () => {
    setShowModal(false);
  };
 useEffect(() => {
       
        if (image) {
            const objectUrl = URL.createObjectURL(image)
            setPreviewUrl(objectUrl)
            setIsUploaded(true)
            
    
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreviewUrl(null)
        }
    }, [image])
  return (
    <>
    <div className='w-max h-max relative '>

   
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        id={id}
      />
      <button 
        className="bg-white/90 border backdrop-blur-lg text-xs rounded-3xl px-4 py-2 shadow-sm hover:bg-white transition-all duration-200 hover:shadow-lg flex items-center justify-center md:hidden gap-1"
        onClick={handleClick}
        aria-label={isUploaded ? "View Uploaded Image" : "Upload Image"}
      >
        {isUploaded ? <Check className="w-4 h-4 text-green-600" /> : icon}
        <div className="text-xs text-gray-600">
          {isUploaded ? "Image uploaded" : text}
        </div>
      </button>

      {/* Modal */}
    {showModal && (
        <div className="absolute bottom-12 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="p-1 hover:bg-gray-100 right-2 top-2 absolute rounded-full transition-colors"
              aria-label="Close Modal"
            >
              <X className="bg-gray-50 w-5 h-5 p-1 rounded-full text-gray-500" />
            </button>

            {/* Modal Content */}
            <div className="p-4 mt-6">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg shadow-sm max-h-64 object-contain"
                />
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 p-4 border-t bg-gray-50">
              <button
                onClick={handleRemoveImage}
                className="w-full text-xs rounded-full border border-red-400 text-red-400 px-2 py-2  transition-colors"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      )}
       </div>
    </>
  );
}