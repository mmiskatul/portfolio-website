import React from "react";
import { FaReact, FaNodeJs, FaDatabase, FaJava, FaPython, FaCuttlefish } from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiJavascript, SiHtml5, SiCss3, SiMongodb } from "react-icons/si";
import { TbBrandTypescript } from "react-icons/tb";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React.js", icon: <FaReact className="text-blue-500" size={24} />, link: "https://reactjs.org/" },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" size={24} />, link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
        { name: "TypeScript", icon: <TbBrandTypescript className="text-blue-600" size={24} />, link: "https://www.typescriptlang.org/" },
        { name: "HTML5", icon: <SiHtml5 className="text-orange-500" size={24} />, link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { name: "CSS3", icon: <SiCss3 className="text-blue-400" size={24} />, link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" size={24} />, link: "https://tailwindcss.com/" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" size={24} />, link: "https://nodejs.org/" },
        { name: "Express.js", icon: <SiExpress className="text-gray-800" size={24} />, link: "https://expressjs.com/" },
        { name: "MongoDB", icon: <SiMongodb className="text-green-500" size={24} />, link: "https://www.mongodb.com/" },
        { name: "Java", icon: <FaJava className="text-red-500" size={24} />, link: "https://www.oracle.com/java/" },
        { name: "Python", icon: <FaPython className="text-blue-400" size={24} />, link: "https://www.python.org/" },
      ]
    },
    {
      title: "Other",
      skills: [
        { name: "C Programming", icon: <FaCuttlefish className="text-blue-600" size={24} />, link: "https://en.cppreference.com/w/c" },
        { name: "Data Structures", icon: <FaDatabase className="text-indigo-500" size={24} />, link: "https://www.geeksforgeeks.org/data-structures/" },
        { name: "Algorithms", icon: <FaDatabase className="text-purple-500" size={24} />, link: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/" },
      ]
    }
  ];

  return (
    <section id="skills" className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My <span className="text-indigo-600">Skills</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technologies and tools I work with to build amazing applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.skills.map((skill, i) => (
                  <a
                    key={i}
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white hover:border hover:border-indigo-100"
                  >
                    <div className="text-4xl mb-3 group-hover:-translate-y-1 transition-transform">
                      {skill.icon}
                    </div>
                    <span className="text-lg font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                      {skill.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}