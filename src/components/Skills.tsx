"use client";

import { motion } from "framer-motion";
import { Cpu, Brain, Eye, Server, Layout } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Generative AI",
      icon: <Brain className="w-6 h-6 text-accent" />,
      color: "border-accent/30 hover:border-accent/60 shadow-accent/5",
      skills: [
        "OpenAI", "Gemini", "Claude", "RAG", "Prompt Engineering",
        "Vector Databases", "AI Agents", "Multi-Agent Systems",
        "LangGraph", "LangChain"
      ]
    },
    {
      title: "Computer Vision",
      icon: <Eye className="w-6 h-6 text-accent-purple" />,
      color: "border-accent-purple/30 hover:border-accent-purple/60 shadow-accent-purple/5",
      skills: ["YOLO", "OpenCV", "MediaPipe", "OCR"]
    },
    {
      title: "Machine Learning",
      icon: <Cpu className="w-6 h-6 text-accent" />,
      color: "border-accent/30 hover:border-accent/60 shadow-accent/5",
      skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Deep Learning"]
    },
    {
      title: "Backend Builder",
      icon: <Server className="w-6 h-6 text-accent-purple" />,
      color: "border-accent-purple/30 hover:border-accent-purple/60 shadow-accent-purple/5",
      skills: ["FastAPI", "Node.js", "MongoDB", "Firebase", "REST APIs", "WebSockets"]
    },
    {
      title: "Frontend Architect",
      icon: <Layout className="w-6 h-6 text-accent" />,
      color: "border-accent/30 hover:border-accent/60 shadow-accent/5",
      skills: ["React", "Next.js 15", "React Native", "Tailwind CSS", "TypeScript"]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Skills & Tech Stack</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Expertise in designing neural pipelines, orchestration logic, and web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className={`glass-panel rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${category.color}`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {category.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-white tracking-wide">
                  {category.title}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-accent/10 hover:border-accent/20 hover:text-accent transition-all duration-200 text-gray-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
