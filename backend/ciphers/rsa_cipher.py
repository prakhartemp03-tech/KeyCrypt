import random
import math
from .base_cipher import BaseCipher

class RSACipher(BaseCipher):
    """RSA cipher demonstration with small primes for educational purposes."""

    def __init__(self):
        # Use small primes for demonstration (real RSA would use much larger primes)
        self.p, self.q = self._generate_primes()
        self.n = self.p * self.q
        phi_n = (self.p - 1) * (self.q - 1)

        # Choose small public exponent e
        self.e = 65537 if phi_n > 65537 else 3
        # Ensure e and phi_n are coprime
        while math.gcd(self.e, phi_n) != 1:
            self.e += 2

        # Calculate private exponent d
        self.d = self._mod_inverse(self.e, phi_n)

    def _generate_primes(self):
        """Generate two small prime numbers for demonstration."""
        small_primes = [61, 53, 59, 47, 43, 41, 37, 31, 29, 23]
        return random.sample(small_primes, 2)

    def _mod_inverse(self, a, m):
        """Calculate modular inverse using extended Euclidean algorithm."""
        def egcd(a, b):
            if a == 0:
                return b, 0, 1
            else:
                g, y, x = egcd(b % a, a)
                return g, x - (b // a) * y, x

        g, x, y = egcd(a, m)
        if g != 1:
            return None
        else:
            return x % m

    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using RSA cipher."""
        # Convert to uppercase and remove non-letters
        plaintext = ''.join(c.upper() for c in plaintext if c.isalpha())

        encrypted = ""

        for char in plaintext:
            # Convert letter to number (A=0, B=1, ..., Z=25)
            m = ord(char) - ord('A')

            # RSA encryption: c = m^e mod n
            c = pow(m, self.e, self.n)

            # Convert result back to a letter for display
            # Use modulo 26 to ensure it's a letter
            display_val = c % 26
            encrypted += chr(display_val + ord('A'))

        return encrypted

    def get_hints(self) -> tuple[str, str, str]:
        """Get progressive hints for RSA cipher."""
        hint1 = "This is RSA, an asymmetric public-key cipher"
        hint2 = f"Public key: (n={self.n}, e={self.e})"
        hint3 = f"Private key uses primes p={self.p} and q={self.q}"

        return (hint1, hint2, hint3)

    def get_level_info(self) -> dict:
        """Get level information for RSA cipher."""
        return {
            'name': 'RSA Cipher',
            'description': 'Asymmetric cipher using prime factorization and modular exponentiation',
            'difficulty': 'Expert'
        }

    def get_level_number(self) -> int:
        """RSA cipher is level 9."""
        return 9