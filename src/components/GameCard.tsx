import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Trophy, Users } from "lucide-react";

interface Game {
  id: number;
  title: string;
  description: string;
  image: string;
  players: string;
  category: string;
  bestScore: number;
  onPlay?: () => void;
}

interface GameCardProps {
  game: Game;
  index: number;
  onPlay?: () => void;
}

const GameCard = ({ game, index, onPlay }: GameCardProps) => {
  const handlePlayClick = () => {
    if (onPlay) {
      onPlay();
    } else if (game.onPlay) {
      game.onPlay();
    }
  };

  return (
    <Card 
      className="game-card animate-slide-up" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={game.image} 
          alt={game.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{game.title}</h3>
            <p className="text-muted-foreground">{game.description}</p>
          </div>
          
          <div className="flex gap-2">
            <Badge variant="outline" className="border-neon-purple text-neon-purple">
              {game.category}
            </Badge>
            <Badge variant="outline" className="border-neon-blue text-neon-blue">
              <Users className="w-3 h-3 mr-1" />
              {game.players}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Best: {game.bestScore.toLocaleString()}
            </div>
            <Button 
              className="bg-gaming-600 hover:bg-gaming-700 animate-pulse-glow"
              onClick={handlePlayClick}
            >
              <Play className="w-4 h-4 mr-2" />
              Play Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameCard;
