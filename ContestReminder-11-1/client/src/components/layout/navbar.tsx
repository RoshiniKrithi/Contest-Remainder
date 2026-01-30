import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Home, Globe, GraduationCap } from "lucide-react";
import { UserDropdown } from "./user-dropdown";

export default function Navbar() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/reminders", label: "Live Contests", icon: Globe },
    { path: "/courses", label: "Courses", icon: GraduationCap },
  ];

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 group" data-testid="link-home">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    CodeArena
                  </span>
                  <p className="text-xs text-gray-600 dark:text-gray-300 -mt-1">
                    Contest Platform
                  </p>
                </div>
              </Link>
              <div className="hidden lg:flex space-x-1">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.path} href={item.path}>
                      <button
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all btn-animate ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                        }`}
                        data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <UserDropdown />
            </div>
          </div>
        </div>
      </nav>
      

    </>
  );
}
