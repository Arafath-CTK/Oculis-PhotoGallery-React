import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1738739905613-590d01442686?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738396845029-d2289026ec2b?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738168251394-9241984c8292?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1734974981781-c4a077289b05?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1738529550483-c08d27b6b839?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Carousel.jsx
const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleImages = () => {
    const imagesToShow = [];
    for (let i = 0; i < 3; i++) {
      imagesToShow.push(images[(index + i) % images.length]);
    }
    return imagesToShow;
  };

  return (
    <div className="relative w-[260px] md:w-[320px] lg:w-[350px] h-[320px] md:h-[380px] lg:h-[420px]">
      <AnimatePresence initial={false}>
        {getVisibleImages().map((img, i) => (
          <motion.div
            key={img}
            className="absolute w-full h-full origin-center"
            initial={{
              opacity: 0,
              scale: 0.95,
              left: `${i * 30}px`,
              filter: "blur(4px)",
              zIndex: 3 - i,
            }}
            animate={{
              opacity: i === 0 ? 1 : 0.9,
              scale: 1 - i * 0.03,
              left: `${i * 30}px`,
              filter: i === 0 ? "blur(0px)" : `blur(${i}px)`,
              zIndex: 3 - i,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              left: "-100%",
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.32, 0.72, 0, 1],
              ...(i === 0 && { delay: 0.1 }),
            }}
          >
            <div
              className="relative w-full h-full rounded-xl shadow-2xl overflow-hidden 
              transform transition-all duration-300 ease-out"
            >
              {" "}
              <img
                src={img}
                alt="Carousel"
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Carousel;
