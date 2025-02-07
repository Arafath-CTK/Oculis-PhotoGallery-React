import React, { useState } from "react"; // Fixed React import
import { FaRegHeart } from "react-icons/fa";

const ImageCard = React.memo(function ImageCard({ image }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative group aspect-square rounded-lg overflow-hidden shadow-lg">
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/50 hover:bg-white transition-colors"
      >
        <FaRegHeart
          className={`w-6 h-6 ${
            isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"
          }`}
        />
      </button>

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold text-lg truncate">
          {image.alt_description || "Untitled"}
        </h3>
        <p className="text-sm opacity-90">by {image.user.name}</p>
      </div>
    </div>
  );
});

export default ImageCard;
