'use client';

interface EncryptedWordProps {
  encryptedWord: string;
  cipherName: string;
  level: number;
}

export default function EncryptedWord({ encryptedWord, cipherName, level }: EncryptedWordProps) {
  return (
    <div className="mb-6">
      <div className="text-center mb-4">
        <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium mb-4">
          Level {level}: {cipherName}
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 text-center">
          Decrypt this word:
        </h2>

        <div className="flex justify-center space-x-2">
          {encryptedWord.split('').map((letter, index) => (
            <div
              key={index}
              className="w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-xl shadow-md transform transition-transform hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {letter}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Enter your guess for the original 5-letter word below
        </p>
      </div>
    </div>
  );
}