import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const getRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

const AlphabetGame = ({ onBack }: { onBack: () => void }) => {
  const [currentLetter, setCurrentLetter] = useState(getRandomLetter());
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === currentLetter) {
      setMessage('✅ Correct!');
      setCurrentLetter(getRandomLetter());
      setInput('');
    } else {
      setMessage('❌ Try again!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4 neon-text">Alphabet Game</h1>
      <p className="mb-4 text-lg">Type the letter shown below:</p>
      <div className="text-6xl font-bold mb-6 neon-text">{currentLetter}</div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          maxLength={1}
          value={input}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 text-2xl text-center w-16"
          autoFocus
        />
        <Button type="submit">Check</Button>
      </form>
      {message && <div className="mb-4 text-lg">{message}</div>}
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default AlphabetGame; 