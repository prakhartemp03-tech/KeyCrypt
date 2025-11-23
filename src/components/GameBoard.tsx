'use client';

import { useEffect } from 'react';
import LevelSelector from './LevelSelector';
import EncryptedWord from './EncryptedWord';
import WordleGrid from './WordleGrid';
import VirtualKeyboard from './VirtualKeyboard';
import HintDisplay from './HintDisplay';
import GameStatus from './GameStatus';
import { useGameState } from '../hooks/useGameState';
import { useKeyboard } from '../hooks/useKeyboard';

export default function GameBoard() {
  const {
    gameState,
    keyboardState,
    isLoading,
    error,
    startNewGame,
    submitGuess,
    addLetter,
    deleteLetter,
    clearError,
    resetGame,
  } = useGameState();

  // Handle keyboard input
  useKeyboard(
    addLetter,
    deleteLetter,
    submitGuess,
    gameState.gameStatus === 'playing'
  );

  // Handle virtual keyboard input
  const handleVirtualKeyPress = (key: string) => {
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACKSPACE') {
      deleteLetter();
    } else {
      addLetter(key);
    }
  };

  const handlePlayAgain = () => {
    startNewGame(gameState.level);
  };

  const handleChangeLevel = () => {
    resetGame();
  };

  const handleLevelSelect = (level: number) => {
    startNewGame(level);
  };

  // Show level selector if no game is active
  if (!gameState.sessionId) {
    return <LevelSelector onLevelSelect={handleLevelSelect} isLoading={isLoading} />;
  }

  // Show loading state while game is initializing
  if (isLoading && !gameState.encryptedWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating puzzle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CryptoWordle
          </h1>
          <p className="text-gray-600">
            Decrypt the word to win!
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <p className="text-red-800 text-sm">{error}</p>
              <button
                onClick={clearError}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Encrypted Word Display */}
        <EncryptedWord
          encryptedWord={gameState.encryptedWord}
          cipherName={gameState.cipherName}
          level={gameState.level}
        />

        {/* Wordle Grid */}
        <WordleGrid
          guesses={gameState.guesses}
          currentGuess={gameState.currentGuess}
          validationResults={gameState.validationResults}
        />

        {/* Hints Display */}
        <HintDisplay
          hints={gameState.hints}
          unlockedHints={gameState.unlockedHints}
          attempts={gameState.attempts}
        />

        {/* Virtual Keyboard */}
        <VirtualKeyboard
          onKeyPress={handleVirtualKeyPress}
          keyboardState={keyboardState}
          disabled={gameState.gameStatus !== 'playing' || isLoading}
        />

        {/* Game Status Modal */}
        <GameStatus
          gameState={gameState}
          onPlayAgain={handlePlayAgain}
          onChangeLevel={handleChangeLevel}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-4 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Validating...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}