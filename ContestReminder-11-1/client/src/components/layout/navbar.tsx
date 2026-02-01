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
      <nav className="bg-transparent backdrop-blur-md border-b border-white/10 sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-12">
              <Link href="/" className="flex items-center space-x-3 group" data-testid="link-home">
                <div className="p-2.5 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-all duration-300 border border-primary/20 group-hover:border-primary/40 shadow-lg group-hover:shadow-primary/20">
                  <Code className="h-7 w-7 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-primary transition-colors">
                    CodeArena
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase -mt-0.5">
                    Platform
                  </span>
                </div>
              </Link>
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link key={item.path} href={item.path}>
                      <button
                        className={`group relative flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${active
                          ? "text-white"
                          : "text-gray-500 hover:text-white"
                          }`}
                        data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
                      >
                        <IconComponent className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-primary' : ''}`} />
                        <span>{item.label}</span>
                        {/* Neon Underline Component */}
                        <div
                          className={`absolute bottom-1 left-4 right-4 h-[2px] bg-primary shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-all duration-300 transform origin-left ${active ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50"
                            }`}
                        />
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
            {location !== "/auth" && (
              <div className="flex items-center space-x-6">
                <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
                <UserDropdown />
              </div>
            )}
          </div>
        </div>
      </nav>


    </>
  );
}
