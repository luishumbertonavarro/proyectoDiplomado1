🤖 Emotional Support Agent

Un agente conversacional para apoyo emocional, desarrollado con:

- Frontend: React + Bootstrap
- Backend: Flask (Python)
- Modelo de lenguaje: DeepSeek-R1 corriendo localmente en un contenedor Docker con Ollama

---

🧠 ¿Qué hace este proyecto?

Este asistente está diseñado para brindar apoyo psicológico y emocional a través de una interfaz web intuitiva. Utiliza un modelo LLM de última generación (DeepSeek-R1) adaptado mediante prompt engineering para ofrecer respuestas empáticas y seguras.

---

📁 Estructura del proyecto

emotional-support-agent/
├── frontend/               # React App
│   └── ...
├── backend/                # Flask API
│   └── app.py
│── Dockerfile
├── README.txt
└── .gitignore

---

🚀 Requisitos

🐋 Docker + Ollama

Necesitas tener Docker instalado. Luego puedes correr Ollama en un contenedor con el modelo deepseek-r1.

docker run -d   --name ollama   -p 11434:11434   -v ollama:/root/.ollama   ollama/ollama

Dentro del contenedor (o usando la API expuesta):
ollama run deepseek-r1

> Esto expone la API en http://localhost:11434

---

▶️ Cómo ejecutar el proyecto

1. Ejecutar el backend

cd backend
pip install -r requirements.txt
python app.py

Esto levantará un servidor Flask en http://localhost:5000

2. Ejecutar el frontend

cd frontend
npm install
npm run dev

Tu frontend estará disponible en: http://localhost:5173

---

💬 Personalización del agente

Puedes modificar el comportamiento del asistente en el backend (app.py), en la variable system_message.

Ejemplo:

system_message = (
    "You are an emotional support assistant. "
    "Your only job is to provide psychological and emotional well-being support. "
    "Do not answer questions outside of that domain. "
    "Always respond in a caring, empathetic tone."
)

---

🧪 Ejemplo de interacción

Usuario: Me siento un poco estresado últimamente.
Asistente: <think>Analizando posibles causas emocionales y formas de ayudar</think>
Entiendo. El estrés puede ser muy difícil de manejar. ¿Hay algo específico que te preocupa o una situación reciente que te ha afectado?

---

🛑 Advertencia

Este asistente no reemplaza el consejo profesional de un psicólogo o terapeuta. Es solo una herramienta tecnológica con fines educativos y experimentales.

---

📄 Licencia

Proyecto educativo desarrollado para el Diplomado en Inteligencia Artificial Generativa – Khipus.ai.

---

✨ Créditos

Desarrollado por Luis Humberto Navarro Ribeiro
Modelo: deepseek-r1 usando Ollama
