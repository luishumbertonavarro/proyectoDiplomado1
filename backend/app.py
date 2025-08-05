# backend/app.py
from flask import Flask, request
from flask_cors import CORS
import logging
from ollama_client import stream_response_from_ollama

app = Flask(__name__)
CORS(app)  # para permitir acceso desde tu frontend
logging.basicConfig(level=logging.INFO)


@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    return stream_response_from_ollama(user_message)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
