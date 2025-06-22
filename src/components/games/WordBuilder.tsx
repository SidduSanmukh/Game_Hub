import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const WORDS = ["APPLE", "BRAIN", "CHAIR", "DREAM", "EARTH", "FRUIT", "GRAPE", "HOUSE", "INDEX", "JOKER"];

function scramble(word: string) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

const getRandomWord = () => {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  return { original: word, scrambled: scramble(word) };
};

const WordBuilder = ({ onBack }: { onBack: () => void }) => {
  const [word, setWord] = useState(getRandomWord());
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === word.original) {
      setMessage('✅ Correct!');
      setWord(getRandomWord());
      setInput('');
    } else {
      setMessage('❌ Try again!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4 neon-text">Word Builder</h1>
      <p className="mb-4 text-lg">Unscramble the word below:</p>
      <div className="text-5xl font-bold mb-6 neon-text">{word.scrambled}</div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 text-2xl text-center w-32 text-black"
          autoFocus
        />
        <Button type="submit">Check</Button>
      </form>
      {message && <div className="mb-4 text-lg">{message}</div>}
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default WordBuilder; 