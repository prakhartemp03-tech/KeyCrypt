import { Level } from './types';

export const fallbackLevels: Level[] = [
  {
    level: 1,
    name: 'Caesar Cipher',
    description: 'Simple letter shift cipher',
    difficulty: 'Easy'
  },
  {
    level: 2,
    name: 'Monoalphabetic Cipher',
    description: 'Fixed letter substitution',
    difficulty: 'Easy'
  },
  {
    level: 3,
    name: 'Vigenère Cipher',
    description: 'Polygraphic cipher with keyword',
    difficulty: 'Medium'
  },
  {
    level: 4,
    name: 'Playfair Cipher',
    description: 'Letter pair encryption',
    difficulty: 'Medium'
  },
  {
    level: 5,
    name: 'Rail Fence Cipher',
    description: 'Transposition cipher',
    difficulty: 'Medium'
  },
  {
    level: 6,
    name: 'Hill Cipher',
    description: 'Matrix-based encryption',
    difficulty: 'Hard'
  },
  {
    level: 7,
    name: 'One-Time Pad',
    description: 'Theoretically unbreakable',
    difficulty: 'Hard'
  },
  {
    level: 8,
    name: 'DES Cipher',
    description: 'Block cipher standard',
    difficulty: 'Expert'
  },
  {
    level: 9,
    name: 'RSA Cipher',
    description: 'Asymmetric encryption',
    difficulty: 'Expert'
  }
];

export const fallbackEncryptedWords = [
  { word: 'KHOOR', cipher: 'Caesar Cipher' },
  { word: 'XSJUF', cipher: 'Caesar Cipher' },
  { word: 'OLSSV', cipher: 'Vigenère Cipher' },
  { word: 'BGMJK', cipher: 'Monoalphabetic Cipher' },
  { word: 'VHWOH', cipher: 'Playfair Cipher' }
];

export function getRandomFallbackData(level: number) {
  const encryptedData = fallbackEncryptedWords[level % fallbackEncryptedWords.length];
  const levelData = fallbackLevels[level - 1] || fallbackLevels[0];

  return {
    session_id: `demo-${Date.now()}`,
    cipher: levelData.name,
    encrypted_word: encryptedData.word,
    level: level,
    hint1: 'This is a demo mode - backend not connected',
    hint2: 'Try installing the backend dependencies',
    hint3: 'Check the setup instructions in README-CryptoWordle.md'
  };
}