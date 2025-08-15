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

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Section detection logic
      const scrollPosition = window.scrollY + 100;
      
      for (const section of NAV_ITEMS) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 bg-blue-100 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ' backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => scrollToSection("home")} 
            className="hi group text-2xl font-extrabold  text-purple-600 transition-colors duration-300"
          >
           <span className="text-3xl -mr-1. text-white bg-purple-600 rounded-full px-3 py-1">M</span>iskat
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map(({ name, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`px-1 py-2 text-sm font-semibold transition-colors ${
                      activeSection === id ? "text-gray-400 font-bold border-b-2 border-gray-400" : "text-black hover:text-gray-500"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white focus:outline-none transition-colors"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="px-2 pt-2 pb-4 space-y-1 bg-indigo-900/95 backdrop-blur-sm">
          {NAV_ITEMS.map(({ name, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                  activeSection === id ? "bg-indigo-800 text-white" : "text-indigo-200 hover:bg-indigo-800 hover:text-white"
                }`}
              >
                {name}
              </button>
            </li>
          ))}
          <li>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-3 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Hire Me
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}