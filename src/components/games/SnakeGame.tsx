
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw, Home } from "lucide-react";

type Position = { x: number; y: number };

const SnakeGame = ({ onBack }: { onBack: () => void }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { toast } = useToast();

  const BOARD_SIZE = 20;

  const generateFood = useCallback((snakeBody: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = () => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection({ x: 1, y: 0 });
    setGameRunning(false);
    setScore(0);
    setGameOver(false);
    toast({
      title: "🔄 Game Reset",
      description: "Ready for a new game!",
      duration: 2000,
    });
  };

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        toast({
          title: "💥 Game Over!",
          description: `Final Score: ${score}`,
          duration: 3000,
        });
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        toast({
          title: "💥 Game Over!",
          description: `Final Score: ${score}`,
          duration: 3000,
        });
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
        toast({
          title: "🍎 Food Eaten!",
          description: `Score: ${score + 10}`,
          duration: 1000,
        });
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, score, generateFood]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameRunning) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameRunning]);

  const toggleGame = () => {
    setGameRunning(!gameRunning);
    if (!gameRunning && !gameOver) {
      toast({
        title: "🎮 Game Started!",
        description: "Use arrow keys to control the snake",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl neon-text">Snake Game</CardTitle>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <Home className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <div className="text-lg font-bold">Score: {score}</div>
            <Button variant="outline" onClick={resetGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <Button onClick={toggleGame} className="bg-gaming-600 hover:bg-gaming-700">
              {gameRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {gameRunning ? 'Pause' : 'Start'}
            </Button>
          </div>
          
          <div className="grid grid-cols-20 gap-0 bg-gray-900 p-2 rounded max-w-md mx-auto"
               style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE;
              const y = Math.floor(index / BOARD_SIZE);
              const isSnake = snake.some(segment => segment.x === x && segment.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              
              return (
                <div
                  key={index}
                  className={`w-4 h-4 ${
                    isHead ? 'bg-neon-blue' :
                    isSnake ? 'bg-green-500' :
                    isFood ? 'bg-red-500' :
                    'bg-gray-800'
                  }`}
                />
              );
            })}
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Use arrow keys to control the snake
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SnakeGame;
