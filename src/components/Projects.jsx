import { useState } from 'react';

export default function Projects() {
  const projects = [
    {
      title: "DIU PageCrafter",
      description: "A full-stack web application built with React, Node.js, and MongoDB that allows users to create custom pages and manage content dynamically.",
      liveLink: "https://diu-pagecrafter.onrender.com/",
      gitLink: "https://github.com/mmiskatul/project-cover-page.git",
      languages: ["React", "Node.js", "Express.js", "MongoDB"],
      category: "Full Stack"
    },
    {
      title: "Real Estate Web",
      description: "A responsive real estate web application built with React and Tailwind CSS, featuring property listings and interactive UI.",
      liveLink: "https://real-estatte.netlify.app/",
      gitLink: "https://github.com/mmiskatul/REAL-STATE-WEB.git",
      languages: ["React", "Tailwind CSS"],
      category: "Frontend"
    },
    {
      title: "Attendance Management System with QR Code Integration",
      description: "A Java-based attendance management system that uses JDBC and MySQL for backend, and integrates QR code scanning for easy check-in and check-out.",
      liveLink: null,
      gitLink: "https://github.com/mmiskatul/Attendance-Management-System-with-QR-Code-Integration.git",
      languages: ["Java", "JDBC", "MySQL"],
      category: "Backend"
    },
    {
      title: "Career Hub",
      description: "A modern career-focused web application built with React and Tailwind CSS, featuring job listings, interactive UI, and responsive design.",
      liveLink: "https://carrier-hub-project.netlify.app/",
      gitLink: "https://github.com/mmiskatul/Career-Hub.git",
      languages: ["React", "Tailwind CSS"],
      category: "Frontend"
    },
    {
      title: "Recipe Calories",
      description: "A responsive web app that calculates calorie content of recipes, built with HTML, CSS, Tailwind CSS, and JavaScript.",
      liveLink: "https://calorie-calculatorr.netlify.app/",
      gitLink: "https://github.com/mmiskatul/Recipe-Calories.git",
      languages: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
      category: "Frontend"
    },
    {
      title: "Business Landing Page",
      description: "A modern business landing page built with React and Tailwind CSS, featuring responsive design and smooth animations.",
      liveLink: "https://business-landing-pa.netlify.app/",
      gitLink: "https://github.com/mmiskatul/React-Landing-Page.git",
      languages: ["React", "Tailwind CSS"],
      category: "Frontend"
    },
    {
      title: "0-1 Knapsack Problem Solver",
      description: "A web-based solver for the 0-1 Knapsack Problem built with HTML, CSS, and JavaScript.",
      liveLink: "https://knapsack-problem-solver.netlify.app/",
      gitLink: "https://github.com/mmiskatul/0-1-knapsack-problem-solver.git",
      languages: ["HTML", "CSS", "JavaScript"],
      category: "Frontend"
    },
    {
      title: "Inventory Management System",
      description: "A Java-based inventory management system using JDBC and MySQL to track products and manage stock.",
      liveLink: null,
      gitLink: "https://github.com/mmiskatul/Inventory-Mangement-System.git",
      languages: ["Java", "JDBC", "MySQL"],
      category: "Backend"
    },
    {
      title: "Student Management System",
      description: "A Java-based console application utilizing JDBC and MySQL to manage student records.",
      liveLink: null,
      gitLink: "https://github.com/mmiskatul/Student-Mangement-System.git",
      languages: ["Java", "JDBC", "MySQL"],
      category: "Backend"
    },
    {
      title: "Alphabet Game",
      description: "An interactive web-based alphabet learning game with engaging visuals and responsive design.",
      liveLink: "https://aphabate-game-web.netlify.app/",
      gitLink: "https://github.com/mmiskatul/alphabet-Games.git",
      languages: ["HTML", "CSS", "JavaScript"],
      category: "Frontend"
    },
    {
      title: "Credit Card UI",
      description: "A stylish credit card user interface built with HTML and CSS, showcasing responsive design.",
      liveLink: "https://creditcarduiproject.netlify.app/",
      gitLink: "https://github.com/mmiskatul/Credit-card-programm-html-and-css.git",
      languages: ["HTML", "CSS"],
      category: "Frontend"
    },
    {
      title: "Alarm Clock",
      description: "A Python-based alarm clock application that allows users to set alarms and play notification sounds.",
      liveLink: null,
      gitLink: "https://github.com/mmiskatul/Alarm-Clock.git",
      languages: ["Python"],
      category: "Other"
    },
    {
      title: "Profile Card UI",
      description: "A modern and responsive profile card user interface built with HTML, CSS, and JavaScript.",
      liveLink: "https://miskatulmasabiui.netlify.app/",
      gitLink: "https://github.com/mmiskatul/Profile-Card.git",
      languages: ["HTML", "CSS"],
      category: "Frontend"
    },
    {
      title: "Periodic Table",
      description: "A C program that displays and manages the periodic table of elements.",
      liveLink: null,
      gitLink: "https://github.com/mmiskatul/periodic-Table.git",
      languages: ["C"],
      category: "Other"
    },
    {
      title: "Restaurant Billing System",
      description: "A C program that generates customer bills for a restaurant and manages menu items.",
      liveLink: null,
      gitLink: "https://github.com/mmiskatul/Restaurant_billing_System.git",
      languages: ["C"],
      category: "Other"
    }
  ];

  const categories = ["All", "Full Stack", "Frontend", "Backend", "Other"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My <span className="text-indigo-600">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my work showcasing different technologies and problem-solving approaches
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                    <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 pb-6 flex gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={project.gitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors ${
                      !project.liveLink ? "col-span-2" : ""
                    }`}
                  >
                    View Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}