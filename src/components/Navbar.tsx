"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal, Cpu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Lab", href: "#lab" },
    { name: "Projects", href: "#projects" },
    { name: "Showcase", href: "#showcase" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary-bg/75 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-purple to-accent flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
              <Cpu className="w-5 h-5 text-primary-bg" />
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-white group-hover:text-accent transition-colors">
              M.MASABI
            </span>
            <span className="text-[10px] font-mono text-accent-purple px-1.5 py-0.5 rounded border border-accent-purple/30 bg-accent-purple/10">
              AI
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-accent font-medium text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-primary-bg font-semibold text-sm transition-all duration-300"
            >
              Book Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white p-2 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-primary-bg/95 border-b border-white/5 backdrop-blur-lg py-6 px-4 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-accent font-medium text-base py-2 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-primary-bg font-semibold text-sm transition-all duration-300"
            >
              Book Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
