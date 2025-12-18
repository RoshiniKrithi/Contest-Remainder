import React from "react";
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
  ExternalLink,
  Trophy,
  Bell
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface UserDropdownProps {
  className?: string;
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { user, logoutMutation } = useAuth();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };
  return (
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
      <DropdownMenuContent align="end" className="w-56" data-testid="dropdown-user-menu">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || "Your Account"}</p>
            <p className="text-xs leading-none text-muted-foreground">
              Manage your competitive programming profiles
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer" data-testid="menu-profile">
            <User className="mr-2 h-4 w-4" />
            <span>Platform Profiles</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/reminders">
          <DropdownMenuItem className="cursor-pointer" data-testid="menu-reminders">
            <Bell className="mr-2 h-4 w-4" />
            <span>Contest Reminders</span>
          </DropdownMenuItem>
        </Link>
        
        <Link href="/leaderboard">
          <DropdownMenuItem className="cursor-pointer" data-testid="menu-leaderboard">
            <Trophy className="mr-2 h-4 w-4" />
            <span>Leaderboard</span>
          </DropdownMenuItem>
        </Link>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer" data-testid="menu-settings">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive" 
          data-testid="menu-logout"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}