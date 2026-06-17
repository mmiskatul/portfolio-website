"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ShieldAlert, Award, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import initialProjects from "../data/projects.json";

interface CaseStudy {
  id: string;
  projectTitle: string;
  tag: string;
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  challenges: string;
  results: string;
  lessonsLearned: string;
}

export default function CaseStudies() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  const mapProjectsToStudies = (projectsData: any[]): CaseStudy[] => {
    return projectsData.map((p) => ({
      id: `${p.id}-study`,
      projectTitle: `${p.title}`,
      tag: p.category,
      problem: p.problemSolved || "Detail analysis pending system audit.",
      solution: p.solutions || "System orchestration pending schema layout.",
      architecture: p.architecture || "Client Ingestion -> REST API -> Model Gateway",
      techStack: p.techStack || [],
      challenges: p.challenges || "High concurrency stress tests.",
      results: p.results || "Latency optimization benchmarks compiling.",
      lessonsLearned: p.lessonsLearned || "Structural checks are essential in multi-agent environments."
    }));
  };

  // Set initial fallback data
  useEffect(() => {
    const initialStudies = mapProjectsToStudies(initialProjects);
    setStudies(initialStudies);
    if (initialStudies.length > 0) {
      setActiveTab(initialStudies[0].id);
    }
  }, []);

  // Fetch live updates from projects API in background
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch");
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const liveStudies = mapProjectsToStudies(data);
          setStudies(liveStudies);
          
          // Re-map active tab if current tab doesn't exist anymore
          if (liveStudies.length > 0) {
            setActiveTab((current) => {
              const exists = liveStudies.some((s) => s.id === current);
              return exists ? current : liveStudies[0].id;
            });
          }
        }
      })
      .catch((err) => console.log("Using static case studies fallback data", err));
  }, []);

  const activeStudy = studies.find((s) => s.id === activeTab) || studies[0];

  if (studies.length === 0 || !activeStudy) {
    return null;
  }

  return (
    <section id="case-studies" className="py-32 relative bg-secondary-bg/30">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Production <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Case Studies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Detailed engineering breakdowns of real-world deployments and performance metrics.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Tabs Navigation */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none">
            {studies.map((study) => (
              <button
                key={study.id}
                onClick={() => setActiveTab(study.id)}
                className={`px-4 py-3.5 rounded-xl text-left text-xs font-mono border transition-all duration-300 shrink-0 w-[240px] lg:w-full ${
                  activeTab === study.id
                    ? "bg-accent/10 border-accent text-accent shadow-md shadow-accent/5"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white"
                }`}
              >
                <div className="font-semibold text-sm text-white truncate mb-1">
                  {study.projectTitle.split(":")[0]}
                </div>
                <span className="text-[10px] opacity-80 block truncate">
                  {study.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Whitepaper content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-2xl p-6 md:p-10 border border-white/15 bg-primary-bg/50"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white">
                      {activeStudy.projectTitle}
                    </h3>
                    <p className="text-accent text-xs font-mono mt-1 font-medium uppercase tracking-wider">
                      {activeStudy.tag}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                    <FileText className="w-4 h-4 text-accent-purple" />
                    <span>ENGINEERING REPORT</span>
                  </div>
                </div>

                {/* Subsections */}
                <div className="space-y-8">
                  {/* Problem & Solution Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent-purple" />
                        The Problem
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {activeStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        The Solution
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {activeStudy.solution}
                      </p>
                    </div>
                  </div>

                  {/* Architecture */}
                  <div>
                    <h4 className="font-display text-sm font-bold text-white mb-2.5 uppercase tracking-wide">
                      Systems Architecture
                    </h4>
                    <div className="bg-primary-bg/80 border border-white/10 p-4 rounded-xl font-mono text-xs text-accent leading-relaxed">
                      {activeStudy.architecture}
                    </div>
                  </div>

                  {/* Challenges & Results Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-accent-purple" />
                        Technical Obstacles
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {activeStudy.challenges}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
                        <Award className="w-4 h-4 text-accent" />
                        Quantifiable Results
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {activeStudy.results}
                      </p>
                    </div>
                  </div>

                  {/* Lessons Learned */}
                  <div className="border-t border-white/5 pt-6 mt-6">
                    <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide">
                      Key Takeaways & Lessons
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {activeStudy.lessonsLearned}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="border-t border-white/5 pt-6 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-gray-500 uppercase mr-2">Stack:</span>
                    {activeStudy.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 rounded text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
