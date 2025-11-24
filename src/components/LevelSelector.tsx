'use client';

import { useState, useEffect } from 'react';
import { Level } from '../lib/types';
import { getLevels } from '../lib/api';
import { getDifficultyColor } from '../utils/wordleUtils';
import AnimatedContainer from './AnimatedContainer';
import { useStaggeredAnimation } from './AnimatedContainer';

interface LevelSelectorProps {
  onLevelSelect: (level: number) => void;
  isLoading?: boolean;
}

export default function LevelSelector({ onLevelSelect, isLoading = false }: LevelSelectorProps) {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getAnimationProps = useStaggeredAnimation(9);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <AnimatedContainer animation="scale-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </AnimatedContainer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
        <AnimatedContainer animation="fade-in">
          <div className="bg-error-50 border border-error-200 rounded-lg p-6 max-w-md text-center">
            <p className="text-lg font-semibold text-error-800 mb-2">Error loading levels</p>
            <p className="text-sm text-error-600">{error}</p>
          </div>
        </AnimatedContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AnimatedContainer animation="fade-in" className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            CryptoWordle
          </h1>
          <p className="text-xl text-gray-700 mb-3">
            Decrypt the encrypted word to win!
          </p>
          <p className="text-lg text-gray-600">
            Choose your difficulty level to begin the cryptographic challenge
          </p>
        </AnimatedContainer>

        {/* Level Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {levels.map((level, index) => (
            <AnimatedContainer
              key={level.level}
              {...getAnimationProps(index)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 card-hover"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {level.name}
                </h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
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

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {level.description}
              </p>

              <button
                onClick={() => onLevelSelect(level.level)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-105"
              >
                {isLoading ? 'Loading...' : 'Start Challenge'}
              </button>
            </AnimatedContainer>
          ))}
        </div>

        {/* How to Play Section */}
        <AnimatedContainer animation="slide-up" delay={600}>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg className="w-6 h-6 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to Play
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="text-primary-500 mr-2">🎯</span>
                    Objective
                  </h3>
                  <p className="text-gray-600">Decrypt the encrypted 5-letter word by guessing the original plaintext.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="text-secondary-500 mr-2">🎮</span>
                    Gameplay
                  </h3>
                  <p className="text-gray-600">Enter 5-letter guesses and receive Wordle-style feedback on your progress.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="text-accent-500 mr-2">💡</span>
                    Hints
                  </h3>
                  <p className="text-gray-600">Hints unlock after 2, 4, and 5 wrong guesses to help you solve the cipher.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="text-warning-500 mr-2">🏆</span>
                    Winning
                  </h3>
                  <p className="text-gray-600">Guess the word within 6 attempts to win and master the cryptographic challenge!</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}