'use client';

import { useState, useEffect } from 'react';
import { Level } from '../lib/types';
import { getLevels } from '../lib/api';
import { getDifficultyColor } from '../utils/wordleUtils';

interface LevelSelectorProps {
  onLevelSelect: (level: number) => void;
  isLoading?: boolean;
}

export default function LevelSelector({ onLevelSelect, isLoading = false }: LevelSelectorProps) {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLevels() {
      try {
        const response = await getLevels();
        setLevels(response.levels);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load levels');
      } finally {
        setLoading(false);
      }
    }

    loadLevels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-lg font-semibold mb-2">Error loading levels</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CryptoWordle
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Decrypt the encrypted word to win!
          </p>
          <p className="text-md text-gray-500">
            Choose your difficulty level to begin the cryptographic challenge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => (
            <div
              key={level.level}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 p-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {level.name}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  Level {level.level}
                </span>
              </div>

              <div className="mb-4">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    level.difficulty
                  )}`}
                >
                  {level.difficulty}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-height-relaxed">
                {level.description}
              </p>

              <button
                onClick={() => onLevelSelect(level.level)}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isLoading ? 'Loading...' : 'Start Challenge'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Play</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">🎯 Objective</h3>
              <p>Decrypt the encrypted 5-letter word by guessing the original plaintext.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">🎮 Gameplay</h3>
              <p>Enter 5-letter guesses and receive Wordle-style feedback on your progress.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">💡 Hints</h3>
              <p>Hints unlock after 2, 4, and 5 wrong guesses to help you solve the cipher.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">🏆 Winning</h3>
              <p>Guess the word within 6 attempts to win and master the cryptographic challenge!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}