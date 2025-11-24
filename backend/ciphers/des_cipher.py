import random
import string
from Crypto.Cipher import DES
from Crypto.Util.Padding import pad
import base64
from .base_cipher import BaseCipher

class DESCipher(BaseCipher):
    """DES cipher demonstration for educational purposes."""

    def __init__(self):
        # Generate a random 8-byte DES key
        self.key = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8)).encode()

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using DES cipher."""
        # Convert to uppercase and ensure it's at least 8 characters
        plaintext = ''.join(c.upper() for c in plaintext if c.isalpha())

        # Pad or truncate to 8 characters
        if len(plaintext) < 8:
            plaintext += 'X' * (8 - len(plaintext))
        else:
            plaintext = plaintext[:8]

        # Convert to bytes
        plaintext_bytes = plaintext.encode()

        # Create DES cipher
        cipher = DES.new(self.key, DES.MODE_ECB)

        # Encrypt and encode as base64, then take first 5 letters for display
        encrypted_bytes = cipher.encrypt(pad(plaintext_bytes, DES.block_size))
        encrypted_b64 = base64.b64encode(encrypted_bytes).decode()

        # Convert to a 5-letter display format
        # Use the first 5 characters that are letters, or substitute with letters
        result = ""
        for char in encrypted_b64[:10]:  # Take first 10 chars to find 5 letters
            if char.isalpha():
                result += char.upper()
            else:
                # Map numbers to letters for display
                result += chr(ord('A') + (int(char) % 26) if char.isdigit() else 65)
            if len(result) >= 5:
                break

        return result[:5]

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for DES cipher."""
        hint1 = "This is DES (Data Encryption Standard), a block cipher"
        hint2 = "DES uses 64-bit blocks with a 56-bit effective key"
        hint3 = f"This demonstration uses ECB mode with 8-byte key blocks"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for DES cipher."""
        return {
            'name': 'DES Cipher',
            'description': 'Symmetric block cipher standard using 64-bit blocks and complex permutations',
            'difficulty': 'Expert'
        }

    def get_level_number(self) -> int:
        """DES cipher is level 8."""
        return 8