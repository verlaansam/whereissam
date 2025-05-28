import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLang = (lng) => i18n.changeLanguage(lng);
  const currentLang = i18n.language;

  const languages = [
    { code: "en", flag: "🇬🇧", label: "English" },
    { code: "nl", flag: "🇳🇱", label: "Nederlands" },
  ];

  return (
    <nav className="bg-slate-950 fixed top-0 left-0 w-full z-10 shadow-md border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-gray-200 text-xl font-roboto-slab">
          {t("Title")}
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          aria-label="Toggle menu"
          className="block md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu */}
        <ul
          className={`absolute md:static top-14 left-0 w-full md:w-auto bg-slate-950 md:flex md:space-x-6 md:items-center text-white transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              {t("Home")}
            </Link>
          </li>
          <li>
            <Link to="/Blog" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              {t("Blog")}
            </Link>
          </li>
          <li>
            <Link to="/Login" className="block p-3 md:p-0 hover:underline" onClick={() => setIsOpen(false)}>
              {t("Login")}
            </Link>
          </li>
          <li>
            <div className="flex space-x-2 p-3 md:p-0">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLang(lang.code)}
                  className={`transition-transform duration-200 hover:scale-110 ${
                    currentLang === lang.code ? "text-3xl" : "text-xl"
                  }`}
                  aria-label={lang.label}
                >
                  {lang.flag}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


