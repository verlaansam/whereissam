import { useState } from "react";
import { Menu, X } from "lucide-react"; // Install Lucide icons: npm install lucide-react
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-950 fixed top-0 left-0 w-full z-10 shadow-md border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-gray-200 text-xl font-roboto-slab">
          Where Is Sam
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Items */}
        <ul
          className={`absolute md:static top-14 left-0 w-full md:w-auto bg-slate-950 md:flex md:space-x-6 md:items-center text-white transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/Blog" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
          </li>
          <li>
            <Link to="/Login" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

