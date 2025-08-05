# backend/ollama_client.py
import requests
import json
import logging
from flask import Response

logger = logging.getLogger(__name__)
OLLAMA_API_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "deepseek-r1:latest"


def stream_response_from_ollama(user_message: str) -> Response:
    prompt = (
        "You are an emotional support assistant. Your only job is to provide psychological and emotional well-being support."
        "Do not answer questions outside of that domain. If the user asks something unrelated (like math, code, or general trivia), kindly respond that you are trained only to provide emotional support."
        "Always respond in a caring, empathetic tone."
        "Use <think>...</think> to show internal reasoning before your answer."
        "Provide thoughtful emotional support and guidance.\n\n"
        f"User: {user_message}\nAssistant:"
    )

    try:
        response = requests.post(
            OLLAMA_API_URL,
            json={"model": MODEL_NAME, "prompt": prompt, "stream": True},
            stream=True,
            timeout=30
        )
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        logger.error(f"Ollama error: {str(e)}")
        return Response(f"Error connecting to Ollama: {str(e)}", status=500)

    def generate():
        for line in response.iter_lines():
            if line:
                try:
                    chunk_data = json.loads(line.decode('utf-8'))
                    if 'response' in chunk_data:
                        yield chunk_data['response']
                except json.JSONDecodeError:
                    continue

    return Response(generate(), mimetype='text/plain')
