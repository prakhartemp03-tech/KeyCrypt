from flask import Flask
from flask_cors import CORS
from routes.game import game_bp
from routes.health import health_bp
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])

    # Register blueprints
    app.register_blueprint(game_bp, url_prefix='/api')
    app.register_blueprint(health_bp, url_prefix='/api')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)