// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { Sun, Moon, MoonIcon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        btn btn-ghost btn-circle
        hover:bg-base-200
        transition-all duration-300
      "
    >
      <span className="swap swap-rotate">
        {theme === "light" ? (
          <Sun className="swap-off w-5 h-5" />
        ) : (
          <MoonIcon className="swap-flip w-5 h-5" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
