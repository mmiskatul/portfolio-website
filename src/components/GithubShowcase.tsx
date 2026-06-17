"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookOpen, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics?: string[];
}

export default function GithubShowcase() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Custom mock contribution calendar fallback (53 weeks * 7 days = 371 cells)
  // Grids colored by contribution level: 0 (empty), 1-4 (greens)
  const [contributionGrid, setContributionGrid] = useState<number[]>([]);

  useEffect(() => {
    // Generate mock calendar values as initial state / fallback
    const fallbackGrid = [];
    for (let i = 0; i < 364; i++) {
      const r = Math.random();
      if (r < 0.4) fallbackGrid.push(0);
      else if (r < 0.7) fallbackGrid.push(1);
      else if (r < 0.9) fallbackGrid.push(2);
      else if (r < 0.97) fallbackGrid.push(3);
      else fallbackGrid.push(4);
    }
    setContributionGrid(fallbackGrid);

    // Fetch real-time contributions
    fetch("/api/github/calendar")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to fetch calendar");
      })
      .then((data) => {
        if (data.success && Array.isArray(data.contributions) && data.contributions.length > 0) {
          // Take the latest 364 days to fit the view grid
          setContributionGrid(data.contributions.slice(-364));
        }
      })
      .catch((err) => console.log("Using contribution fallback grid", err));

    // Fetch repositories
    fetch("https://api.github.com/users/mmiskatul/repos?sort=updated&per_page=30")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("API Limit / Failed");
      })
      .then((data: Repo[]) => {
        // Sort by stargazers + forks to find featured projects
        const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sorted.slice(0, 6)); // Top 6
        setLoading(false);
      })
      .catch((err) => {
        console.log("GitHub API fetch failed. Using fallback static repository list.", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Static Fallback Projects in case GitHub API has rate-limit issues
  const fallbackRepos: Repo[] = [
    {
      name: "Attendance-Management-System-with-QR-Code-Integration",
      description: "Java JDBC MySQL based attendance controller that integrates QR code scans for instantaneous student check-ins.",
      html_url: "https://github.com/mmiskatul/Attendance-Management-System-with-QR-Code-Integration",
      stargazers_count: 5,
      forks_count: 2,
      language: "Java",
      updated_at: "2026-05-18T10:00:00Z"
    },
    {
      name: "DIU-PageCrafter",
      description: "A full-stack React Node.js Express template enabling dynamic landing page construction and real-time custom layouts.",
      html_url: "https://github.com/mmiskatul/project-cover-page",
      stargazers_count: 3,
      forks_count: 1,
      language: "JavaScript",
      updated_at: "2026-06-01T15:30:00Z"
    },
    {
      name: "RistoAI-OCR-Backend",
      description: "FastAPI endpoints processing restaurant receipts, skew deskew, Tesseract token segments, and GPT-4o JSON validation.",
      html_url: "https://github.com/mmiskatul/REAL-STATE-WEB",
      stargazers_count: 2,
      forks_count: 0,
      language: "Python",
      updated_at: "2026-06-12T09:20:00Z"
    }
  ];

  const displayedRepos = error || repos.length === 0 ? fallbackRepos : repos;

  // Language color codes map
  const langColors: Record<string, string> = {
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    C: "bg-gray-400"
  };

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return "bg-white/5 border border-white/5";
      case 1: return "bg-emerald-950/40 border border-emerald-950/20";
      case 2: return "bg-emerald-800/60 border border-emerald-800/10";
      case 3: return "bg-emerald-600/80 border border-emerald-600/10";
      case 4: return "bg-accent border border-accent/20";
      default: return "bg-white/5";
    }
  };

  return (
    <section id="showcase" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            GitHub <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent-purple">Showcase</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent to-accent-purple mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Dynamic repository tracking, code updates, and activity graphs.
          </p>
        </div>

        {/* Contribution Graph Sandbox */}
        <div className="glass-panel rounded-2xl p-6 border border-white/5 mb-12">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-[10px] font-mono tracking-wider text-accent uppercase flex items-center gap-1.5">
              <FaGithub className="w-4 h-4 text-accent" />
              Developer Contribution Grid
            </span>
            <a
              href="https://github.com/mmiskatul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-gray-400 hover:text-white flex items-center gap-1"
            >
              @mmiskatul
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Calendar Grid Representation */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
            <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[720px] h-[100px]">
              {contributionGrid.map((level, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 hover:scale-125 ${getContributionColor(level)}`}
                  title={`Contribution Index: ${level}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-2">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-white/5" />
              <div className="w-2 h-2 rounded bg-emerald-950/40" />
              <div className="w-2 h-2 rounded bg-emerald-800/60" />
              <div className="w-2 h-2 rounded bg-emerald-600/80" />
              <div className="w-2 h-2 rounded bg-accent" />
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Repository Grid Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-mono text-xs">Querying Github Node...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRepos.map((repo, idx) => (
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={idx}
                className="glass-panel glass-panel-hover rounded-xl p-5 border border-white/5 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-accent transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-white text-base group-hover:text-accent transition-colors truncate mb-2">
                    {repo.name}
                  </h3>
                  
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mb-6">
                    {repo.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full inline-block ${langColors[repo.language] || "bg-gray-500"}`} />
                    <span>{repo.language || "Shell"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-accent-purple" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
