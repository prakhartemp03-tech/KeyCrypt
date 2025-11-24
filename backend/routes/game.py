import time
import uuid
from flask import Blueprint, request, jsonify
from services.word_service import WordService
from services.cipher_service import CipherService
from services.validation_service import ValidationService

game_bp = Blueprint('game', __name__)

# In-memory storage for game sessions (use Redis in production)
game_sessions = {}

def store_game_data(session_id: str, level: int, actual_word: str, cipher_name: str):
    """Store game data in session."""
    game_sessions[session_id] = {
        'level': level,
        'actual_word': actual_word,
        'cipher_name': cipher_name,
        'timestamp': time.time(),
        'attempts': 0
    }

def get_game_data(session_id: str):
    """Get game data from session."""
    return game_sessions.get(session_id)

def cleanup_old_sessions():
    """Remove old sessions (older than 30 minutes)."""
    current_time = time.time()
    expired_sessions = [
        session_id for session_id, data in game_sessions.items()
        if current_time - data['timestamp'] > 1800  # 30 minutes
    ]
    for session_id in expired_sessions:
        del game_sessions[session_id]

@game_bp.route('/generate', methods=['GET'])
def generate_puzzle():
    """Generate a new encrypted word puzzle."""
    try:
        level = int(request.args.get('level', 1))
        cleanup_old_sessions()

        # Fetch a 5-letter word
        word = WordService.fetch_5_letter_word()

        # Encrypt the word using the appropriate cipher
        cipher_service = CipherService()
        encrypted_word, cipher_name, hints = cipher_service.encrypt_word(word, level)

        # Generate a unique session ID
        session_id = str(uuid.uuid4())

        # Store game data
        store_game_data(session_id, level, word, cipher_name)

        response = {
            'session_id': session_id,
            'cipher': cipher_name,
            'encrypted_word': encrypted_word,
            'level': level,
            'hint1': hints[0],
            'hint2': hints[1],
            'hint3': hints[2]
        }

        return jsonify(response)

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error generating puzzle: {e}")
        return jsonify({'error': 'Failed to generate puzzle'}), 500

@game_bp.route('/validate', methods=['POST'])
def validate_guess():
    """Validate a user's guess."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        guess = data.get('guess', '').upper().strip()
        session_id = data.get('session_id')

        if not guess or not session_id:
            return jsonify({'error': 'Guess and session_id are required'}), 400

        if len(guess) != 5:
            return jsonify({'error': 'Guess must be exactly 5 letters'}), 400

        # Get game data
        game_data = get_game_data(session_id)
        if not game_data:
            return jsonify({'error': 'No active game found. Please start a new game.'}), 404

        # Validate the guess
        validation_service = ValidationService()
        feedback, is_correct = validation_service.validate_guess(guess, game_data['actual_word'])

        # Update attempts count
        game_data['attempts'] += 1
        game_data['timestamp'] = time.time()  # Update timestamp for session timeout

        response = {
            'result': feedback,
            'correct': is_correct,
            'attempts': game_data['attempts'],
            'max_attempts': 6
        }

        # If game is over, remove the session
        if is_correct or game_data['attempts'] >= 6:
            response['game_over'] = True
            response['actual_word'] = game_data['actual_word']
            del game_sessions[session_id]

        return jsonify(response)

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        print(f"Error validating guess: {e}")
        return jsonify({'error': 'Failed to validate guess'}), 500

@game_bp.route('/levels', methods=['GET'])
def get_levels():
    """Get information about all available cipher levels."""
    try:
        cipher_service = CipherService()
        levels = cipher_service.get_all_levels_info()
        return jsonify({'levels': levels})
    except Exception as e:
        print(f"Error getting levels: {e}")
        return jsonify({'error': 'Failed to get levels'}), 500

@game_bp.route('/game-status', methods=['GET'])
def get_game_status():
    """Get the status of an active game."""
    try:
        session_id = request.args.get('session_id')
        if not session_id:
            return jsonify({'error': 'session_id is required'}), 400

        game_data = get_game_data(session_id)
        if not game_data:
            return jsonify({'error': 'No active game found'}), 404

        return jsonify({
            'level': game_data['level'],
            'cipher_name': game_data['cipher_name'],
            'attempts': game_data['attempts'],
            'max_attempts': 6
        })

    except Exception as e:
        print(f"Error getting game status: {e}")
        return jsonify({'error': 'Failed to get game status'}), 500