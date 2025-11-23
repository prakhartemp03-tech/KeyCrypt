from typing import List, Tuple

class ValidationService:
    """Service for validating user guesses against actual words with Wordle-style feedback."""

    @staticmethod
    def validate_guess(guess: str, actual_word: str) -> Tuple[List[str], bool]:
        """
        Validate a user's guess against the actual word.

        Args:
            guess: The user's 5-letter guess
            actual_word: The actual word to guess

        Returns:
            Tuple of (feedback_list, is_correct)
            feedback_list: List of 'green', 'yellow', or 'gray' for each letter
            is_correct: Boolean indicating if the guess is completely correct

        Raises:
            ValueError: If guess or actual_word is not exactly 5 letters
        """
        # Validate input
        if len(guess) != 5 or len(actual_word) != 5:
            raise ValueError("Both guess and actual word must be exactly 5 letters")

        guess = guess.upper()
        actual_word = actual_word.upper()

        # Check if guess is completely correct
        is_correct = guess == actual_word

        # Create feedback list
        feedback = ['gray'] * 5

        # First pass: mark green (correct position)
        actual_word_chars = list(actual_word)
        guess_chars = list(guess)

        for i in range(5):
            if guess_chars[i] == actual_word_chars[i]:
                feedback[i] = 'green'
                # Mark these as processed
                actual_word_chars[i] = None
                guess_chars[i] = None

        # Second pass: mark yellow (correct letter, wrong position)
        for i in range(5):
            if guess_chars[i] is not None:  # Not already marked green
                if guess_chars[i] in actual_word_chars:
                    feedback[i] = 'yellow'
                    # Remove one occurrence from actual_word_chars
                    index = actual_word_chars.index(guess_chars[i])
                    actual_word_chars[index] = None

        return feedback, is_correct

    @staticmethod
    def get_color_code(color_name: str) -> str:
        """
        Convert color name to hex code for frontend display.

        Args:
            color_name: 'green', 'yellow', or 'gray'

        Returns:
            Hex color code string
        """
        color_map = {
            'green': '#4ade80',  # Tailwind green-400
            'yellow': '#facc15',  # Tailwind yellow-400
            'gray': '#6b7280'   # Tailwind gray-500
        }
        return color_map.get(color_name, '#6b7280')

    @staticmethod
    def get_css_class(color_name: str) -> str:
        """
        Convert color name to Tailwind CSS class.

        Args:
            color_name: 'green', 'yellow', or 'gray'

        Returns:
            Tailwind CSS class string
        """
        class_map = {
            'green': 'bg-green-500 text-white border-green-600',
            'yellow': 'bg-yellow-500 text-white border-yellow-600',
            'gray': 'bg-gray-500 text-white border-gray-600'
        }
        return class_map.get(color_name, 'bg-gray-500 text-white border-gray-600')