import random
from .base_cipher import BaseCipher

class MonoalphabeticCipher(BaseCipher):
    """Monoalphabetic substitution cipher with random mapping."""

    def __init__(self):
        # Create a random substitution mapping
        self.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        shuffled = list(self.alphabet)
        random.shuffle(shuffled)
        self.mapping = dict(zip(self.alphabet, shuffled))

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using monoalphabetic substitution."""
        encrypted = ""
        for char in plaintext:
            if char.isalpha():
                encrypted += self.mapping[char.upper()]
            else:
                encrypted += char
        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for monoalphabetic cipher."""
        hint1 = "This is a monoalphabetic substitution cipher"

        # Find most common letter mapping
        most_common_plain = 'E'  # Most common letter in English
        most_common_cipher = self.mapping[most_common_plain]
        hint2 = f"The letter E maps to {most_common_cipher}"

        # Reveal a few more mappings
        mappings_reveal = []
        for plain, cipher in self.mapping.items():
            if plain in ['A', 'T', 'O']:  # Common letters
                mappings_reveal.append(f"{plain}→{cipher}")
            if len(mappings_reveal) >= 2:
                break
        hint3 = f"Some mappings: {', '.join(mappings_reveal)}"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for monoalphabetic cipher."""
        return {
            'name': 'Monoalphabetic Cipher',
            'description': 'Each letter maps to a different unique letter in a fixed pattern',
            'difficulty': 'Easy'
        }

    def get_level_number(self) -> int:
        """Monoalphabetic cipher is level 2."""
        return 2