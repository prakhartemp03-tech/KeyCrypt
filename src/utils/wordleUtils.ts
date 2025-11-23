export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function getKeyboardKeyClass(color: string | undefined): string {
  switch (color) {
    case 'green':
      return 'bg-green-500 text-white border-green-600 hover:bg-green-600';
    case 'yellow':
      return 'bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600';
    case 'gray':
      return 'bg-gray-500 text-white border-gray-600 hover:bg-gray-600';
    default:
      return 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300';
  }
}

export function getGridCellClass(color: string | undefined): string {
  switch (color) {
    case 'green':
      return 'bg-green-500 border-green-600 text-white';
    case 'yellow':
      return 'bg-yellow-500 border-yellow-600 text-white';
    case 'gray':
      return 'bg-gray-500 border-gray-600 text-white';
    default:
      return 'bg-white border-gray-300 text-gray-800';
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Hard':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Expert':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function isValidWord(word: string): boolean {
  return word.length === 5 && /^[A-Za-z]+$/.test(word);
}

export function updateKeyboardState(
  keyboardState: Record<string, 'green' | 'yellow' | 'gray' | undefined>,
  guess: string,
  feedback: string[]
): Record<string, 'green' | 'yellow' | 'gray' | undefined> {
  const newKeyboardState = { ...keyboardState };

  for (let i = 0; i < guess.length; i++) {
    const letter = guess[i].toUpperCase();
    const feedbackColor = feedback[i] as 'green' | 'yellow' | 'gray';

    // Only update if:
    // 1. Letter hasn't been used before, OR
    // 2. New feedback is 'better' than existing (green > yellow > gray)
    if (
      !newKeyboardState[letter] ||
      (feedbackColor === 'green') ||
      (feedbackColor === 'yellow' && newKeyboardState[letter] === 'gray')
    ) {
      newKeyboardState[letter] = feedbackColor;
    }
  }

  return newKeyboardState;
}