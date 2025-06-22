
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, Home } from "lucide-react";

type Player = 'X' | 'O' | null;

const TicTacToe = ({ onBack }: { onBack: () => void }) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board: Player[]) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
      toast({
        title: `🎉 Player ${gameWinner} Wins!`,
        description: "Congratulations on your victory!",
        duration: 3000,
      });
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
      toast({
        title: "🤝 It's a Draw!",
        description: "Good game! Try again?",
        duration: 3000,
      });
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    toast({
      title: "🔄 Game Reset",
      description: "Starting a new game!",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl neon-text">Tic Tac Toe</CardTitle>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <Home className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            {!gameOver && !winner && (
              <p className="text-lg">Current Player: <span className="neon-text font-bold">{currentPlayer}</span></p>
            )}
            {winner && (
              <p className="text-lg text-green-400">Winner: <span className="neon-text font-bold">{winner}</span></p>
            )}
            {gameOver && !winner && (
              <p className="text-lg text-yellow-400">It's a Draw!</p>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {board.map((cell, index) => (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                className="glass-card w-20 h-20 text-2xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center"
                disabled={!!cell || gameOver}
              >
                <span className={cell === 'X' ? 'text-neon-blue' : 'text-neon-purple'}>
                  {cell}
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicTacToe;
