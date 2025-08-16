import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const scrollPosition = window.scrollY + 100;
      for (const section of NAV_ITEMS) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  // Professional email template
  const openEmail = () => {
    window.location.href = "mailto:your.email@example.com?subject=Collaboration%20Opportunity&body=Hello%20[Your%20Name],%0A%0AI%20came%20across%20your%20portfolio%20and%20am%20interested%20in%20discussing%20a%20potential%20collaboration.%20Let%27s%20connect!%0A%0ABest%20regards,%0A[Their%20Name]";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors"
            aria-label="Go to homepage"
          >
            <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full mr-2">
              M
            </span>
            iskat
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {NAV_ITEMS.map(({ name, id }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                  activeSection === id
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-indigo-500"
                }`}
              >
                {name}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
            <button
              onClick={openEmail}
              className="ml-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors active:scale-95 shadow-sm"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } ${isScrolled ? "bg-white/95" : "bg-white/90"} shadow-md`}
      >
        <ul className="px-2 pt-2 pb-4 space-y-1">
          {NAV_ITEMS.map(({ name, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  activeSection === id
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {name}
              </button>
            </li>
          ))}
          <li className="px-3 pt-2">
            <button
              onClick={openEmail}
              className="w-full px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md hover:bg-indigo-700 transition-colors active:scale-95 shadow-sm"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}