"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      company: "SparkTech Agency",
      position: "AI Developer",
      duration: "Jan 2026 – Present",
      responsibilities: [
        "Built state-of-the-art Generative AI applications using modern orchestration patterns",
        "Developed autonomous AI agents and conversational assistants designed to work with tools",
        "Created production-grade Retrieval-Augmented Generation (RAG) systems with vector databases",
        "Built real-time computer vision solutions utilizing deep learning and spatial analysis",
        "Designed and scaled FastAPI backends with asynchronous workers and input/output schema validation",
        "Integrated advanced proprietary LLMs including OpenAI GPT, Google Gemini, and Anthropic Claude",
        "Developed multi-platform React Native applications for mobile deployment of AI features"
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 relative bg-secondary-bg/30">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Chronological log of shipped systems and commercial AI projects.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-white/10 md:pl-12 pl-6 max-w-3xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative mb-12"
            >
              {/* Timeline Bullet */}
              <span className="absolute -left-[31px] md:-left-[55px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary-bg border border-accent ring-4 ring-accent/15">
                <Briefcase className="w-3.5 h-3.5 text-accent" />
              </span>

              {/* Experience Card */}
              <div className="glass-panel rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white tracking-wide">
                      {exp.position}
                    </h3>
                    <p className="text-accent font-semibold text-base mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
                    <Calendar className="w-4 h-4 text-accent-purple" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
