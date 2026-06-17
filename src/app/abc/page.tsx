"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, User, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/abc/admin");
      } else {
        setError(data.error || "Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Network connection failure");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary-bg flex items-center justify-center relative px-4 overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md glass-panel rounded-2xl border border-white/5 p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-purple to-accent flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-primary-bg" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-wide">
            Access Portal
          </h1>
          <p className="text-gray-500 text-xs mt-1.5 font-mono">
            System Node: /abc
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-800/30 text-red-400 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-mono text-gray-400 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accent" />
              Username ID
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="operator"
              className="glass-input p-3.5 text-sm font-sans"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-mono text-gray-400 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-accent-purple" />
              Access Key
            </label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="glass-input p-3.5 text-sm font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-6 rounded-xl bg-accent text-primary-bg hover:bg-accent/80 font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(0,245,212,0.2)] hover:shadow-[0_0_25px_rgba(0,245,212,0.4)] flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Validating...
              </>
            ) : (
              "Connect Interface"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
