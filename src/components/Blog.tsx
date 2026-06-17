"use client";

import { motion } from "framer-motion";
import { Terminal, Clock, ArrowUpRight } from "lucide-react";

interface Post {
  title: string;
  topic: string;
  duration: string;
  date: string;
  excerpt: string;
  link: string;
}

export default function Blog() {
  const posts: Post[] = [
    {
      title: "Orchestrating Multi-Agent State Machines with LangGraph",
      topic: "AI Agents",
      duration: "6 min read",
      date: "May 12, 2026",
      excerpt: "Why standard chain-of-thought prompts fail for complex tasks. An engineering analysis of state preservation, cyclic graph routing, and human-in-the-loop validation.",
      link: "#"
    },
    {
      title: "Unlocking Sub-15ms Inference for YOLOv8 on Edge Devices",
      topic: "Computer Vision",
      duration: "8 min read",
      date: "April 28, 2026",
      excerpt: "Exporting PyTorch weights to ONNX format, compiling with TensorRT, and using multi-threaded OpenCV ring buffers to prevent frame ingestion bottlenecking.",
      link: "#"
    },
    {
      title: "Hybrid Search and Dense Vector Reranking in RAG Systems",
      topic: "Retrieval",
      duration: "5 min read",
      date: "April 03, 2026",
      excerpt: "Why cosine similarity alone is insufficient. How to combine sparse BM25 indices with dense embeddings and run reciprocal rank fusion (RRF) to optimize context relevance.",
      link: "#"
    }
  ];

  return (
    <section id="blog" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Log</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Technical notes, system postmortems, and architectural deep-dives.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded">
                    {post.topic}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{post.duration}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm line-clamp-3 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Read button */}
              <div className="flex items-center justify-between text-xs font-mono text-gray-500 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                <span>{post.date}</span>
                <span className="flex items-center gap-1 font-semibold text-accent-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  Read article
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
