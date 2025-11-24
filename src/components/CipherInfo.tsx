'use client';

import { useState } from 'react';
import { getCipherExplanation, CipherExplanation } from '../lib/cipherData';

interface CipherInfoProps {
  cipherName: string;
}

export default function CipherInfo({ cipherName }: CipherInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cipherInfo = getCipherExplanation(cipherName);

  if (!cipherInfo) {
    return null;
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Brief intro - always visible */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              About this cipher
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {cipherInfo.briefIntro}
            </p>
          </div>

          {/* Expand/Collapse button */}
          <button
            onClick={toggleExpanded}
            className="ml-4 flex-shrink-0 inline-flex items-center px-3 py-1.5 text-xs font-medium text-primary-600 bg-primary-50 rounded-md hover:bg-primary-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
            aria-expanded={isExpanded}
            aria-controls="cipher-details"
          >
            {isExpanded ? 'Show Less' : 'Learn More'}
            <svg
              className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Expanded content */}
        <div
          id="cipher-details"
          className={`mt-4 space-y-4 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-gray-100 pt-4">
            {/* How it works */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How it works
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cipherInfo.detailedExplanation}
              </p>
            </div>

            {/* Historical context */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cipherInfo.historicalContext}
              </p>
            </div>

            {/* Difficulty */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-warning-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Difficulty
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {cipherInfo.difficulty}
              </p>
            </div>

            {/* Fun fact */}
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-md p-3 border border-accent-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Fun Fact
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed italic">
                {cipherInfo.funFact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}