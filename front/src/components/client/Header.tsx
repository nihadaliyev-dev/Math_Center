import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHaqqimizdaOpen, setIsHaqqimizdaOpen] = useState(false);
  const [isElmiFealiyyetOpen, setIsElmiFealiyyetOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "az");
  const [isScrolled, setIsScrolled] = useState(false);
  const [_, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownOpen = (dropdown: "haqqimizda" | "elmi") => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (dropdown === "haqqimizda") {
      setIsHaqqimizdaOpen(true);
      setActiveDropdown("haqqimizda");
    } else {
      setIsElmiFealiyyetOpen(true);
      setActiveDropdown("elmi");
    }
  };

  const handleDropdownClose = (dropdown: "haqqimizda" | "elmi") => {
    closeTimeoutRef.current = setTimeout(() => {
      if (dropdown === "haqqimizda") {
        setIsHaqqimizdaOpen(false);
        setActiveDropdown(null);
      } else {
        setIsElmiFealiyyetOpen(false);
        setActiveDropdown(null);
      }
    }, 100);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
        setIsHaqqimizdaOpen(false);
        setIsElmiFealiyyetOpen(false);
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setIsHaqqimizdaOpen(false);
    setIsElmiFealiyyetOpen(false);
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: "az", name: "Azərbaycan", flag: "🇦🇿" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
          : "bg-[#0D1F4F] shadow-md"
      }`}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={"/"} onClick={handleLinkClick} className="group">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative">
              <img
                src="/mathematics_research_lab_logo2.jpg"
                alt="Logo"
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-blue-400 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                  isScrolled ? "text-gray-600" : "text-blue-100"
                }`}
              >
                {t("Azərbaycan Dövlət Neft və Sənaye Universiteti")}
              </span>
              <span
                className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? "gradient-text-blue" : "text-white"
                }`}
              >
                Mathematics Research Center
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-8 text-sm font-medium relative">
            {/* Haqqımızda */}
            <div className="relative">
              <button
                onMouseEnter={() => handleDropdownOpen("haqqimizda")}
                onMouseLeave={() => handleDropdownClose("haqqimizda")}
                className={`flex items-center gap-1 cursor-pointer py-5 transition-all duration-300 group relative ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#0D1F4F]"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {t("haqqimizda")}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isHaqqimizdaOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-[#0D1F4F] group-hover:w-full transition-all duration-300" />
              </button>

              {isHaqqimizdaOpen && (
                <div
                  className="absolute top-full left-0 pt-2 -mt-1"
                  onMouseEnter={() => handleDropdownOpen("haqqimizda")}
                  onMouseLeave={() => handleDropdownClose("haqqimizda")}
                >
                  <div className="bg-white/95 backdrop-blur-xl text-[#0D1F4F] shadow-2xl rounded-2xl p-6 w-[550px] border border-gray-100 animate-scale-in">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        {[
                          {
                            to: "/haqqimizda/xos-gelmisiniz",
                            label: "xos_gelmisiniz",
                          },
                          {
                            to: "/haqqimizda/merkezin-missiyasi",
                            label: "merkezin_missiyasi",
                          },
                          {
                            to: "/haqqimizda/elmi-meslehet-surasi",
                            label: "Elmi Məsləhət şurası",
                          },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={handleLinkClick}
                            className={`block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-[#0D1F4F] transition-all duration-200 font-medium ${
                              isActivePath(item.to)
                                ? "bg-blue-50 text-[#0D1F4F]"
                                : ""
                            }`}
                          >
                            {t(`${item.label}`)}
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {[
                          { to: "/haqqimizda/emekdaslar", label: "Əməkdaşlar" },
                          {
                            to: "/haqqimizda/ziyaretciler",
                            label: "Ziyarətçilər",
                          },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={handleLinkClick}
                            className={`block px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-[#0D1F4F] transition-all duration-200 font-medium ${
                              isActivePath(item.to)
                                ? "bg-blue-50 text-[#0D1F4F]"
                                : ""
                            }`}
                          >
                            {t(`${item.label}`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Elmi Fəaliyyət */}
            <div className="relative">
              <button
                onMouseEnter={() => handleDropdownOpen("elmi")}
                onMouseLeave={() => handleDropdownClose("elmi")}
                className={`flex items-center gap-1 cursor-pointer py-5 transition-all duration-300 group relative ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#0D1F4F]"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {t("elmi_fealiyyet")}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isElmiFealiyyetOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-[#0D1F4F] group-hover:w-full transition-all duration-300" />
              </button>

              {isElmiFealiyyetOpen && (
                <div
                  className="absolute top-full left-0 pt-2 -mt-1"
                  onMouseEnter={() => handleDropdownOpen("elmi")}
                  onMouseLeave={() => handleDropdownClose("elmi")}
                >
                  <div className="bg-white/95 backdrop-blur-xl text-[#0D1F4F] shadow-2xl rounded-2xl p-6 w-[650px] border border-gray-100 animate-scale-in">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        {[
                          {
                            to: "/elmi-fealiyyet/tedbirler",
                            label: "Bütün Tədbirlər",
                            featured: true,
                          },
                          {
                            to: "/elmi-fealiyyet/seminarlar",
                            label: "Seminarlar",
                          },
                          {
                            to: "/elmi-fealiyyet/konfranslar",
                            label: "Konfranslar",
                          },
                          {
                            to: "/elmi-fealiyyet/yay-mektebi",
                            label: "Yay Məktəbi",
                            featured: true,
                          },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={handleLinkClick}
                            className={`block px-3 py-2.5 rounded-xl transition-all duration-200 ${
                              item.featured
                                ? "font-semibold text-[#0D1F4F] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 font-medium"
                            } ${
                              isActivePath(item.to)
                                ? "bg-blue-50 text-[#0D1F4F]"
                                : ""
                            }`}
                          >
                            {t(`${item.label}`)}
                          </Link>
                        ))}
                      </div>
                      <div className="space-y-1 col-span-2">
                        {[
                          {
                            to: "/elmi-fealiyyet/tedqiqat-qrupu",
                            label: "Tədqiqat Qrupu",
                          },
                          {
                            to: "/elmi-fealiyyet/tedqiqat-proqramlari",
                            label: "Tədqiqat Proqramları",
                          },
                          {
                            to: "/elmi-fealiyyet/tedqiqat-neticeleri",
                            label: "Tədqiqat Nəticələri",
                          },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={handleLinkClick}
                            className={`block px-3 py-2.5 rounded-xl font-semibold text-[#0D1F4F] hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                              isActivePath(item.to) ? "bg-blue-50" : ""
                            }`}
                          >
                            {t(`${item.label}`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/xeberler"
              onClick={handleLinkClick}
              className={`py-5 transition-all duration-300 group relative ${
                isScrolled
                  ? "text-gray-700 hover:text-[#0D1F4F]"
                  : "text-white hover:text-blue-200"
              } ${isActivePath("/xeberler") ? "font-bold" : ""}`}
            >
              {t("xeberler")}
              <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-[#0D1F4F] group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/elaqe"
              onClick={handleLinkClick}
              className={`py-5 transition-all duration-300 group relative ${
                isScrolled
                  ? "text-gray-700 hover:text-[#0D1F4F]"
                  : "text-white hover:text-blue-200"
              } ${isActivePath("/elaqe") ? "font-bold" : ""}`}
            >
              {t("elaqe")}
              <span className="absolute bottom-3 left-0 w-0 h-0.5 bg-[#0D1F4F] group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 border-2 ${
                isScrolled
                  ? "text-gray-700 border-gray-200 hover:border-[#0D1F4F] hover:bg-blue-50"
                  : "text-white border-white/30 hover:border-white/60 hover:bg-white/10"
              }`}
            >
              <Globe size={18} />
              <span className="text-sm font-semibold uppercase">
                {currentLanguage}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  isLanguageOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-xl py-2 w-48 border border-gray-100 animate-scale-in">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                      currentLanguage === lang.code
                        ? "bg-blue-50 text-[#0D1F4F] font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl px-6 py-4 shadow-inner border-t border-gray-100">
          <nav className="flex flex-col gap-2 text-gray-700 font-medium text-sm">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-[#0D1F4F] transition-all duration-200"
            >
              {t("ana_sehife")}
            </Link>

            {/* Mobile Dropdowns - Similar structure but simplified */}
            {/* Add mobile menu items here following the same pattern */}

            <div className="border-t border-gray-100 pt-3 mt-2">
              <div className="text-xs text-gray-500 mb-2 px-4">Language:</div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      currentLanguage === lang.code
                        ? "bg-blue-100 text-[#0D1F4F] font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
