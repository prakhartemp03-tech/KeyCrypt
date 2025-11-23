import { GameState } from '../lib/types';

export function initializeGameState(): GameState {
  return {
    sessionId: '',
    level: 1,
    cipherName: '',
    encryptedWord: '',
    hints: ['', '', ''],
    guesses: [],
    currentGuess: '',
    validationResults: [],
    attempts: 0,
    maxAttempts: 6,
    gameStatus: 'playing',
    unlockedHints: 0,
  };
}

export function calculateUnlockedHints(wrongAttempts: number): number {
  if (wrongAttempts >= 5) return 3;
  if (wrongAttempts >= 4) return 2;
  if (wrongAttempts >= 2) return 1;
  return 0;
}

export function shouldUnlockHint(currentUnlocked: number, attempts: number): number {
  const wrongAttempts = attempts;
  const shouldUnlock = calculateUnlockedHints(wrongAttempts);
  return Math.max(currentUnlocked, shouldUnlock);
}

export function formatTimeRemaining(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function getCipherDescription(cipherName: string): string {
  const descriptions: Record<string, string> = {
    'Caesar Cipher': 'Each letter is shifted by a fixed number of positions in the alphabet',
    'Monoalphabetic Cipher': 'Each letter maps to a different unique letter in a fixed pattern',
    'Vigenère Cipher': 'Uses a repeating keyword to apply different Caesar shifts to each letter',
    'Playfair Cipher': 'Encrypts pairs of letters using a 5x5 key square with special rules',
    'Rail Fence Cipher': 'Writes letters in a zigzag pattern and reads them row by row',
    'Hill Cipher': 'Uses matrix multiplication to encrypt blocks of letters',
    'One-Time Pad': 'Each letter is combined with a random key character, theoretically unbreakable',
    'DES Cipher': 'A block cipher that processes data in 64-bit blocks using complex permutations',
    'RSA Cipher': 'Uses prime numbers and modular exponentiation for asymmetric encryption',
  };

  return descriptions[cipherName] || 'A cryptographic cipher to decrypt';
}