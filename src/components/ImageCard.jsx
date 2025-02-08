import React from "react";

// ENSURING PREVENSION OF UNNECESSARY RE-RENDERS BY WRAPPING THE FUNCTION INSIDE "React.memo",
// WHICH MEMOIZISES THE FUNCTION AND RE-RENDER ONLY IF THE PROPS CHANGED.
const ImageCard = React.memo(function ImageCard({ image, onClick }) {
  return (
    <div
      className="relative group aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer"
      onClick={() => onClick(image)}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        loading="lazy"
        decoding="async"
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="font-semibold text-base md:text-lg pr-3 line-clamp-2">
          {image.alt_description || "Untitled"}
        </h3>
        <p className=" text-[.8rem] sm:text-sm opacity-90">
          by {image.user.name}
        </p>
      </div>
    </div>
  );
});

export default ImageCard;
