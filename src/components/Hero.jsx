import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const roles = ["Web Developer", "Problem Solver", "AI Enthusiast"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
   const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
    }
  };

  useEffect(() => {
    let timer;
    
    const handleTyping = () => {
      if (isDeleting) {
        // Backspace effect
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(75);
      } else {
        // Typing effect
        setCurrentText(roles[currentRoleIndex].substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      // State transitions
      if (!isDeleting && currentText === roles[currentRoleIndex]) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <section 
      id='home' 
      className="w-full bg-white min-h-screen flex flex-col justify-center items-center px-6 text-center"
    >
      <div className="max-w-4xl mx-auto">
        {/* Greeting */}
        <h1 className="text-2xl md:text-3xl font-medium text-gray-500 mb-4">
          Hi, <span className='hi'>I</span>'m
        </h1>
        
        {/* Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          Md. Miskatul Masabi
        </h1>
        
        {/* Typewriter */}
        <div className="h-16 md:h-20 flex items-center justify-center">
          <p className="text-2xl md:text-3xl text-gray-600">
          <span className='hi'>I</span>'m a{' '}
            <span className="text-blue-600 font-semibold">
              {currentText}
              <span 
                className={`inline-block w-1 h-8 bg-blue-600 ml-1 ${isDeleting ? 'opacity-50' : 'animate-pulse'}`}
              />
            </span>
          </p>
        </div>

        {/* Call-to-Action Buttons (Optional) */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            onClick={()=>scrollToSection('contact')} 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Contact Me
          </Link>
          <button
            onClick={() => window.location.href = "mailto:your.email@example.com?subject=Collaboration%20Opportunity"}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Hire Me
          </button>
        </div>
      </div>
    </section>
  );
}