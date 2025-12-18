import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ExternalLink,
  User,
  Edit3,
  Plus,
  Check,
  X
} from "lucide-react";
import {
  SiCodeforces,
  SiLeetcode,
  SiCodechef
} from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface PlatformProfile {
  platform: string;
  username: string;
  verified: boolean;
}

interface PlatformInfo {
  name: string;
  icon: React.ComponentType<any> | (() => JSX.Element);
  color: string;
  profileUrl: (username: string) => string;
  statusUrl?: (username: string) => string;
  description: string;
}

const platformInfo: Record<string, PlatformInfo> = {
  'codeforces': {
    name: 'Codeforces',
    icon: SiCodeforces,
    color: 'bg-blue-500 text-white',
    profileUrl: (username: string) => `https://codeforces.com/profile/${username}`,
    statusUrl: (username: string) => `https://codeforces.com/api/user.info?handles=${username}`,
    description: 'View your rating, contest history, and submissions'
  },
  'leetcode': {
    name: 'LeetCode',
    icon: SiLeetcode,
    color: 'bg-orange-500 text-white',
    profileUrl: (username: string) => `https://leetcode.com/u/${username}/`,
    description: 'Check your problem solving progress and contest ratings'
  },
  'codechef': {
    name: 'CodeChef',
    icon: SiCodechef,
    color: 'bg-yellow-600 text-white',
    profileUrl: (username: string) => `https://www.codechef.com/users/${username}`,
    description: 'View your CodeChef rating and contest participation'
  },
  'atcoder': {
    name: 'AtCoder',
    icon: () => <div className="w-5 h-5 bg-current rounded font-bold text-xs flex items-center justify-center">AC</div>,
    color: 'bg-indigo-600 text-white',
    profileUrl: (username: string) => `https://atcoder.jp/users/${username}`,
    description: 'Check your AtCoder rating and contest history'
  },
  'hackerrank': {
    name: 'HackerRank',
    icon: () => <div className="w-5 h-5 bg-current rounded font-bold text-xs flex items-center justify-center">HR</div>,
    color: 'bg-green-600 text-white',
    profileUrl: (username: string) => `https://www.hackerrank.com/profile/${username}`,
    description: 'View your HackerRank badges and skills assessment'
  },
  'topcoder': {
    name: 'TopCoder',
    icon: () => <div className="w-5 h-5 bg-current rounded font-bold text-xs flex items-center justify-center">TC</div>,
    color: 'bg-cyan-600 text-white',
    profileUrl: (username: string) => `https://www.topcoder.com/members/${username}`,
    description: 'Check your TopCoder rating and competition history'
  }
};

export default function PlatformProfiles() {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<PlatformProfile[]>([
    { platform: 'codeforces', username: 'tourist', verified: true },
    { platform: 'leetcode', username: 'sample_user', verified: false },
  ]);
  const [editingProfile, setEditingProfile] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPlatform, setNewPlatform] = useState('codeforces');

  const handleSaveProfile = (platform: string) => {
    if (!newUsername.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setProfiles(prev =>
      prev.map(profile =>
        profile.platform === platform
          ? { ...profile, username: newUsername, verified: false }
          : profile
      )
    );
    setEditingProfile(null);
    setNewUsername('');

    toast({
      title: "Profile Updated",
      description: `${platformInfo[platform].name} profile updated successfully`,
    });
  };

  const handleAddProfile = () => {
    if (!newUsername.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const existingProfile = profiles.find(p => p.platform === newPlatform);
    if (existingProfile) {
      toast({
        title: "Error",
        description: "Profile for this platform already exists",
        variant: "destructive",
      });
      return;
    }

    setProfiles(prev => [...prev, {
      platform: newPlatform,
      username: newUsername,
      verified: false
    }]);
    setIsAddingNew(false);
    setNewUsername('');

    toast({
      title: "Profile Added",
      description: `${platformInfo[newPlatform].name} profile added successfully`,
    });
  };

  const handleRemoveProfile = (platform: string) => {
    setProfiles(prev => prev.filter(p => p.platform !== platform));
    toast({
      title: "Profile Removed",
      description: `${platformInfo[platform].name} profile removed`,
    });
  };

  const availablePlatforms = Object.keys(platformInfo).filter(
    platform => !profiles.some(p => p.platform === platform)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-black">Platform Profiles</h2>
          <p className="text-black mt-1">
            Connect your competitive programming profiles to track your progress
          </p>
        </div>

        {availablePlatforms.length > 0 && (
          <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
            <DialogTrigger asChild>
              <Button className="btn-animate" data-testid="button-add-profile">
                <Plus className="h-4 w-4 mr-2" />
                Add Platform
              </Button>
            </DialogTrigger>
            <DialogContent data-testid="dialog-add-profile">
              <DialogHeader>
                <DialogTitle>Add Platform Profile</DialogTitle>
                <DialogDescription>
                  Connect a new competitive programming platform to your profile
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-select">Platform</Label>
                  <select
                    id="platform-select"
                    className="w-full p-2 border border-input bg-background rounded-md"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    data-testid="select-platform"
                  >
                    {availablePlatforms.map(platform => (
                      <option key={platform} value={platform}>
                        {platformInfo[platform].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username-input">Username</Label>
                  <Input
                    id="username-input"
                    placeholder="Enter your username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    data-testid="input-username"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddProfile} className="flex-1 btn-animate" data-testid="button-save-profile">
                    Add Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingNew(false);
                      setNewUsername('');
                    }}
                    className="flex-1 btn-animate"
                    data-testid="button-cancel-profile"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((profile) => {
          const info = platformInfo[profile.platform];
          const IconComponent = info.icon;
          const isEditing = editingProfile === profile.platform;

          return (
            <Card key={profile.platform} className="card-hover theme-transition" data-testid={`profile-card-${profile.platform}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${info.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{info.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {info.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant={profile.verified ? "default" : "secondary"}>
                    {profile.verified ? (
                      <><Check className="h-3 w-3 mr-1" />Verified</>
                    ) : (
                      <><X className="h-3 w-3 mr-1" />Unverified</>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Username</Label>
                  {isEditing ? (
                    <div className="flex space-x-2">
                      <Input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter username"
                        className="flex-1"
                        data-testid={`input-edit-${profile.platform}`}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSaveProfile(profile.platform)}
                        className="btn-animate"
                        data-testid={`button-save-${profile.platform}`}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingProfile(null);
                          setNewUsername('');
                        }}
                        className="btn-animate"
                        data-testid={`button-cancel-${profile.platform}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-gray-100 font-medium">
                        {profile.username}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingProfile(profile.platform);
                          setNewUsername(profile.username);
                        }}
                        className="btn-animate"
                        data-testid={`button-edit-${profile.platform}`}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    className="flex-1 btn-animate"
                    onClick={() => window.open(info.profileUrl(profile.username), '_blank')}
                    data-testid={`button-view-profile-${profile.platform}`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveProfile(profile.platform)}
                    className="btn-animate"
                    data-testid={`button-remove-${profile.platform}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {profiles.length === 0 && (
        <Card className="p-8 text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No Platform Profiles
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your competitive programming platform profiles to quickly access your status and track your progress.
          </p>
          <Button onClick={() => setIsAddingNew(true)} className="btn-animate" data-testid="button-add-first-profile">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Platform
          </Button>
        </Card>
      )}
    </div>
  );
}