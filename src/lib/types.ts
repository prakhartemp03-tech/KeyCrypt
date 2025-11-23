export interface Level {
  level: number;
  name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export interface GameState {
  sessionId: string;
  level: number;
  cipherName: string;
  encryptedWord: string;
  hints: [string, string, string];
  guesses: string[];
  currentGuess: string;
  validationResults: string[][];
  attempts: number;
  maxAttempts: number;
  gameStatus: 'playing' | 'won' | 'lost';
  unlockedHints: number;
  actualWord?: string;
}

export interface ValidationResponse {
  result: string[]; // ['green', 'yellow', 'gray', 'green', 'gray']
  correct: boolean;
  attempts: number;
  max_attempts: number;
  game_over?: boolean;
  actual_word?: string;
}

export interface GeneratePuzzleResponse {
  session_id: string;
  cipher: string;
  encrypted_word: string;
  level: number;
  hint1: string;
  hint2: string;
  hint3: string;
}

export interface LevelsResponse {
  levels: Level[];
}

export interface KeyboardState {
  [key: string]: 'green' | 'yellow' | 'gray' | undefined;
}