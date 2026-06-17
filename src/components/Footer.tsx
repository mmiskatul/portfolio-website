"use client";

import { Cpu } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-primary-bg py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-gradient-to-tr from-accent-purple to-accent flex items-center justify-center">
            <Cpu className="w-4 h-4 text-primary-bg" />
          </div>
          <span className="font-display font-bold text-sm text-white tracking-wider">
            MD. MISKATUL MASABI
          </span>
          <span className="text-[9px] font-mono text-gray-500">
            v1.2.0
          </span>
        </div>

        {/* Info */}
        <div className="text-center md:text-right space-y-2">
          <p className="text-gray-500 text-xs font-mono">
            &copy; {currentYear} MMASABI. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end items-center gap-4 text-[10px] font-mono text-gray-500">
            <span>Stack: Next.js 15 + Tailwind v4 + TS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
