import numpy as np
import random

def modinv(a, m):
    """Find modular inverse of a modulo m."""
    g, x, y = egcd(a, m)
    if g != 1:
        return None  # modular inverse doesn't exist
    else:
        return x % m

def egcd(a, b):
    """Extended Euclidean Algorithm."""
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def generate_invertible_matrix(size=2):
    """Generate a random invertible matrix modulo 26."""
    while True:
        # Generate random matrix
        matrix = np.random.randint(0, 26, (size, size))

        # Check if determinant has modular inverse
        det = int(round(np.linalg.det(matrix))) % 26
        if modinv(det, 26) is not None:
            return matrix

def matrix_mod_inv(matrix, modulus):
    """Find the modular inverse of a matrix."""
    det = int(round(np.linalg.det(matrix))) % modulus
    det_inv = modinv(det, modulus)

    if det_inv is None:
        return None

    matrix_inv = np.linalg.inv(matrix)
    adjugate = matrix_inv * np.linalg.det(matrix)

    # Apply modular arithmetic to each element
    result = (adjugate * det_inv) % modulus
    return result.astype(int)