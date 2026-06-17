"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Search, ChevronRight, X, ArrowUpRight, Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import initialProjects from "../data/projects.json";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problemSolved: string;
  architecture: string;
  techStack: string[];
  gitLink: string;
  liveLink: string;
  gallery?: string[];
  features: string[];
  challenges: string;
  solutions: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch updated projects from API in background
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch");
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => console.log("Using static project fallback data", err));
  }, []);

  const categories = ["All", "Generative AI", "Computer Vision", "Machine Learning", "Backend"];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-32 relative bg-secondary-bg/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">AI Systems</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Click any project to inspect the full architecture, challenges, and implementation code.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-accent border-accent text-primary-bg font-bold shadow-md shadow-accent/10"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by title, stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input py-2.5 pl-10 pr-4 text-sm font-sans"
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/5 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Title & Tag */}
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Code */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/5 rounded text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-2 py-1 bg-white/5 border border-white/5 rounded text-accent">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-xs font-mono text-accent-purple font-semibold gap-1.5 group-hover:translate-x-1 transition-transform w-fit">
                    Inspect Architecture & Spec
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Project Details Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-bg/80 backdrop-blur-md overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, type: "spring", damping: 25 }}
                className="w-full max-w-4xl bg-secondary-bg/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative my-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Content */}
                <div className="p-6 md:p-10 max-h-[85vh] overflow-y-auto scrollbar-thin">
                  {/* Category & Links */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className="text-xs font-mono text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                    <div className="flex items-center gap-4">
                      <a
                        href={selectedProject.gitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <FaGithub className="w-4 h-4" />
                        Codebase
                      </a>
                      {selectedProject.liveLink && (
                        <a
                          href={selectedProject.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-6">
                    {selectedProject.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-base mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Problem Solved */}
                    <div className="glass-panel p-6 border border-white/5 rounded-xl">
                      <h4 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-accent-purple rounded" />
                        Problem Solved
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedProject.problemSolved}
                      </p>
                    </div>

                    {/* Solutions */}
                    <div className="glass-panel p-6 border border-white/5 rounded-xl">
                      <h4 className="font-display text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-accent rounded" />
                        Engineering Solution
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedProject.solutions}
                      </p>
                    </div>
                  </div>

                  {/* Architecture Diagram Spec */}
                  <div className="glass-panel p-6 border border-white/5 rounded-xl mb-8">
                    <h4 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-accent" />
                      System Architecture Flow
                    </h4>
                    <div className="bg-primary-bg/70 border border-white/10 rounded-lg p-5 font-mono text-xs text-accent-purple leading-relaxed overflow-x-auto">
                      {selectedProject.architecture}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Features */}
                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-accent rounded" />
                        Key Capabilities
                      </h4>
                      <ul className="space-y-3">
                        {selectedProject.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-gray-300 text-sm leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-accent-purple rounded" />
                        Technical Obstacles
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {selectedProject.challenges}
                      </p>
                    </div>
                  </div>

                  {/* Full Tech Stack */}
                  <div className="border-t border-white/5 pt-8 mt-8">
                    <h4 className="font-display text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                      Complete Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
