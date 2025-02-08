const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent xl:px-32 py-7 flex items-center justify-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-7 w-auto transform scale-[3.5]"
      />
    </nav>
  );
};

export default Navbar;
