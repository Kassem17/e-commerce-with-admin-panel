// src/components/ThemeSwitcher.jsx
import React, { useEffect, useState } from "react";
import { Droplet, Sun, Moon, Zap, Skull } from "lucide-react";
import { GiCupcake } from "react-icons/gi";

const THEMES = [
  { name: "aqua", label: "Aqua", icon: Droplet },
  { name: "light", label: "Light", icon: Sun },
  { name: "dark", label: "Dark", icon: Moon },
  { name: "cupcake", label: "Cupcake", icon: <GiCupcake /> },
  { name: "cyberpunk", label: "Cyberpunk", icon: Zap },
  { name: "dracula", label: "Dracula", icon: Skull },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "aqua";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const activeTheme = THEMES.find((t) => t.name === theme);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm btn-outline gap-2">
        {activeTheme && <activeTheme.icon size={16} />}
        {activeTheme?.label}
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {THEMES.map((t) => {
          const Icon = t.icon;
          return (
            <li key={t.name}>
              <button
                className={`flex items-center gap-2 ${
                  theme === t.name ? "active" : ""
                }`}
                onClick={() => setTheme(t.name)}
              >
                <Icon size={16} />
                {t.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
