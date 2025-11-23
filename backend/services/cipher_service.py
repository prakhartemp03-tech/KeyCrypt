from ciphers.caesar_cipher import CaesarCipher
from ciphers.monoalphabetic_cipher import MonoalphabeticCipher
from ciphers.vigenere_cipher import VigenereCipher
from ciphers.playfair_cipher import PlayfairCipher
from ciphers.rail_fence_cipher import RailFenceCipher
from ciphers.hill_cipher import HillCipher
from ciphers.otp_cipher import OneTimePadCipher
from ciphers.des_cipher import DESCipher
from ciphers.rsa_cipher import RSACipher

class CipherService:
    """Service for managing cipher instances and orchestrating encryption."""

    def __init__(self):
        self.cipher_classes = {
            1: CaesarCipher,
            2: MonoalphabeticCipher,
            3: VigenereCipher,
            4: PlayfairCipher,
            5: RailFenceCipher,
            6: HillCipher,
            7: OneTimePadCipher,
            8: DESCipher,
            9: RSACipher,
        }

    def get_cipher_for_level(self, level: int):
        """
        Get a cipher instance for the specified level.

        Args:
            level: The difficulty level (1-9)

        Returns:
            A cipher instance

        Raises:
            ValueError: If level is not supported
        """
        if level not in self.cipher_classes:
            raise ValueError(f"Unsupported level: {level}. Supported levels: {list(self.cipher_classes.keys())}")

        return self.cipher_classes[level]()

    def encrypt_word(self, plaintext: str, level: int) -> tuple:
        """
        Encrypt a word using the cipher for the specified level.

        Args:
            plaintext: The word to encrypt
            level: The difficulty level (1-9)

        Returns:
            Tuple of (encrypted_word, cipher_name, hints)

        Raises:
            ValueError: If level is not supported
        """
        cipher = self.get_cipher_for_level(level)
        encrypted_word = cipher.encrypt(plaintext)
        cipher_name = cipher.get_level_info()['name']
        hints = cipher.get_hints()

        return encrypted_word, cipher_name, hints

    def get_all_levels_info(self) -> list:
        """
        Get information about all available cipher levels.

        Returns:
            List of dictionaries containing level information
        """
        levels = []
        for level_num in sorted(self.cipher_classes.keys()):
            cipher = self.cipher_classes[level_num]()
            level_info = cipher.get_level_info()
            level_info['level'] = level_num
            levels.append(level_info)

        return levels