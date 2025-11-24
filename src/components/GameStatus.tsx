'use client';

import { GameState } from '../lib/types';

interface GameStatusProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onChangeLevel: () => void;
}

export default function GameStatus({ gameState, onPlayAgain, onChangeLevel }: GameStatusProps) {
  if (gameState.gameStatus === 'playing') {
    return null;
  }

  const isWin = gameState.gameStatus === 'won';
  const { actualWord } = gameState;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all animate-bounce-in">
        <div className="text-center">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${isWin ? 'bg-green-100' : 'bg-red-100'}`}>
            <span className="text-4xl">
              {isWin ? '🎉' : '😔'}
            </span>
          </div>

          <h2 className={`text-2xl font-bold mb-2 ${isWin ? 'text-green-600' : 'text-red-600'}`}>
            {isWin ? 'Congratulations!' : 'Game Over'}
          </h2>

          <p className="text-gray-600 mb-4">
            {isWin
              ? `Excellent work! You decrypted the word in ${gameState.attempts} ${gameState.attempts === 1 ? 'attempt' : 'attempts'}!`
              : `Nice try! The word was ${actualWord}.`
            }
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Cipher:</span>
              <span className="text-sm font-bold text-gray-900">{gameState.cipherName}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Level:</span>
              <span className="text-sm font-bold text-gray-900">{gameState.level}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Attempts:</span>
              <span className="text-sm font-bold text-gray-900">{gameState.attempts} / {gameState.maxAttempts}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onPlayAgain}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Play Again
            </button>
            <button
              onClick={onChangeLevel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Change Level
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0.95); opacity: 0; }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-bounce-in {
          animation: bounce-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}