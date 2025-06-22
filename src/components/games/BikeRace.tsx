import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

const GAME_WIDTH = 300;
const GAME_HEIGHT = 500;
const BIKE_WIDTH = 40;
const BIKE_HEIGHT = 60;
const OBSTACLE_WIDTH = 40;
const OBSTACLE_HEIGHT = 40;
const OBSTACLE_SPEED = 5;
const BIKE_SPEED = 20;

function getRandomX() {
  return Math.floor(Math.random() * (GAME_WIDTH - OBSTACLE_WIDTH));
}

const BikeRace = ({ onBack }: { onBack: () => void }) => {
  const [bikeX, setBikeX] = useState(GAME_WIDTH / 2 - BIKE_WIDTH / 2);
  const [obstacles, setObstacles] = useState([{ x: getRandomX(), y: -OBSTACLE_HEIGHT }]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const animationRef = useRef<number>();

  // Move obstacles
  useEffect(() => {
    if (gameOver) return;
    const animate = () => {
      setObstacles((obs) => {
        let newObs = obs.map(o => ({ ...o, y: o.y + OBSTACLE_SPEED }));
        // Remove obstacles that are out of bounds and add new ones
        if (newObs.length === 0 || newObs[newObs.length - 1].y > 100) {
          newObs.push({ x: getRandomX(), y: -OBSTACLE_HEIGHT });
        }
        if (newObs[0].y > GAME_HEIGHT) {
          newObs.shift();
          setScore(s => s + 1);
        }
        return newObs;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    if (gameOver) return;
    for (let o of obstacles) {
      if (
        o.y + OBSTACLE_HEIGHT > GAME_HEIGHT - BIKE_HEIGHT &&
        o.y < GAME_HEIGHT &&
        o.x < bikeX + BIKE_WIDTH &&
        o.x + OBSTACLE_WIDTH > bikeX
      ) {
        setGameOver(true);
        break;
      }
    }
  }, [obstacles, bikeX, gameOver]);

  // Keyboard controls
  useEffect(() => {
    if (gameOver) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setBikeX(x => Math.max(0, x - BIKE_SPEED));
      } else if (e.key === 'ArrowRight') {
        setBikeX(x => Math.min(GAME_WIDTH - BIKE_WIDTH, x + BIKE_SPEED));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameOver]);

  const handleRestart = () => {
    setBikeX(GAME_WIDTH / 2 - BIKE_WIDTH / 2);
    setObstacles([{ x: getRandomX(), y: -OBSTACLE_HEIGHT }]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4 neon-text">Bike Race</h1>
      <div
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT, background: '#222', position: 'relative', overflow: 'hidden', borderRadius: 12 }}
        className="mb-4 border-4 border-neon-blue"
        tabIndex={0}
      >
        {/* Bike */}
        <div
          style={{
            position: 'absolute',
            left: bikeX,
            top: GAME_HEIGHT - BIKE_HEIGHT,
            width: BIKE_WIDTH,
            height: BIKE_HEIGHT,
            background: '#ff0',
            borderRadius: 8,
            border: '2px solid #fff',
          }}
        />
        {/* Obstacles */}
        {obstacles.map((o, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: o.x,
              top: o.y,
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT,
              background: '#0f0',
              borderRadius: 6,
              border: '2px solid #fff',
            }}
          />
        ))}
        {/* Game Over Overlay */}
        {gameOver && (
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            zIndex: 2
          }}>
            <div>Game Over</div>
            <Button className="mt-4" onClick={handleRestart}>Restart</Button>
          </div>
        )}
      </div>
      <div className="mb-4 text-lg">Score: {score}</div>
      <Button onClick={onBack}>Back to Home</Button>
      <div className="mt-4 text-sm text-muted-foreground">Use Left/Right arrow keys to move</div>
    </div>
  );
};

export default BikeRace; 