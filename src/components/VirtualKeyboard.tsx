'use client';

import { KeyboardState } from '../lib/types';
import { LETTERS, getKeyboardKeyClass } from '../utils/wordleUtils';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  keyboardState: KeyboardState;
  disabled?: boolean;
}

export default function VirtualKeyboard({ onKeyPress, keyboardState, disabled = false }: VirtualKeyboardProps) {
  const keyboardRows = [
    'QWERTYUIOP',
    'ASDFGHJKL',
    'ZXCVBNM'
  ];

  const handleKeyClick = (key: string) => {
    if (!disabled) {
      onKeyPress(key);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-6">
      <div className="flex flex-col gap-2">
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {rowIndex === 2 && (
              <button
                onClick={() => onKeyPress('ENTER')}
                disabled={disabled}
                className={`
                  px-4 py-3 rounded font-medium text-sm transition-all duration-200
                  ${disabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600 active:scale-95'
                  }
                `}
              >
                ENTER
              </button>
            )}

            {row.split('').map((letter) => (
              <button
                key={letter}
                onClick={() => handleKeyClick(letter)}
                disabled={disabled}
                className={`
                  w-10 h-14 rounded font-bold text-lg transition-all duration-200 border
                  ${disabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                    : `${getKeyboardKeyClass(keyboardState[letter])} active:scale-95`
                  }
                `}
              >
                {letter}
              </button>
            ))}

            {rowIndex === 2 && (
              <button
                onClick={() => onKeyPress('BACKSPACE')}
                disabled={disabled}
                className={`
                  px-4 py-3 rounded font-medium text-sm transition-all duration-200
                  ${disabled
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-500 text-white hover:bg-gray-600 active:scale-95'
                  }
                `}
              >
                ⌫
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}