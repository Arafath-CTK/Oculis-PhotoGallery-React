import { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ImageModal = ({ image, onClose }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.classList.contains("modal-overlay")) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-50 modal-overlay bg-black/75 flex items-center justify-center p-4"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Modal Content: Clicking inside should not close the modal */}
          <motion.div
            className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dedicated Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-2 md:right-2 z-20 p-2 focus:outline-none"
            >
              &#x2715;
            </button>

            {/* Left Side: Image Section */}
            <div className="md:w-1/2 p-4 flex items-center justify-center relative">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse rounded-lg">
                  {/* Optionally, you can add a spinner icon or similar element here */}
                </div>
              )}

              <img
                src={image.urls.full}
                alt={image.alt_description}
                onLoad={() => setIsImageLoaded(true)}
                className={`max-w-full max-h-[80vh] object-contain rounded-lg transition-opacity duration-300 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Right Side: Details Section */}
            <div className="md:w-1/2 p-6 space-y-6 relative">
              {/* Title and Like Button */}
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold pr-16 line-clamp-2">
                  {image.alt_description || "Untitled"}
                </h2>
              </div>

              {/* Photographer Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Photographer</h3>
                <div className="flex items-center gap-2">
                  <img
                    src={image.user.profile_image.medium}
                    alt={image.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-lg">{image.user.name}</p>
                </div>
              </div>

              {/* Published Date */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Published</h3>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-6 h-6" />
                  <p>{new Date(image.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
