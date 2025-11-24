'use client';

interface HintDisplayProps {
  hints: [string, string, string];
  unlockedHints: number;
  attempts: number;
}

export default function HintDisplay({ hints, unlockedHints, attempts }: HintDisplayProps) {
  const getNextHintThreshold = () => {
    if (attempts < 2) return 2;
    if (attempts < 4) return 4;
    if (attempts < 5) return 5;
    return null;
  };

  const nextHintThreshold = getNextHintThreshold();

  return (
    <div className="mb-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">
        Hints
      </h3>

      <div className="space-y-2">
        {hints.map((hint, index) => {
          const isUnlocked = index < unlockedHints;
          const hintNumber = index + 1;

          return (
            <div
              key={index}
              className={`
                p-3 rounded-lg border transition-all duration-500
                ${isUnlocked
                  ? 'bg-yellow-50 border-yellow-200 text-yellow-900'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`
                    flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    ${isUnlocked
                      ? 'bg-yellow-200 text-yellow-800'
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {hintNumber}
                </span>
                <span className="text-sm font-medium">Hint {hintNumber}:</span>
              </div>

              <p className="mt-1 text-sm ml-8">
                {isUnlocked ? hint : '???'}
              </p>
            </div>
          );
        })}
      </div>

      {nextHintThreshold && unlockedHints < 3 && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            Next hint unlocks after {nextHintThreshold} wrong guesses
            {nextHintThreshold - attempts > 0 && (
              <span className="font-medium">
                {' '}
                ({nextHintThreshold - attempts} more attempt{nextHintThreshold - attempts !== 1 ? 's' : ''})
              </span>
            )}
          </p>
        </div>
      )}

      {unlockedHints === 3 && (
        <div className="mt-3 text-center">
          <p className="text-sm text-green-600 font-medium">
            All hints unlocked! Good luck! 🍀
          </p>
        </div>
      )}
    </div>
  );
}