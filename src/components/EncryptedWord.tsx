'use client';

import { useStaggeredAnimation } from './AnimatedContainer';
import CipherInfo from './CipherInfo';

interface EncryptedWordProps {
  encryptedWord: string;
  cipherName: string;
  level: number;
}

export default function EncryptedWord({ encryptedWord, cipherName, level }: EncryptedWordProps) {
  const getAnimationProps = useStaggeredAnimation(encryptedWord.length);

  return (
    <div className="mb-8 space-y-6">
      {/* Level Badge */}
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-full text-sm font-semibold shadow-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Level {level}: {cipherName}
        </div>
      </div>

      {/* Encrypted Word Display */}
      <div className="bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 rounded-xl p-8 border border-primary-200 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
          <svg className="w-6 h-6 mr-3 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Decrypt this word:
        </h2>

        <div className="flex justify-center space-x-3 mb-6">
          {encryptedWord.split('').map((letter, index) => (
            <div
              key={index}
              {...getAnimationProps(index)}
              className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-600 text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-lg letter-tile"
              style={{
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.25), 0 4px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 text-center">
          <p className="text-gray-700 text-sm leading-relaxed">
            Enter your guess for the original 5-letter word below
          </p>
        </div>
      </div>

      {/* Cipher Information */}
      <CipherInfo cipherName={cipherName} />
    </div>
  );
}