'use client';

import { getGridCellClass } from '../utils/wordleUtils';

interface WordleGridProps {
  guesses: string[];
  currentGuess: string;
  validationResults: string[][];
  maxRows?: number;
}

export default function WordleGrid({
  guesses,
  currentGuess,
  validationResults,
  maxRows = 6
}: WordleGridProps) {
  return (
    <div className="mb-6">
      <div className="grid grid-rows-6 gap-2 max-w-xs mx-auto">
        {Array.from({ length: maxRows }, (_, rowIndex) => {
          const guess = guesses[rowIndex] || '';
          const validation = validationResults[rowIndex];
          const isCurrentRow = rowIndex === guesses.length;

          return (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }, (_, colIndex) => {
                let letter = '';
                let color = undefined;

                if (isCurrentRow) {
                  // Show current guess in progress
                  letter = currentGuess[colIndex] || '';
                } else if (rowIndex < guesses.length) {
                  // Show completed guess with validation
                  letter = guess[colIndex] || '';
                  color = validation?.[colIndex];
                }

                return (
                  <div
                    key={colIndex}
                    className={`
                      w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold
                      transition-all duration-300 transform
                      ${getGridCellClass(color)}
                      ${letter ? 'scale-100' : 'scale-95'}
                      ${color ? 'animate-flip' : ''}
                    `}
                    style={{
                      animationDelay: isCurrentRow && letter ? `${colIndex * 50}ms` : undefined,
                    }}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes flip {
          0% { transform: rotateX(0deg); }
          50% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }

        .animate-flip {
          animation: flip 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}