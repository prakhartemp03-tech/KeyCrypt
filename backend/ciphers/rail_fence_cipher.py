import random
from .base_cipher import BaseCipher

class RailFenceCipher(BaseCipher):
    """Rail Fence cipher implementation with random fence depth."""

    def __init__(self):
        # Random fence depth between 2 and 4
        self.fence_depth = random.randint(2, 4)

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using Rail Fence cipher."""
        # Convert to uppercase and remove non-letters
        plaintext = ''.join(c.upper() for c in plaintext if c.isalpha())

        if self.fence_depth == 1:
            return plaintext

        # Create the rails
        rails = [[] for _ in range(self.fence_depth)]
        rail_index = 0
        direction = 1  # 1 for down, -1 for up

        for char in plaintext:
            rails[rail_index].append(char)
            rail_index += direction

            # Change direction at top or bottom rail
            if rail_index == 0 or rail_index == self.fence_depth - 1:
                direction *= -1

        # Read rails row by row
        encrypted = ''.join(''.join(rail) for rail in rails)
        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for Rail Fence cipher."""
        hint1 = "This is a transposition cipher written in a zigzag pattern"
        hint2 = f"The fence depth is between 2 and 4 rails"
        hint3 = f"The fence depth is exactly {self.fence_depth} rails"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for Rail Fence cipher."""
        return {
            'name': 'Rail Fence Cipher',
            'description': 'Transposition cipher where letters are written in a zigzag pattern across multiple rails',
            'difficulty': 'Medium'
        }

    def get_level_number(self) -> int:
        """Rail Fence cipher is level 5."""
        return 5