import random
import string
from .base_cipher import BaseCipher

class OneTimePadCipher(BaseCipher):
    """One-Time Pad cipher implementation."""

    def __init__(self):
        # Generate a random key the same length as a typical word (5 letters)
        # In practice, this will be regenerated for each encryption
        self.key = ''.join(random.choice(string.ascii_uppercase) for _ in range(5))

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using One-Time Pad cipher."""
        # Convert to uppercase and remove non-letters
        plaintext = ''.join(c.upper() for c in plaintext if c.isalpha())

        # Generate key of same length as plaintext
        key = ''.join(random.choice(string.ascii_uppercase) for _ in range(len(plaintext)))
        self.key = key  # Store for hint generation

        encrypted = ""

        for i, char in enumerate(plaintext):
            # Convert both to numbers (A=0, B=1, etc.)
            plain_val = ord(char) - ord('A')
            key_val = ord(key[i]) - ord('A')

            # OTP encryption: (plaintext + key) mod 26
            cipher_val = (plain_val + key_val) % 26
            encrypted += chr(cipher_val + ord('A'))

        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for One-Time Pad cipher."""
        hint1 = "This is a One-Time Pad cipher, theoretically unbreakable"
        hint2 = "Each letter is encrypted with a different random key character"
        hint3 = f"The key starts with: {self.key[:3]}..."

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for One-Time Pad cipher."""
        return {
            'name': 'One-Time Pad',
            'description': 'Perfectly secure cipher using a random key as long as the message',
            'difficulty': 'Hard'
        }

    def get_level_number(self) -> int:
        """One-Time Pad cipher is level 7."""
        return 7