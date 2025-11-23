import numpy as np
from ..utils.math_utils import generate_invertible_matrix
from .base_cipher import BaseCipher

class HillCipher(BaseCipher):
    """Hill cipher implementation with 2x2 matrix."""

    def __init__(self):
        self.matrix_size = 2
        self.key_matrix = generate_invertible_matrix(self.matrix_size)

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using Hill cipher."""
        # Convert to uppercase and remove non-letters
        plaintext = ''.join(c.upper() for c in plaintext if c.isalpha())

        # Pad with X if necessary
        while len(plaintext) % self.matrix_size != 0:
            plaintext += 'X'

        encrypted = ""

        # Process in blocks
        for i in range(0, len(plaintext), self.matrix_size):
            block = plaintext[i:i+self.matrix_size]

            # Convert to numbers
            numbers = [ord(c) - ord('A') for c in block]

            # Multiply by key matrix
            result = np.dot(self.key_matrix, numbers) % 26

            # Convert back to letters
            for num in result:
                encrypted += chr(int(num) + ord('A'))

        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for Hill cipher."""
        hint1 = "This is a Hill cipher using matrix multiplication"

        # Calculate determinant
        det = int(round(np.linalg.det(self.key_matrix))) % 26
        hint2 = f"The key matrix has determinant {det} (mod 26)"

        # Reveal the key matrix
        matrix_str = " ".join(str(self.key_matrix.flatten()[i]) for i in range(4))
        hint3 = f"The key matrix is [[{self.key_matrix[0][0]}, {self.key_matrix[0][1]}], [{self.key_matrix[1][0]}, {self.key_matrix[1][1]}]]"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for Hill cipher."""
        return {
            'name': 'Hill Cipher',
            'description': 'Polygraphic substitution cipher using linear algebra and matrix multiplication',
            'difficulty': 'Hard'
        }

    def get_level_number(self) -> int:
        """Hill cipher is level 6."""
        return 6