import React from "react";
import { useLocation } from "react-router";
import { CloudOff, PanelLeft } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { NAVIGATION } from "../constants/Navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();

  const theme = localStorage.getItem("theme");

  return (
    <div className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer"
        className="btn btn-square btn-ghost"
        aria-label="open sidebar"
      >
        <PanelLeft className="size-5" />
      </label>
      <div className="flex-1 px-4">
        <h1 className="text-xl font-bold">
          {NAVIGATION.find((item) => item.path === location.pathname)?.name ||
            "Dashboard"}
        </h1>
      </div>
      <div className="items-center mb-1 mr-4 justify-center hidden md:flex">
        <ThemeToggle />
      </div>

      <div className="mr-5">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
