import { GeneratePuzzleResponse, ValidationResponse, LevelsResponse } from './types';
import { fallbackLevels, getRandomFallbackData } from './fallbackData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function tryFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.warn('Backend not available, using fallback data:', error);
    throw error;
  }
}

export async function generatePuzzle(level: number): Promise<GeneratePuzzleResponse> {
  try {
    return await tryFetch<GeneratePuzzleResponse>(`${API_BASE_URL}/generate?level=${level}`);
  } catch (error) {
    // Fallback mode for when backend is not available
    return getRandomFallbackData(level);
  }
}

export async function validateGuess(guess: string, sessionId: string): Promise<ValidationResponse> {
  try {
    return await tryFetch<ValidationResponse>(`${API_BASE_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess, session_id: sessionId }),
    });
  } catch (error) {
    // Simple fallback validation - demo word is "HELLO"
    const demoWord = "HELLO";
    const isCorrect = guess.toUpperCase() === demoWord;

    // Simple Wordle-like feedback
    const result = guess.toUpperCase().split('').map((letter, index) => {
      if (demoWord[index] === letter) return 'green';
      if (demoWord.includes(letter)) return 'yellow';
      return 'gray';
    });

    return {
      result,
      correct: isCorrect,
      attempts: 1,
      max_attempts: 6,
      game_over: isCorrect,
      actual_word: isCorrect ? demoWord : undefined
    };
  }
}

export async function getLevels(): Promise<LevelsResponse> {
  try {
    return await tryFetch<LevelsResponse>(`${API_BASE_URL}/levels`);
  } catch (error) {
    // Fallback levels
    return { levels: fallbackLevels };
  }
}

export async function getGameStatus(sessionId: string): Promise<{
  level: number;
  cipher_name: string;
  attempts: number;
  max_attempts: number;
}> {
  const response = await fetch(`${API_BASE_URL}/game-status?session_id=${sessionId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get game status');
  }

  return response.json();
}