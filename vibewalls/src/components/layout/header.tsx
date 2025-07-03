"use client";
import React, { useEffect, useState } from "react";

const Header = () => {
  // Track theme for icon re-render
  const [isDark, setIsDark] = useState(false);

  // On mount, set theme from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme");
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }
  }, []);

  // Update color-scheme meta for better system support
  useEffect(() => {
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'color-scheme');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', isDark ? 'dark light' : 'light dark');
  }, [isDark]);

  const handleToggle = () => {
    const html = document.documentElement;
    const currentlyDark = html.classList.contains("dark");
    if (currentlyDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/60 dark:bg-[#0a1620]/60 border-b border-white/20 dark:border-[#1a2630]/20 shadow-sm transition-colors">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <span className="font-playfair text-2xl font-bold text-pink-500 tracking-tight select-none">
          VibeWalls
        </span>
        <button
          className="rounded-full p-2 bg-white/40 dark:bg-[#1a2630]/40 border border-white/30 dark:border-[#1a2630]/30 shadow hover:bg-white/60 dark:hover:bg-[#1a2630]/60 transition-colors"
          onClick={handleToggle}
          aria-label="Toggle theme"
        >
          <span className="sr-only">Toggle theme</span>
          {/* Sun/Moon Icon */}
          {isDark ? (
            // Moon icon
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-200"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          ) : (
            // Sun icon
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-200"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34l-1.41-1.41m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
