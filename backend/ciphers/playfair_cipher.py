import random
import string
from .base_cipher import BaseCipher

class PlayfairCipher(BaseCipher):
    """Playfair cipher implementation with random key square."""

    def __init__(self):
        self.key_square = self._generate_key_square()

    def _generate_key_square(self):
        """Generate a 5x5 Playfair key square."""
        # Create a random keyword
        keyword_length = random.randint(5, 10)
        keyword = ''.join(random.choice(string.ascii_uppercase) for _ in range(keyword_length))

        # Create the key square
        # Remove duplicates from keyword, replace J with I
        keyword = keyword.replace('J', 'I')
        seen = set()
        key_square = []
        for char in keyword:
            if char not in seen:
                seen.add(char)
                key_square.append(char)

        # Fill remaining with alphabet (excluding J)
        for char in string.ascii_uppercase:
            if char != 'J' and char not in seen:
                key_square.append(char)

        return key_square  # 25 characters

    def _find_position(self, char):
        """Find the position of a character in the key square."""
        char = char.replace('J', 'I')
        index = self.key_square.index(char)
        row = index // 5
        col = index % 5
        return row, col

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using Playfair cipher."""
        # Preprocess: uppercase, remove non-letters, handle double letters
        plaintext = plaintext.upper().replace('J', 'I')
        processed = ""

        i = 0
        while i < len(plaintext):
            if i + 1 < len(plaintext):
                char1, char2 = plaintext[i], plaintext[i + 1]
                if char1 == char2:
                    # Insert X between double letters
                    processed += char1 + 'X'
                    i += 1
                else:
                    processed += char1 + char2
                    i += 2
            else:
                processed += plaintext[i]
                i += 1

        # If odd length, append X
        if len(processed) % 2 == 1:
            processed += 'X'

        # Encrypt pairs
        encrypted = ""
        for i in range(0, len(processed), 2):
            char1, char2 = processed[i], processed[i + 1]
            row1, col1 = self._find_position(char1)
            row2, col2 = self._find_position(char2)

            if row1 == row2:
                # Same row: shift right
                encrypted += self.key_square[row1 * 5 + (col1 + 1) % 5]
                encrypted += self.key_square[row2 * 5 + (col2 + 1) % 5]
            elif col1 == col2:
                # Same column: shift down
                encrypted += self.key_square[((row1 + 1) % 5) * 5 + col1]
                encrypted += self.key_square[((row2 + 1) % 5) * 5 + col2]
            else:
                # Rectangle: swap columns
                encrypted += self.key_square[row1 * 5 + col2]
                encrypted += self.key_square[row2 * 5 + col1]

        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for Playfair cipher."""
        hint1 = "This is a Playfair cipher using a 5x5 key square"
        hint2 = "The message is processed in letter pairs, and J is combined with I"
        hint3 = f"The key square contains: {' '.join(self.key_square[:10])}..."

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for Playfair cipher."""
        return {
            'name': 'Playfair Cipher',
            'description': 'Digraphic substitution cipher using a 5x5 key square to encrypt letter pairs',
            'difficulty': 'Medium'
        }

    def get_level_number(self) -> int:
        """Playfair cipher is level 4."""
        return 4