
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const LeaderboardSection = () => {
  const leaderboardData = [
    {
      rank: 1,
      name: "ProGamer2024",
      score: 15420,
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=50&h=50&fit=crop&crop=face",
      game: "Snake"
    },
    {
      rank: 2,
      name: "MemoryMaster",
      score: 12850,
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop&crop=face",
      game: "Memory Match"
    },
    {
      rank: 3,
      name: "TicTacChamp",
      score: 9640,
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=50&h=50&fit=crop&crop=face",
      game: "Tic Tac Toe"
    },
    {
      rank: 4,
      name: "SpeedRunner",
      score: 8320,
      avatar: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=50&h=50&fit=crop&crop=face",
      game: "Snake"
    },
    {
      rank: 5,
      name: "PuzzlePro",
      score: 7890,
      avatar: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=50&h=50&fit=crop&crop=face",
      game: "Memory Match"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "border-l-yellow-500 bg-yellow-500/5";
      case 2: return "border-l-gray-400 bg-gray-400/5";
      case 3: return "border-l-amber-600 bg-amber-600/5";
      default: return "border-l-gaming-600 bg-gaming-600/5";
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8 text-center">Global Leaderboard</h2>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Top Players This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((player, index) => (
              <div 
                key={player.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all duration-300 hover:scale-105 ${getRankColor(player.rank)}`}
              >
                <div className="flex-shrink-0">
                  {getRankIcon(player.rank)}
                </div>
                
                <Avatar className="w-12 h-12 border-2 border-gaming-600">
                  <AvatarImage src={player.avatar} />
                  <AvatarFallback>{player.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h4 className="font-semibold">{player.name}</h4>
                  <p className="text-sm text-muted-foreground">Best at {player.game}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-neon-blue">{player.score.toLocaleString()}</p>
                  <Badge variant="outline" className="border-gaming-600 text-gaming-600">
                    {player.game}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default LeaderboardSection;
