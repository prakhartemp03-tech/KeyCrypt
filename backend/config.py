import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    CORS_ORIGINS = os.environ.get('FLASK_CORS_ORIGINS', 'http://localhost:3000').split(',')
    WORD_API_URL = os.environ.get('WORD_API_URL', 'https://random-word-api.herokuapp.com/word?length=5')

    # Game session timeout in seconds (30 minutes)
    GAME_SESSION_TIMEOUT = 1800