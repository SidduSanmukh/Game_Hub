import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const getRandomProblem = () => {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const op = Math.random() > 0.5 ? '+' : '-';
  return { a, b, op, answer: op === '+' ? a + b : a - b };
};

const MathChallenge = ({ onBack }: { onBack: () => void }) => {
  const [problem, setProblem] = useState(getRandomProblem());
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(input, 10) === problem.answer) {
      setMessage('✅ Correct!');
      setProblem(getRandomProblem());
      setInput('');
    } else {
      setMessage('❌ Try again!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <h1 className="text-4xl font-bold mb-4 neon-text">Math Challenge</h1>
      <p className="mb-4 text-lg">Solve the problem below:</p>
      <div className="text-5xl font-bold mb-6 neon-text">{problem.a} {problem.op} {problem.b}</div>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="number"
          value={input}
          onChange={handleInputChange}
          className="border rounded px-4 py-2 text-2xl text-center w-24"
          autoFocus
        />
        <Button type="submit">Check</Button>
      </form>
      {message && <div className="mb-4 text-lg">{message}</div>}
      <Button onClick={onBack}>Back to Home</Button>
    </div>
  );
};

export default MathChallenge; 