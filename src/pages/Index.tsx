import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import GameCard from "@/components/GameCard";
import LeaderboardSection from "@/components/LeaderboardSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Profile from "@/components/Profile";
import Login from "@/components/Login";
import TicTacToe from "@/components/games/TicTacToe";
import SnakeGame from "@/components/games/SnakeGame";
import MemoryMatch from "@/components/games/MemoryMatch";
import BikeRace from "@/components/games/BikeRace";
import AlphabetGame from "@/components/games/AlphabetGame";
import MathChallenge from "@/components/games/MathChallenge";
import WordBuilder from "@/components/games/WordBuilder";
import Sudoku from "@/components/games/Sudoku";
import { useTopPlayerToasts } from "@/hooks/useTopPlayerToasts";
import { useToast } from "@/hooks/use-toast";
import { Trophy, Star, Zap, Users } from "lucide-react";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'tictactoe' | 'snake' | 'memory' | 'bikerace' | 'alphabet' | 'math' | 'wordbuilder' | 'sudoku'>('home');
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes, user is logged in
  const [playerName, setPlayerName] = useState("Gamer");
  const [email, setEmail] = useState("gamer@gameverse.com");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  
  // Initialize the top player toasts
  useTopPlayerToasts();
  const { toast } = useToast();

  const handleStartPlaying = () => {
    // Scroll to games section
    const gamesSection = document.querySelector('[data-games-section]');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewLeaderboard = () => {
    // Scroll to leaderboard section
    const leaderboardSection = document.querySelector('[data-leaderboard-section]');
    if (leaderboardSection) {
      leaderboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlayGame = (gameId: number) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }
    if (!isSubscribed && gameId > 4) {
      setShowSubscribeModal(true);
      return;
    }
    switch (gameId) {
      case 1:
        setCurrentView('tictactoe');
        break;
      case 2:
        setCurrentView('snake');
        break;
      case 3:
        setCurrentView('memory');
        break;
      case 5:
        setCurrentView('bikerace');
        break;
      case 6:
        setCurrentView('alphabet');
        break;
      case 7:
        setCurrentView('math');
        break;
      case 8:
        setCurrentView('wordbuilder');
        break;
      case 9:
        setCurrentView('sudoku');
        break;
      default:
        toast({
          title: "🎮 Game Coming Soon!",
          description: "This game will be available soon!",
          duration: 3000,
        });
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setCurrentView('profile');
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    // If username is an email, use the part before '@' as the display name
    const displayName = username.includes('@') ? username.split('@')[0] : username;
    setPlayerName(displayName);
  };

  // Add a handler to update profile info
  const handleProfileSave = (newName: string, newEmail: string) => {
    setPlayerName(newName);
    setEmail(newEmail);
  };

  const games = [
    {
      id: 1,
      title: "Tic Tac Toe",
      description: "Classic strategy game",
      image: '/tic-tac-toe.svg',

      players: "1-2 Players",
      category: "Strategy",
      bestScore: 1250,
      onPlay: () => handlePlayGame(1)
    },
    {
      id: 2,
      title: "Snake Game",
      description: "Eat, grow, and survive",
      image: "/snake-game.svg",

      players: "1 Player",
      category: "Arcade",
      bestScore: 8420,
      onPlay: () => handlePlayGame(2)
    },
    {
      id: 3,
      title: "Memory Match",
      description: "Test your memory skills",
      image: "/memory-match.svg",

      players: "1 Player",
      category: "Puzzle",
      bestScore: 2100,
      onPlay: () => handlePlayGame(3)
    },
    {
      id: 5,
      title: "Bike Race",
      description: "Race your bike and beat the clock!",
      image: "/bike-race.svg",

      players: "1-2 Players",
      category: "Racing",
      bestScore: 0,
      onPlay: () => handlePlayGame(5)
    },
    {
      id: 6,
      title: "Alphabet Game",
      description: "Learn and play with alphabets!",
      image: "/alphabet-game.svg",

      players: "1 Player",
      category: "Educational",
      bestScore: 0,
      onPlay: () => handlePlayGame(6)
    },
    {
      id: 7,
      title: "Math Challenge",
      description: "Test your math skills!",
      image: "/math-challenge.svg",
      players: "1 Player",
      category: "Educational",
      bestScore: 0,
      onPlay: () => handlePlayGame(7)
    },
    {
      id: 8,
      title: "Word Builder",
      description: "Build words and expand your vocabulary!",
      image: "/word-builder.svg",
      players: "1 Player",
      category: "Puzzle",
      bestScore: 0,
      onPlay: () => handlePlayGame(8)
    },
    
  ];

  const achievements = [
    { name: "First Win", icon: Star, earned: true },
    { name: "Score Master", icon: Trophy, earned: true },
    { name: "Speed Runner", icon: Zap, earned: false },
    { name: "Social Gamer", icon: Users, earned: false }
  ];

  // Render different views based on current state
  if (currentView === 'profile') {
    return <Profile onClose={() => setCurrentView('home')} playerName={playerName} email={email} onSave={handleProfileSave} />;
  }

  if (currentView === 'tictactoe') {
    return <TicTacToe onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'snake') {
    return <SnakeGame onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'memory') {
    return <MemoryMatch onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'bikerace') {
    return <BikeRace onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'alphabet') {
    return <AlphabetGame onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'math') {
    return <MathChallenge onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'wordbuilder') {
    return <WordBuilder onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'sudoku') {
    return <Sudoku onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onProfileClick={handleProfileClick}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        rightExtra={
          !isSubscribed && (
            <Button className="ml-4" variant="outline" onClick={() => setShowSubscribeModal(true)}>
              Subscribe
            </Button>
          )
        }
        siteName="Game Hub"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-neon-gradient opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 neon-text animate-slide-up">
            Game<span className="text-neon-blue"> Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Your ultimate destination for casual gaming
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              className="bg-gaming-600 hover:bg-gaming-700 animate-pulse-glow"
              onClick={handleStartPlaying}
            >
              Start Playing
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
              onClick={handleViewLeaderboard}
            >
              View Leaderboard
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* User Profile Card */}
        {isLoggedIn && (
          <Card className="glass-card animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-neon-blue">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>GV</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {playerName}!</h2>
                  <p className="text-muted-foreground mb-4">Level 15 • 2,847 total points</p>
                  <div className="flex gap-2">
                    {achievements.map((achievement, index) => (
                      <Badge 
                        key={achievement.name} 
                        variant={achievement.earned ? "default" : "secondary"}
                        className={achievement.earned ? "bg-gaming-600" : ""}
                      >
                        <achievement.icon className="w-3 h-3 mr-1" />
                        {achievement.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                <StatsSection />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Games Section */}
        <section data-games-section>
          <h2 className="text-3xl font-bold mb-8 text-center">Choose Your Game</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                index={index}
                onPlay={game.onPlay}
              />
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Leaderboard Section */}
        <div data-leaderboard-section>
          <LeaderboardSection />
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {/* Subscription Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-xl max-w-sm w-full text-center text-black" style={{color: '#000'}}>
            <h2 className="text-2xl font-bold mb-4">Subscribe to Game Hub</h2>
            <p className="mb-6">Subscribe to unlock all games and enjoy unlimited fun!</p>
            <Button className="w-full mb-2" onClick={() => { setIsSubscribed(true); setShowSubscribeModal(false); }}>
              Subscribe Now
            </Button>
            <Button className="w-full" variant="outline" onClick={() => setShowSubscribeModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
