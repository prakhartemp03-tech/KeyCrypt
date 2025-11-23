import { GeneratePuzzleResponse, ValidationResponse, LevelsResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function generatePuzzle(level: number): Promise<GeneratePuzzleResponse> {
  const response = await fetch(`${API_BASE_URL}/generate?level=${level}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate puzzle');
  }

  return response.json();
}

export async function validateGuess(guess: string, sessionId: string): Promise<ValidationResponse> {
  const response = await fetch(`${API_BASE_URL}/validate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ guess, session_id: sessionId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to validate guess');
  }

  return response.json();
}

export async function getLevels(): Promise<LevelsResponse> {
  const response = await fetch(`${API_BASE_URL}/levels`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to get levels');
  }

  return response.json();
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