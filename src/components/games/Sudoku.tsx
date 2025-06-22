import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SudokuProps {
  onBack: () => void;
}

const Sudoku: React.FC<SudokuProps> = ({ onBack }) => {
  const [board, setBoard] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateNewGame(difficulty);
  }, [difficulty]);

  const generateNewGame = (diff: 'easy' | 'medium' | 'hard') => {
    setMessage('');
    const newBoard = createSudokuBoard();
    const solvedBoard = solveSudoku(newBoard.map(row => [...row])); // Deep copy for solving
    setSolution(solvedBoard);

    let cellsToRemove = 0;
    if (diff === 'easy') cellsToRemove = 40;
    else if (diff === 'medium') cellsToRemove = 50;
    else cellsToRemove = 60;

    const puzzleBoard = removeCells(newBoard, cellsToRemove);
    setBoard(puzzleBoard);
  };

  const createSudokuBoard = (): number[][] => {
    const newBoard = Array(9).fill(0).map(() => Array(9).fill(0));
    fillBoard(newBoard);
    return newBoard;
  };

  const fillBoard = (board: number[][]) => {
    fillDiagonalBoxes(board);
    solveSudoku(board);
  };

  const fillDiagonalBoxes = (board: number[][]) => {
    for (let i = 0; i < 9; i += 3) {
      fillBox(board, i, i);
    }
  };

  const fillBox = (board: number[][], row: number, col: number) => {
    let num;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        do {
          num = Math.floor(Math.random() * 9) + 1;
        } while (!isSafeInBox(board, row, col, num));
        board[row + i][col + j] = num;
      }
    }
  };

  const isSafeInBox = (board: number[][], row: number, col: number, num: number) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[row + i][col + j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const solveSudoku = (board: number[][]): number[][] => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
                return board;
              }
              board[row][col] = 0; // Backtrack
            }
          }
          return null; // No solution
        }
      }
    }
    return board; // Solved
  };

  const isSafe = (board: number[][], row: number, col: number, num: number) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }
    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }
    // Check 3x3 box
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  };

  const removeCells = (board: number[][], count: number): number[][] => {
    const newBoard = board.map(row => [...row]);
    let removed = 0;
    while (removed < count) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (newBoard[row][col] !== 0) {
        const temp = newBoard[row][col];
        newBoard[row][col] = 0;
        // Check if the puzzle still has a unique solution (simplified check)
        if (countSolutions(newBoard.map(r => [...r])) !== 1) {
          newBoard[row][col] = temp; // Restore if not unique
        } else {
          removed++;
        }
      }
    }
    return newBoard;
  };

  const countSolutions = (board: number[][]): number => {
    let solutions = 0;
    const solve = (currentBoard: number[][]) => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (currentBoard[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isSafe(currentBoard, row, col, num)) {
                currentBoard[row][col] = num;
                if (solve(currentBoard)) {
                  solutions++;
                  currentBoard[row][col] = 0; // Backtrack for more solutions
                  return true; // Found one solution, continue searching
                }
                currentBoard[row][col] = 0; // Backtrack
              }
            }
            return false; // No number fits
          }
        }
      }
      solutions++;
      return true; // Board is filled, found a solution
    };
    solve(board);
    return solutions;
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newBoard = board.map(r => [...r]);
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 1 || numValue > 9) {
      newBoard[row][col] = 0; // Clear if invalid input
    } else {
      newBoard[row][col] = numValue;
    }
    setBoard(newBoard);
    setMessage('');
  };

  const checkSolution = () => {
    if (JSON.stringify(board) === JSON.stringify(solution)) {
      setMessage('Congratulations! You solved it!');
    } else {
      setMessage('Keep trying! There are still errors.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sudoku</CardTitle>
          <Button onClick={onBack} variant="outline">Back to Games</Button>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4 space-x-2">
            <Button onClick={() => setDifficulty('easy')} variant={difficulty === 'easy' ? 'default' : 'outline'}>Easy</Button>
            <Button onClick={() => setDifficulty('medium')} variant={difficulty === 'medium' ? 'default' : 'outline'}>Medium</Button>
            <Button onClick={() => setDifficulty('hard')} variant={difficulty === 'hard' ? 'default' : 'outline'}>Hard</Button>
          </div>
          <div className="grid grid-cols-9 gap-0.5 border-2 border-gray-400 dark:border-gray-600">
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  maxLength={1}
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                  className={`w-full h-10 text-center text-lg font-bold
                    ${(rowIndex % 3 === 2 && rowIndex !== 8) ? 'border-b-2 border-gray-400 dark:border-gray-600' : ''}
                    ${(colIndex % 3 === 2 && colIndex !== 8) ? 'border-r-2 border-gray-400 dark:border-gray-600' : ''}
                    ${solution[rowIndex][colIndex] === board[rowIndex][colIndex] && cell !== 0 ? 'text-green-600 dark:text-green-400' : ''}
                    ${solution[rowIndex][colIndex] !== board[rowIndex][colIndex] && cell !== 0 ? 'text-red-600 dark:text-red-400' : ''}
                    ${solution[rowIndex][colIndex] === cell ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  readOnly={solution[rowIndex][colIndex] === cell && cell !== 0}
                />
              ))
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <Button onClick={checkSolution}>Check Solution</Button>
            <Button onClick={() => generateNewGame(difficulty)} variant="secondary">New Game</Button>
          </div>
          {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Sudoku;