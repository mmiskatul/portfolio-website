import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

export default function Hero() {
   const roles = ["Web Developer", "Problem Solver", "AI Enthusiast"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    
    if (isDeleting) {
      // Backspace effect
      timer = setTimeout(() => {
        setCurrentText(currentText.substring(0, currentText.length - 1));
        setTypingSpeed(75); // Faster when deleting
      }, typingSpeed);
    } else {
      // Typing effect
      timer = setTimeout(() => {
        setCurrentText(roles[currentRoleIndex].substring(0, currentText.length + 1));
        setTypingSpeed(150); // Normal speed when typing
      }, typingSpeed);
    }

    // Switch between typing and deleting
    if (!isDeleting && currentText === roles[currentRoleIndex]) {
      // Pause at full text
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && currentText === '') {
      // Move to next role after deleting
      setIsDeleting(false);
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <section id='home' className=" w-full  bg-white  min-h-screen flex flex-col justify-center items-center px-6 text-center">
        <h1 className="hi text-4xl text-slate-600 font-extrabold  mb-8 "> Hey,I’m </h1>
      <h1 className="text-5xl font-extrabold  mb-6 ">
       <span className="text-gray-400">Md. Miskatul Masabi</span>
      </h1>
      <p className=" text-xl md:text-2xl max-w-3xl mb-10 leading-relaxed">
      <span className='hi text-2xl'>I</span> 'm a <span className='hi text-blue-400 font-bold'>{currentText}</span>
      <span className="animate-pulse">|</span> {/* Cursor effect */}
    </p>
     
    </section>
  );
}
