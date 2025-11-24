export interface CipherExplanation {
  briefIntro: string;
  detailedExplanation: string;
  historicalContext: string;
  difficulty: string;
  funFact: string;
}

const cipherData: Record<string, CipherExplanation> = {
  'Caesar Cipher': {
    briefIntro: 'A simple substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.',
    detailedExplanation: 'The Caesar cipher works by replacing each letter in the plaintext with a letter that is a fixed number of positions down the alphabet. For example, with a shift of 3, A would become D, B would become E, and so on. The cipher is named after Julius Caesar, who used it with a shift of 3 to protect messages of military significance.',
    historicalContext: 'Named after Julius Caesar who used it around 58 BCE for military communications. It was effective because most of Caesar\'s enemies were illiterate and couldn\'t read the messages even if they intercepted them.',
    difficulty: 'Easy - Can be broken by trying all 25 possible shifts (brute force attack).',
    funFact: 'The ROT13 cipher is a special case of Caesar cipher with a 13-position shift. Applying it twice returns the original text!'
  },
  'Monoalphabetic Cipher': {
    briefIntro: 'A substitution cipher that uses a fixed mapping of each letter to another letter throughout the message.',
    detailedExplanation: 'Unlike the Caesar cipher which uses a simple shift, a monoalphabetic cipher uses a completely random substitution for each letter. The key consists of the 26 letters of the alphabet in a specific order, representing which plaintext letter maps to each ciphertext letter. For example, A might map to Q, B to X, C to M, and so on.',
    historicalContext: 'These ciphers have been used for centuries, with examples dating back to the Arabic world in the 9th century. They were commonly used in diplomatic and military communications before being broken by frequency analysis.',
    difficulty: 'Easy - Can be broken using frequency analysis, as common letters (E, T, A, O) reveal patterns.',
    funFact: 'The famous "Zodiac Killer" used a homophonic cipher (similar to monoalphabetic but with multiple symbols for each letter) in his unsolved encrypted messages.'
  },
  'Vigenère Cipher': {
    briefIntro: 'A polyalphabetic cipher that uses different Caesar shifts based on a repeating keyword.',
    detailedExplanation: 'The Vigenère cipher uses a keyword to determine the shift for each letter. Each letter of the keyword corresponds to a shift amount (A=0, B=1, C=2, etc.). The keyword is repeated as needed to match the message length. For example, with keyword "LEMON", the first letter is shifted by 11, second by 4, third by 12, and so on.',
    historicalContext: 'Invented by Giovan Battista Bellaso in 1553, but misattributed to Blaise de Vigenère in the 19th century. It was considered unbreakable for centuries until Charles Babbage broke it in the 1800s.',
    difficulty: 'Medium - Requires finding the keyword length first, then frequency analysis for each shift.',
    funFact: 'The cipher was called "le chiffré indéchiffrable" (the indecipherable cipher) for over 300 years!'
  },
  'Playfair Cipher': {
    briefIntro: 'A digraph substitution cipher that encrypts pairs of letters using a 5x5 key square.',
    detailedExplanation: 'The Playfair cipher encrypts two letters at a time using a 5x5 grid containing 25 letters (usually I and J are combined). Three rules apply: 1) If both letters are in the same row, replace them with letters to their right, 2) If in the same column, replace with letters below, 3) If in different rows and columns, replace with letters forming a rectangle.',
    historicalContext: 'Invented by Charles Wheatstone in 1854 and promoted by Lord Lyon Playfair. It was used by British forces in the Boer War and World War I for tactical communications.',
    difficulty: 'Medium - Much stronger than simple substitution but vulnerable to digraph frequency analysis.',
    funFact: 'The cipher was famously used by the fictional detective Sherlock Holmes in Arthur Conan Doyle\'s story "The Adventure of the Dancing Men".'
  },
  'Rail Fence Cipher': {
    briefIntro: 'A transposition cipher that writes the message in a zigzag pattern and reads off rows sequentially.',
    detailedExplanation: 'The rail fence cipher writes the plaintext in a zigzag pattern along a "rail fence" with a specified number of rails. For example, with 3 rails, "HELLO WORLD" would be written as: H . . . O . . . L . . . D, . E . L . W . R . D . , . . . L . . . O . . . L. The ciphertext is read by reading each row sequentially.',
    historicalContext: 'One of the simplest transposition ciphers, with origins dating back to ancient Greece. It was used during the American Civil War and by various resistance groups during World War II.',
    difficulty: 'Medium - Easy to understand but the number of rails adds complexity to cryptanalysis.',
    funFact: 'The cipher gets its name from the way the message resembles the pattern of a split-rail fence when written out.'
  },
  'Hill Cipher': {
    briefIntro: 'A polygraphic cipher that uses matrix multiplication to encrypt blocks of letters.',
    detailedExplanation: 'The Hill cipher uses linear algebra to encrypt blocks of letters. Each block is treated as a vector, multiplied by a key matrix (mod 26). For example, with a 2x2 matrix, letters are paired, converted to numbers (A=0, B=1), and transformed through matrix multiplication. Decryption requires the inverse of the key matrix.',
    historicalContext: 'Invented by Lester S. Hill in 1929, it was the first polygraphic cipher that allowed practical operation on more than three symbols at once. It was used by some military organizations but had limited use due to its complexity.',
    difficulty: 'Hard - Requires knowledge of linear algebra and is vulnerable to known-plaintext attacks.',
    funFact: 'Hill\'s patent application included the complete mathematical theory behind the cipher, making it one of the most mathematically rigorous ciphers of its time.'
  },
  'One-Time Pad': {
    briefIntro: 'The only theoretically unbreakable cipher, using a random key as long as the message.',
    detailedExplanation: 'A one-time pad uses a truly random key that is at least as long as the message and never reused. Each letter of the plaintext is combined with a letter from the key using modular addition. For example, if the plaintext letter is E (4) and the key letter is Q (16), the ciphertext letter is U (20), since 4 + 16 = 20 mod 26.',
    historicalContext: 'First described in 1882 by Frank Miller and reinvented in 1917 by Gilbert Vernam. It was famously used for the "hotline" between Washington and Moscow during the Cold War.',
    difficulty: 'Hard - Mathematically proven to be unbreakable if used correctly (random key, key secrecy, single use).',
    funFact: 'The "pad" in the name comes from the Soviet practice of printing keys on tear-off pads, with each page used only once and then destroyed.'
  },
  'DES Cipher': {
    briefIntro: 'A symmetric-key block cipher that operates on 64-bit blocks using a 56-bit key.',
    detailedExplanation: 'The Data Encryption Standard (DES) is a Feistel network cipher that applies 16 rounds of substitution and permutation operations to 64-bit blocks of data. Each round uses a different 48-bit subkey derived from the 56-bit main key through key scheduling. The algorithm includes initial and final permutations and the famous "DES S-boxes" for non-linear substitution.',
    historicalContext: 'Developed by IBM in the 1970s and adopted as a US federal standard in 1977. It was the most widely used encryption standard for over 20 years until being replaced by AES in 2001.',
    difficulty: 'Expert - The algorithm is public, but brute force requires trying 2^56 possible keys.',
    funFact: 'DES was controversial because some suspected the NSA had weakened it. Declassified documents later revealed the NSA actually strengthened it against differential cryptanalysis attacks!'
  },
  'RSA Cipher': {
    briefIntro: 'An asymmetric encryption algorithm using public and private keys based on prime factorization.',
    detailedExplanation: 'RSA (Rivest-Shamir-Adleman) uses two keys: a public key for encryption and a private key for decryption. Keys are generated by selecting two large prime numbers, computing their product (n), and choosing encryption/decryption exponents. Encryption uses the formula: ciphertext = plaintext^e mod n. Decryption uses: plaintext = ciphertext^d mod n, where d is the modular inverse of e.',
    historicalContext: 'Invented in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman at MIT. It revolutionized cryptography by enabling secure communication without exchanging secret keys beforehand.',
    difficulty: 'Expert - Security relies on the difficulty of factoring the product of two large prime numbers.',
    funFact: 'The inventors created RSA after failing to create a one-way function for the "MIT public-key project." They first demonstrated it by encrypting and decrypting the message "THE MAGIC WORDS ARE SQUEAMISH OSSIFRAGE."'
  }
};

export function getCipherExplanation(cipherName: string): CipherExplanation | null {
  return cipherData[cipherName] || null;
}

export function getAllCipherExplanations(): Record<string, CipherExplanation> {
  return { ...cipherData };
}