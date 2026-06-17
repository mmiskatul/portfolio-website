"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, LogOut, Loader2, ArrowLeft, Check, AlertCircle, Database, Shield } from "lucide-react";

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
  features: string[];
  challenges: string;
  solutions: string;
  results: string;
  lessonsLearned: string;
}

const emptyForm = {
  id: "",
  title: "",
  category: "Generative AI",
  description: "",
  problemSolved: "",
  architecture: "",
  techStack: "",
  gitLink: "",
  liveLink: "",
  features: "",
  challenges: "",
  solutions: "",
  results: "",
  lessonsLearned: ""
};

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<typeof emptyForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "success" as "success" | "error" });
  const router = useRouter();

  // 1. Authenticate Session
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (res.ok) {
          setAuthorized(true);
          fetchProjects();
        } else {
          setLoading(false);
          router.push("/abc");
        }
      })
      .catch(() => {
        setLoading(false);
        router.push("/abc");
      });
  }, [router]);

  // 2. Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/abc");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      problemSolved: project.problemSolved,
      architecture: project.architecture,
      techStack: project.techStack.join(", "),
      gitLink: project.gitLink,
      liveLink: project.liveLink,
      features: project.features.join("\n"),
      challenges: project.challenges,
      solutions: project.solutions,
      results: project.results || "",
      lessonsLearned: project.lessonsLearned || ""
    });
    setIsNew(false);
    setMessage({ text: "", type: "success" });
  };

  const handleCreateNew = () => {
    setEditingProject({ ...emptyForm });
    setIsNew(true);
    setMessage({ text: "", type: "success" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setMessage({ text: "Project deleted successfully", type: "success" });
      } else {
        const data = await res.json();
        setMessage({ text: data.error || "Failed to delete project", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Network connection error", type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject.description) {
      setMessage({ text: "Title and description are required", type: "error" });
      return;
    }

    setSubmitting(true);
    setMessage({ text: "", type: "success" });

    const payload = {
      ...editingProject,
      techStack: editingProject.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      features: editingProject.features.split("\n").map((f) => f.trim()).filter(Boolean),
    };

    try {
      const url = "/api/projects";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: `Project ${isNew ? "created" : "updated"} successfully!`, type: "success" });
        setEditingProject(null);
        fetchProjects();
      } else {
        setMessage({ text: data.error || "Submission failed", type: "error" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ text: "Network connection error", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !authorized) {
    return (
      <main className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
          <p className="text-gray-400 font-mono text-xs">Accessing Security Node...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-primary-bg py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Admin Control Center</h1>
              <p className="text-gray-500 text-xs font-mono">Operator ID: mmiskatul</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="px-4 py-2 text-xs font-mono text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Visit Site
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-xs font-mono text-red-400 hover:text-white border border-red-950/30 hover:bg-red-950/10 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        </div>

        {/* Global Action Message */}
        {message.text && (
          <div
            className={`p-4 rounded-xl mb-8 border text-xs flex items-start gap-2.5 ${
              message.type === "success"
                ? "bg-accent/15 border-accent/30 text-accent"
                : "bg-red-950/20 border-red-800/30 text-red-400"
            }`}
          >
            {message.type === "success" ? <Check className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        {/* Form View / Table Grid */}
        {editingProject ? (
          <div className="glass-panel rounded-2xl border border-white/5 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <h2 className="font-display text-xl font-bold text-white">
                {isNew ? "Initialize New Project Node" : "Edit Project Core Configurations"}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 text-xs font-mono text-gray-400 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Safety Monitoring System"
                    className="glass-input p-3 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="glass-input p-3 text-sm"
                  >
                    <option value="Generative AI">Generative AI</option>
                    <option value="Computer Vision">Computer Vision</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-mono text-gray-400 mb-1.5">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Summarize the core utility of the project in 2 sentences."
                  className="glass-input p-3 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Problem Solved</label>
                  <textarea
                    rows={3}
                    value={editingProject.problemSolved}
                    onChange={(e) => setEditingProject({ ...editingProject, problemSolved: e.target.value })}
                    placeholder="Describe what specific market/user problem this addresses..."
                    className="glass-input p-3 text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Engineering Solutions</label>
                  <textarea
                    rows={3}
                    value={editingProject.solutions}
                    onChange={(e) => setEditingProject({ ...editingProject, solutions: e.target.value })}
                    placeholder="Describe how your design solved the problem..."
                    className="glass-input p-3 text-sm resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-mono text-gray-400 mb-1.5">System Architecture Flow Chart (String/Text Schema)</label>
                <input
                  type="text"
                  value={editingProject.architecture}
                  onChange={(e) => setEditingProject({ ...editingProject, architecture: e.target.value })}
                  placeholder="Client -> API Ingestion -> Model Classifier -> Socket Alerts"
                  className="glass-input p-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={editingProject.techStack}
                    onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value })}
                    placeholder="FastAPI, YOLOv8, PyTorch, OpenCV"
                    className="glass-input p-3 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Technical Challenges</label>
                  <input
                    type="text"
                    value={editingProject.challenges}
                    onChange={(e) => setEditingProject({ ...editingProject, challenges: e.target.value })}
                    placeholder="Solving FPS degradation over high-concurrency streams."
                    className="glass-input p-3 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">GitHub Repository Link</label>
                  <input
                    type="url"
                    value={editingProject.gitLink}
                    onChange={(e) => setEditingProject({ ...editingProject, gitLink: e.target.value })}
                    placeholder="https://github.com/mmiskatul/..."
                    className="glass-input p-3 text-sm"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Live Demo Link</label>
                  <input
                    type="url"
                    value={editingProject.liveLink}
                    onChange={(e) => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                    placeholder="https://my-demo-link.dev"
                    className="glass-input p-3 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-mono text-gray-400 mb-1.5">Key Capabilities / Features (one per line)</label>
                <textarea
                  rows={4}
                  value={editingProject.features}
                  onChange={(e) => setEditingProject({ ...editingProject, features: e.target.value })}
                  placeholder="Real-time bounding box renders&#10;Multimodal invoice summaries&#10;Autonomous memory checkpointers"
                  className="glass-input p-3 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Technical Results (Case Study)</label>
                  <textarea
                    rows={3}
                    value={editingProject.results}
                    onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                    placeholder="Describe direct results, metrics, benchmarks..."
                    className="glass-input p-3 text-sm resize-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-mono text-gray-400 mb-1.5">Lessons Learned (Case Study)</label>
                  <textarea
                    rows={3}
                    value={editingProject.lessonsLearned}
                    onChange={(e) => setEditingProject({ ...editingProject, lessonsLearned: e.target.value })}
                    placeholder="Describe main takeaways and key learnings..."
                    className="glass-input p-3 text-sm resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-accent text-primary-bg hover:bg-accent/80 font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(0,245,212,0.2)] flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Writing configuration...
                  </>
                ) : (
                  "Save Project Configurations"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-accent-purple" />
                Active Database Registry
              </h2>
              <button
                onClick={handleCreateNew}
                className="px-4 py-2 rounded-lg bg-accent text-primary-bg font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,245,212,0.15)] hover:shadow-[0_0_20px_rgba(0,245,212,0.35)]"
              >
                <Plus className="w-4 h-4" />
                Add New Project
              </button>
            </div>

            {/* List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-xs font-mono text-gray-400">
                      <th className="p-4">Project Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Tech Stack</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm text-gray-300">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white font-display">
                          {project.title}
                        </td>
                        <td className="p-4">
                          <span className="text-[10px] font-mono text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded">
                            {project.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-xs max-w-xs truncate">
                          {project.techStack.join(", ")}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 text-gray-400 hover:text-white rounded hover:bg-white/5 transition-all"
                            title="Edit project config"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-red-400 hover:text-red-300 rounded hover:bg-red-950/10 transition-all"
                            title="Delete project node"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500 font-mono text-xs">
                          No project entries found in data/projects.json.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
