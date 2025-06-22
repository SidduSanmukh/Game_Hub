
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RotateCcw, Home } from "lucide-react";

type MemoryCard = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryMatch = ({ onBack }: { onBack: () => void }) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const { toast } = useToast();

  const symbols = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺'];

  const initializeGame = () => {
    const gameCards: MemoryCard[] = [];
    symbols.forEach((symbol, index) => {
      gameCards.push(
        { id: index * 2, symbol, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, symbol, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          setFlippedCards([]);
          toast({
            title: "✨ Match Found!",
            description: "Great memory!",
            duration: 1000,
          });
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matches === symbols.length) {
      setGameWon(true);
      toast({
        title: "🎉 Congratulations!",
        description: `You won in ${moves} moves!`,
        duration: 3000,
      });
    }
  }, [matches, moves]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl neon-text">Memory Match</CardTitle>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <Home className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
            <div className="text-lg">
              <span className="mr-4">Moves: {moves}</span>
              <span>Matches: {matches}/{symbols.length}</span>
            </div>
            <Button variant="outline" onClick={initializeGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`glass-card w-16 h-16 text-2xl font-bold transition-all duration-300 flex items-center justify-center ${
                  card.isFlipped || card.isMatched 
                    ? 'bg-white/20' 
                    : 'bg-white/5 hover:bg-white/10'
                }`}
                disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
              >
                {card.isFlipped || card.isMatched ? card.symbol : '?'}
              </button>
            ))}
          </div>
          
          {gameWon && (
            <div className="text-center mt-6">
              <p className="text-2xl text-green-400 font-bold">🎉 You Won!</p>
              <p className="text-muted-foreground">Completed in {moves} moves</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryMatch;
