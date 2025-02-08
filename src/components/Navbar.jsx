import { useState, useEffect, useRef } from "react";
import {
  FaRegHeart,
  FaRegUser,
  FaRegMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenu((state) => !state);
  };

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMobileMenu();
      }
    };

    if (mobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenu]);

  return (
    <nav className="bg-white shadow-md px-5 py-3 flex items-center justify-between relative">
      <div className="flex items-center px-7">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-8 w-auto transform scale-[2]"
        />
      </div>

      <div className="hidden md:flex items-center px-2 space-x-6">
        <FaRegHeart className="text-black-400 hover:text-black-900 cursor-pointer text-xl" />
        <FaRegMoon className="text-black-400 hover:text-black-900 cursor-pointer text-xl" />
        <FaRegUser className="text-black-400 hover:text-black-900 cursor-pointer text-xl" />
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-black-400 focus:outline-none"
        >
          {mobileMenu ? (
            <FaTimes className="text-l" />
          ) : (
            <FaBars className="text-l" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="absolute top-full right-4 bg-white rounded-md shadow-md md:hidden z-20"
          >
            <div className="flex flex-col space-y-2 py-4">
              <div className="flex items-center space-x-2 px-4  hover:cursor-pointer">
                <FaRegMoon className="text-black-400 text-l" />
                <span className="text-black-400 text-sm px-2">Dark Mode</span>
              </div>
              <div className="flex items-center space-x-2 px-4  hover:cursor-pointer">
                <FaRegHeart className="text-black-400 text-l" />
                <span className="text-black-400 text-sm px-2">Favourites</span>
              </div>
              <div className="flex items-center space-x-2 px-4  hover:cursor-pointer">
                <FaRegUser className="text-black-400 text-l" />
                <span className="text-black-400 text-sm px-2">Profile</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
