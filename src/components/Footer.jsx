const Footer = () => {
  return (
    <footer className="w-full py-1 text-gray-800 bg-white text-center">
      <p className="text-sm md:text-base">
        &copy;{new Date().getFullYear()} Oculis Photo Gallery
      </p>
    </footer>
  );
};

export default Footer;
