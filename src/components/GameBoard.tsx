'use client';

import LevelSelector from './LevelSelector';
import EncryptedWord from './EncryptedWord';
import WordleGrid from './WordleGrid';
import VirtualKeyboard from './VirtualKeyboard';
import HintDisplay from './HintDisplay';
import GameStatus from './GameStatus';
import BackButton from './BackButton';
import AnimatedContainer from './AnimatedContainer';
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 flex items-center justify-center">
        <AnimatedContainer animation="scale-in">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Generating puzzle...</p>
          </div>
        </AnimatedContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-4 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <AnimatedContainer animation="slide-up" className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <BackButton onClick={handleChangeLevel} variant="header" />
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                CryptoWordle
              </h1>
              <p className="text-gray-600 text-sm">
                Decrypt the word to win!
              </p>
            </div>
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </AnimatedContainer>

        {/* Floating Back Button for Mobile */}
        <BackButton
          onClick={handleChangeLevel}
          variant="floating"
          text="Back"
        />

        {/* Error Display */}
        {error && (
          <AnimatedContainer animation="fade-in" className="mb-4">
            <div className="bg-error-50 border border-error-200 rounded-lg p-4 max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <p className="text-error-800 text-sm">{error}</p>
                <button
                  onClick={clearError}
                  className="text-error-500 hover:text-error-700 transition-colors duration-200"
                >
                  ✕
                </button>
              </div>
            </div>
          </AnimatedContainer>
        )}

        {/* Encrypted Word Display */}
        <AnimatedContainer animation="fade-in" delay={200}>
          <EncryptedWord
            encryptedWord={gameState.encryptedWord}
            cipherName={gameState.cipherName}
            level={gameState.level}
          />
        </AnimatedContainer>

        {/* Wordle Grid */}
        <AnimatedContainer animation="fade-in" delay={300}>
          <WordleGrid
            guesses={gameState.guesses}
            currentGuess={gameState.currentGuess}
            validationResults={gameState.validationResults}
          />
        </AnimatedContainer>

        {/* Hints Display */}
        <AnimatedContainer animation="fade-in" delay={400}>
          <HintDisplay
            hints={gameState.hints}
            unlockedHints={gameState.unlockedHints}
            attempts={gameState.attempts}
          />
        </AnimatedContainer>

        {/* Virtual Keyboard */}
        <AnimatedContainer animation="fade-in" delay={500}>
          <VirtualKeyboard
            onKeyPress={handleVirtualKeyPress}
            keyboardState={keyboardState}
            disabled={gameState.gameStatus !== 'playing' || isLoading}
          />
        </AnimatedContainer>

        {/* Game Status Modal */}
        <GameStatus
          gameState={gameState}
          onPlayAgain={handlePlayAgain}
          onChangeLevel={handleChangeLevel}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40 backdrop-blur-sm">
            <AnimatedContainer animation="scale-in">
              <div className="bg-white rounded-lg p-4 flex items-center space-x-3 shadow-lg">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                <span className="text-gray-700">Validating...</span>
              </div>
            </AnimatedContainer>
          </div>
        )}
      </div>
    </div>
  );
}