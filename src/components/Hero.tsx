"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MessageSquare, Code2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px] pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

      {/* Grid overlay for tech look */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 relative">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 text-xs font-mono text-gray-300"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Available for AI Architect & Builder roles
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            MD. Miskatul
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent-purple to-accent glow-text">
            Masabi
          </span>
        </motion.h1>

        {/* Roles/Subtitles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-8 text-lg md:text-2xl font-display font-medium text-gray-300"
        >
          <span className="text-accent">AI Developer</span>
          <span className="text-white/20">•</span>
          <span className="text-accent-purple">Generative AI Engineer</span>
          <span className="text-white/20">•</span>
          <span className="text-accent">AI Backend Developer</span>
        </motion.div>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto text-gray-400 text-sm md:text-lg mb-12 leading-relaxed"
        >
          Building autonomous AI Agents, Multi-Agent Systems, advanced Computer Vision solutions, and production-ready, highly-scalable AI architectures.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-primary-bg font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,245,212,0.3)] hover:shadow-[0_0_30px_rgba(0,245,212,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="/Miskatul Masabi.pdf"
            download="Miskatul_Masabi_Resume.pdf"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 text-white font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            Download Resume
            <Download className="w-4 h-4 text-gray-400" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent-purple/20 border border-accent-purple/30 hover:border-accent-purple/60 text-white font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
          >
            Contact Me
            <Mail className="w-4 h-4 text-accent-purple" />
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex justify-center items-center gap-6"
        >
          <a
            href="https://github.com/mmiskatul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/miskatul-masabi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://huggingface.co/mmiskatul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-accent transition-colors duration-200 font-bold font-mono text-sm border border-gray-600 rounded px-1.5 py-0.5 bg-white/5"
            aria-label="Hugging Face Profile"
          >
            HF
          </a>
          <a
            href="https://codeforces.com/profile/miskatul_masabi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-accent-purple transition-colors duration-200"
            aria-label="Codeforces Profile"
          >
            <Code2 className="w-6 h-6" />
          </a>
          <a
            href="mailto:masabimiskat@gmail.com"
            className="text-gray-500 hover:text-white transition-colors duration-200"
            aria-label="Send Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-8 bottom-0 top-0 w-[1px] bg-white/5 hidden md:block" />
      <div className="absolute right-8 bottom-0 top-0 w-[1px] bg-white/5 hidden md:block" />
    </section>
  );
}
