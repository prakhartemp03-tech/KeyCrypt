'use client';

import { useEffect, useCallback } from 'react';

export function useKeyboard(
  onKeyPress: (key: string) => void,
  onDelete: () => void,
  onSubmit: () => void,
  isEnabled: boolean = true
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isEnabled) return;

    const key = event.key.toUpperCase();

    // Handle letter keys
    if (/^[A-Z]$/.test(key)) {
      event.preventDefault();
      onKeyPress(key);
      return;
    }

    // Handle backspace
    if (key === 'BACKSPACE') {
      event.preventDefault();
      onDelete();
      return;
    }

    // Handle enter
    if (key === 'ENTER') {
      event.preventDefault();
      onSubmit();
      return;
    }
  }, [onKeyPress, onDelete, onSubmit, isEnabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}