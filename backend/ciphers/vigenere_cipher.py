import random
import string
from .base_cipher import BaseCipher

class VigenereCipher(BaseCipher):
    """Vigenère cipher implementation with random key."""

    def __init__(self):
        # Random key length between 3 and 7 characters
        self.key_length = random.randint(3, 7)
        # Generate random key using uppercase letters
        self.key = ''.join(random.choice(string.ascii_uppercase) for _ in range(self.key_length))

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using Vigenère cipher."""
        encrypted = ""
        key_index = 0

        for char in plaintext:
            if char.isalpha():
                # Convert both plaintext and key to numbers (A=0, B=1, etc.)
                plain_val = ord(char.upper()) - ord('A')
                key_val = ord(self.key[key_index % len(self.key)]) - ord('A')

                # Vigenère encryption: (plaintext + key) mod 26
                cipher_val = (plain_val + key_val) % 26
                encrypted += chr(cipher_val + ord('A'))

                key_index += 1
            else:
                encrypted += char

        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for Vigenère cipher."""
        hint1 = "This is a Vigenère cipher with a repeating key"
        hint2 = f"The key length is {self.key_length} letters"
        hint3 = f"The key starts with the letter {self.key[0]}"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for Vigenère cipher."""
        return {
            'name': 'Vigenère Cipher',
            'description': 'Polyalphabetic cipher using a repeating keyword for multiple Caesar shifts',
            'difficulty': 'Medium'
        }

    def get_level_number(self) -> int:
        """Vigenère cipher is level 3."""
        return 3