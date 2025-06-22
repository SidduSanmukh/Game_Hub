import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit, Save, X, Trophy, Star, Zap, Users } from "lucide-react";

const Profile = ({ onClose, playerName: initialName, email: initialEmail, onSave }: { onClose: () => void, playerName: string, email: string, onSave: (name: string, email: string) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [avatar, setAvatar] = useState<string | null>(null);
  const { toast } = useToast();

  const achievements = [
    { name: "First Win", icon: Star, earned: true, description: "Won your first game" },
    { name: "Score Master", icon: Trophy, earned: true, description: "Achieved high score" },
    { name: "Speed Runner", icon: Zap, earned: false, description: "Complete a game in under 30 seconds" },
    { name: "Social Gamer", icon: Users, earned: false, description: "Play with friends" }
  ];

  const gameStats = [
    { game: "Tic Tac Toe", played: 25, won: 18, bestScore: 1250 },
    { game: "Snake Game", played: 42, won: 35, bestScore: 8420 },
    { game: "Memory Match", played: 18, won: 12, bestScore: 2100 }
  ];

  // Load avatar from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('profile_avatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    onSave(playerName, email);
    toast({
      title: "✅ Profile Updated",
      description: "Your profile has been saved successfully!",
      duration: 3000,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPlayerName(initialName);
    setEmail(initialEmail);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        setAvatar(dataUrl);
        localStorage.setItem('profile_avatar', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold neon-text">Player Profile</h1>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
        </div>

        {/* Profile Info Card */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Profile Information</CardTitle>
              {!isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative flex flex-col items-center">
                <Avatar className="w-24 h-24 border-2 border-neon-blue">
                  <AvatarImage src={avatar || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face"} />
                  <AvatarFallback>GV</AvatarFallback>
                </Avatar>
                {isEditing ? (
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={handlePhotoChange} />
                  </div>
                ) : (
                  <Button size="sm" className="mt-2" variant="secondary" onClick={() => setIsEditing(true)}>
                    Edit Photo
                  </Button>
                )}
              </div>
              <div className="flex-1 space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="playerName">Player Name</Label>
                    {isEditing ? (
                      <Input
                        id="playerName"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-lg font-semibold mt-1">{playerName}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-lg mt-1">{email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span>Level 15</span>
                  <span>•</span>
                  <span>2,847 total points</span>
                  <span>•</span>
                  <span>Rank #42</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Card */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${
                  achievement.earned ? 'bg-gaming-600/20' : 'bg-muted/20'
                }`}>
                  <achievement.icon className={`w-8 h-8 ${
                    achievement.earned ? 'text-gaming-400' : 'text-muted-foreground'
                  }`} />
                  <div>
                    <p className="text-sm font-medium leading-none">{achievement.name}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;