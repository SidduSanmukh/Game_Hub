import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trophy, User, LogOut, Gamepad2, Award, LogIn, Menu } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {
  onProfileClick: () => void;
  onLoginClick: () => void;
  isLoggedIn: boolean;
  rightExtra?: React.ReactNode;
}

const Header = ({ onProfileClick, onLoginClick, isLoggedIn, rightExtra }: HeaderProps) => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((d) => !d);

  const handleGamesClick = () => {
    const gamesSection = document.querySelector('[data-games-section]');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "🎮 Games Section",
      description: "Explore our collection of exciting games!",
      duration: 2000,
    });
  };

  const handleLeaderboardClick = () => {
    const leaderboardSection = document.querySelector('[data-leaderboard-section]');
    if (leaderboardSection) {
      leaderboardSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "🏆 Leaderboard",
      description: "See who's leading the competition!",
      duration: 2000,
    });
  };

  const handleAchievementsClick = () => {
    toast({
      title: "🏅 Achievements",
      description: "Your gaming milestones and accomplishments!",
      duration: 3000,
    });
  };

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 md:order-1">
            <h1 className="text-2xl font-bold neon-text">
              Game<span className="text-neon-blue"> Hub</span>
            </h1>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="hover:text-neon-blue" onClick={handleGamesClick}>
                <Gamepad2 className="w-4 h-4 mr-2" />
                Games
              </Button>
              <Button variant="ghost" className="hover:text-neon-blue" onClick={handleLeaderboardClick}>
                <Trophy className="w-4 h-4 mr-2" />
                Leaderboard
              </Button>
              <Button variant="ghost" className="hover:text-neon-blue" onClick={handleAchievementsClick}>
                <Award className="w-4 h-4 mr-2" />
                Achievements
              </Button>
            </nav>
          </div>
          
          <div className="flex items-center gap-4 md:order-2">
            <button
              className="md:hidden p-2 rounded hover:bg-white/10 focus:outline-none"
              onClick={() => setMobileNavOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
            {isLoggedIn && (
              <>
                <Badge className="bg-gaming-600 animate-pulse">
                  <Trophy className="w-3 h-3 mr-1" />
                  Rank #42
                </Badge>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 border border-neon-blue">
                    <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop&crop=face" />
                    <AvatarFallback>GV</AvatarFallback>
                  </Avatar>
                  <Button variant="ghost" size="sm" onClick={onProfileClick}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </>
            )}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-muted-foreground/20" onClick={onLoginClick}>
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
              {rightExtra}
            </div>
          </div>
        </div>

        {mobileNavOpen && (
          <nav className="flex flex-col gap-2 mt-4 md:hidden animate-slide-down">
            <Button variant="ghost" className="hover:text-neon-blue w-full justify-start" onClick={() => { handleGamesClick(); setMobileNavOpen(false); }}>
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </Button>
            <Button variant="ghost" className="hover:text-neon-blue w-full justify-start" onClick={() => { handleLeaderboardClick(); setMobileNavOpen(false); }}>
              <Trophy className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
            <Button variant="ghost" className="hover:text-neon-blue w-full justify-start" onClick={() => { handleAchievementsClick(); setMobileNavOpen(false); }}>
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
