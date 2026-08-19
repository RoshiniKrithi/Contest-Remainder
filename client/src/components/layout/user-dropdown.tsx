import React, { useState } from "react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  LogOut,
  Trophy,
  Bell,
  LineChart,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ActivityHeatmap from "@/components/profile/activity-heatmap";

interface UserDropdownProps {
  className?: string;
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { user, logoutMutation } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isAdminOrStaff = user?.role === "admin" || user?.role === "staff";

  return (
    <>
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-3xl bg-gray-950 border-gray-800 dark:text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {user?.username}'s Activity Profile
            </DialogTitle>
            <DialogDescription>
              Your coding activity and contribution history
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <ActivityHeatmap />
          </div>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`w-10 h-10 rounded-full btn-animate ${className}`}
            data-testid="button-user-menu"
          >
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800 text-slate-200" data-testid="dropdown-user-menu">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-white">{user?.username || "Your Account"}</p>
              <p className="text-xs leading-none text-slate-400 capitalize">
                Role: <span className="text-cyan-400 font-bold">{user?.role || "Student"}</span>
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-800" />

          {isAdminOrStaff && (
            <>
              <Link href="/admin/dashboard">
                <DropdownMenuItem className="cursor-pointer font-semibold text-blue-400 focus:bg-slate-800">
                  <ShieldCheck className="mr-2 h-4 w-4 text-blue-400" />
                  <span>Admin Dashboard</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-slate-800" />
            </>
          )}

          {isAdminOrStaff && (
            <>
              <Link href="/profile">
                <DropdownMenuItem className="cursor-pointer focus:bg-slate-800" data-testid="menu-profile">
                  <User className="mr-2 h-4 w-4 text-slate-400" />
                  <span>Platform Profiles</span>
                </DropdownMenuItem>
              </Link>
            </>
          )}

          <DropdownMenuSeparator className="bg-slate-800" />

          <DropdownMenuItem
            className="cursor-pointer text-rose-400 focus:text-rose-300 focus:bg-slate-800"
            data-testid="menu-logout"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}