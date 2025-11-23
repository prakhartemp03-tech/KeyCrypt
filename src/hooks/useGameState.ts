'use client';

import { useState, useCallback } from 'react';
import { GameState, ValidationResponse, GeneratePuzzleResponse } from '../lib/types';
import { generatePuzzle, validateGuess } from '../lib/api';
import { initializeGameState, shouldUnlockHint } from '../utils/gameUtils';
import { updateKeyboardState } from '../utils/wordleUtils';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initializeGameState());
  const [keyboardState, setKeyboardState] = useState<Record<string, 'green' | 'yellow' | 'gray' | undefined>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNewGame = useCallback(async (level: number) => {
    try {
      setIsLoading(true);
      setError(null);

      const response: GeneratePuzzleResponse = await generatePuzzle(level);

      setGameState({
        sessionId: response.session_id,
        level: response.level,
        cipherName: response.cipher,
        encryptedWord: response.encrypted_word,
        hints: [response.hint1, response.hint2, response.hint3],
        guesses: [],
        currentGuess: '',
        validationResults: [],
        attempts: 0,
        maxAttempts: 6,
        gameStatus: 'playing',
        unlockedHints: 0,
      });

      setKeyboardState({});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitGuess = useCallback(async () => {
    if (!gameState.currentGuess || gameState.currentGuess.length !== 5) {
      setError('Please enter a 5-letter word');
      return;
    }

    if (gameState.gameStatus !== 'playing') {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response: ValidationResponse = await validateGuess(
        gameState.currentGuess,
        gameState.sessionId
      );

      const newGuesses = [...gameState.guesses, gameState.currentGuess];
      const newValidationResults = [...gameState.validationResults, response.result];
      const newAttempts = gameState.attempts + 1;

      // Update keyboard state
      const newKeyboardState = updateKeyboardState(
        keyboardState,
        gameState.currentGuess,
        response.result
      );

      // Check if hints should be unlocked
      const newUnlockedHints = shouldUnlockHint(gameState.unlockedHints, newAttempts);

      let newGameStatus: 'playing' | 'won' | 'lost' = gameState.gameStatus;
      let actualWord = gameState.actualWord;

      if (response.correct) {
        newGameStatus = 'won';
      } else if (response.game_over) {
        newGameStatus = 'lost';
        actualWord = response.actual_word;
      }

      setGameState({
        ...gameState,
        guesses: newGuesses,
        currentGuess: '',
        validationResults: newValidationResults,
        attempts: newAttempts,
        gameStatus: newGameStatus,
        unlockedHints: newUnlockedHints,
        actualWord,
      });

      setKeyboardState(newKeyboardState);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate guess');
    } finally {
      setIsLoading(false);
    }
  }, [gameState, keyboardState]);

  const addLetter = useCallback((letter: string) => {
    if (gameState.currentGuess.length < 5 && gameState.gameStatus === 'playing') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess + letter.toUpperCase(),
      }));
      setError(null);
    }
  }, [gameState.currentGuess.length, gameState.gameStatus]);

  const deleteLetter = useCallback(() => {
    if (gameState.currentGuess.length > 0 && gameState.gameStatus === 'playing') {
      setGameState(prev => ({
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
      }));
    }
  }, [gameState.currentGuess.length, gameState.gameStatus]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initializeGameState());
    setKeyboardState({});
    setError(null);
  }, []);

  return {
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
  };
}