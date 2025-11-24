# CryptoWordle 🎮🔐

A cryptographic Wordle game where players decrypt 5-letter words encrypted with various ciphers. Features progressive difficulty levels from classical ciphers (Caesar) to modern encryption (RSA), with Wordle-style feedback and an intelligent hint system.

## Features

- **9 Cipher Difficulty Levels**: From Caesar cipher to RSA encryption
- **Wordle-Style Gameplay**: 6 attempts to guess the decrypted word with color-coded feedback
- **Progressive Hint System**: Smart hints unlock after 2, 4, and 5 wrong attempts
- **Educational**: Learn about different encryption methods through gameplay
- **Modern Tech Stack**: Next.js 14 + TypeScript frontend, Flask + Python backend

## Cipher Levels

1. **Caesar Cipher** (Easy) - Simple letter shift
2. **Monoalphabetic Cipher** (Easy) - Fixed letter substitution
3. **Vigenère Cipher** (Medium) - Polygraphic cipher with keyword
4. **Playfair Cipher** (Medium) - Letter pair encryption
5. **Rail Fence Cipher** (Medium) - Transposition cipher
6. **Hill Cipher** (Hard) - Matrix-based encryption
7. **One-Time Pad** (Hard) - Theoretically unbreakable
8. **DES Cipher** (Expert) - Block cipher standard
9. **RSA Cipher** (Expert) - Asymmetric public-key encryption

## Quick Demo (Frontend Only)

The app includes a **demo mode** that works without any backend setup! Simply:

1. Navigate to the project root
2. Run `npm run dev`
3. Open `http://localhost:3000`
4. Play the demo version with sample encrypted words

The demo mode will automatically activate when the backend is not available, allowing you to test the full UI and gameplay flow.

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a Python virtual environment:
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask development server:
```bash
python app.py
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory (if not already there):
```bash
cd ..
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the Next.js development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## How to Play

1. **Select Difficulty**: Choose a cipher level from the main menu
2. **View Encrypted Word**: See the 5-letter encrypted word at the top
3. **Make Guesses**: Enter 5-letter words using the virtual or physical keyboard
4. **Receive Feedback**:
   - 🟩 Green: Correct letter in correct position
   - 🟨 Yellow: Correct letter in wrong position
   - ⬛ Gray: Letter not in the word
5. **Unlock Hints**: Hints become available after 2, 4, and 5 wrong attempts
6. **Win or Lose**: Guess correctly within 6 attempts to win!

## Technologies Used

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hooks** for state management

### Backend
- **Flask** web framework
- **Python 3** for cipher implementations
- **PyCryptodome** for modern ciphers (DES, RSA)
- **NumPy** for matrix operations (Hill cipher)
- **Flask-CORS** for cross-origin requests

### External APIs
- **Random Word API** for 5-letter word generation

## Educational Value

CryptoWordle teaches players about:
- Historical ciphers and their weaknesses
- Modern encryption principles
- Pattern recognition and frequency analysis
- Mathematical concepts in cryptography
- The importance of key management