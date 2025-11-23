import random
from .base_cipher import BaseCipher

class CaesarCipher(BaseCipher):
    """Caesar cipher implementation with random shift."""

    def __init__(self):
        # Random shift between 1 and 25
        self.shift = random.randint(1, 25)

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using Caesar cipher with random shift."""
        encrypted = ""
        for char in plaintext:
            if char.isalpha():
                # Shift only letters, preserve case by converting to uppercase
                shifted = ord(char.upper()) - ord('A') + self.shift
                shifted = shifted % 26
                encrypted += chr(shifted + ord('A'))
            else:
                encrypted += char
        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for Caesar cipher."""
        hint1 = f"This is a Caesar cipher with a shift between 1-25"

        if self.shift <= 5:
            hint2 = "The shift is a small number (1-5)"
        elif self.shift <= 10:
            hint2 = "The shift is a moderate number (6-10)"
        elif self.shift <= 15:
            hint2 = "The shift is a medium number (11-15)"
        elif self.shift <= 20:
            hint2 = "The shift is a large number (16-20)"
        else:
            hint2 = "The shift is a very large number (21-25)"

        hint3 = f"The shift is exactly {self.shift}"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for Caesar cipher."""
        return {
            'name': 'Caesar Cipher',
            'description': 'Simple substitution cipher where each letter is shifted by a fixed number of positions',
            'difficulty': 'Easy'
        }

    def get_level_number(self) -> int:
        """Caesar cipher is level 1."""
        return 1