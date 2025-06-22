
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Trophy, Medal, Award } from 'lucide-react';

interface TopPlayer {
  name: string;
  rank: number;
  score: number;
  game: string;
  avatar: string;
}

export const useTopPlayerToasts = () => {
  const topPlayers: TopPlayer[] = [
    {
      name: "ProGamer2024",
      rank: 1,
      score: 15420,
      game: "Snake",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "MemoryMaster",
      rank: 2,
      score: 12850,
      game: "Memory Match",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "TicTacChamp",
      rank: 3,
      score: 9640,
      game: "Tic Tac Toe",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=50&h=50&fit=crop&crop=face"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const showTopPlayerToast = (player: TopPlayer) => {
    toast({
      title: `${getRankIcon(player.rank)} Top Player Alert!`,
      description: `${player.name} is dominating ${player.game} with ${player.score.toLocaleString()} points!`,
      duration: 4000,
    });
  };

  useEffect(() => {
    // Show initial toast after 3 seconds
    const initialTimer = setTimeout(() => {
      showTopPlayerToast(topPlayers[0]);
    }, 3000);

    // Show random top player toasts every 15 seconds
    const interval = setInterval(() => {
      const randomPlayer = topPlayers[Math.floor(Math.random() * topPlayers.length)];
      showTopPlayerToast(randomPlayer);
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return { showTopPlayerToast };
};
