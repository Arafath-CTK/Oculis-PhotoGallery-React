import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Carousel from "./Carousel";

const imageList = [
  "https://images.unsplash.com/photo-1738597452982-5759da74f68d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738762388661-f09b9b9b5df2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738249034650-6a789a081a04?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1735632629408-30233b7455c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// HomeBanner.jsx
const HomeBanner = () => {
  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    setBgImage(imageList[randomIndex]);
  }, []);

  return (
    <div
      className="relative w-full h-[600px] md:h-[500px] lg:h-[550px] flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Container */}
      <div className="z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-8 md:gap-12">
        {/* Text & Search */}
        <div className="flex flex-col gap-4 text-center md:text-left w-full md:w-1/2">
          <div className="relative text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Explore The Best Shots Of The Week
            </h1>
          </div>
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <FaSearch className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 text-white text-lg" />
            <input
              type="text"
              placeholder="Search for stunning photos..."
              className="w-full bg-white/5 text-white placeholder-gray-300 py-3 pl-12 pr-5 rounded-full backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
