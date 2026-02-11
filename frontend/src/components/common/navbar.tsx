"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "../../assets/DailyXP logo.png";
import Link from "next/link";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/"}>
            <Image
              src={logo}
              alt="DailyXP"
              width={180}
              height={180}
              className="rounded-md"
              priority
            />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLogin}
              className="rounded-full hover:bg-gray-100"
              title={isLoggedIn ? "Logout" : "Login"}
            >
              {isLoggedIn ? (
                <LogOut className="h-5 w-5 text-gray-700" />
              ) : (
                <User className="h-5 w-5 text-gray-700" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-gray-100"
              title="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5 text-gray-700" />
              ) : (
                <Sun className="h-5 w-5 text-gray-700" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
