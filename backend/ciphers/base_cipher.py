from abc import ABC, abstractmethod

class BaseCipher(ABC):
    """Abstract base class for all cipher implementations."""

    @abstractmethod
    def encrypt(self, plaintext: str) -> str:
        """
        Encrypt the given plaintext.

        Args:
            plaintext: The text to encrypt (will be uppercase letters only)

        Returns:
            The encrypted text (uppercase letters)
        """
        pass

    @abstractmethod
    def get_hints(self) -> tuple[str, str, str]:
        """
        Get three progressive hints for this cipher instance.

        Returns:
            Tuple of (hint1, hint2, hint3) where:
            - hint1: General hint about the cipher type
            - hint2: More specific hint about the key/parameters
            - hint3: Very specific hint that might give away the solution
        """
        pass

    @abstractmethod
    def get_level_info(self) -> dict:
        """
        Get information about this cipher level.

        Returns:
            Dictionary with 'name', 'description', and 'difficulty' keys
        """
        pass

    @abstractmethod
    def get_level_number(self) -> int:
        """
        Get the level number for this cipher (1-9).

        Returns:
            Integer level number
        """
        pass