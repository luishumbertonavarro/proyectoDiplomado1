🤖 Agente de Apoyo Emocional
Un agente conversacional diseñado para brindar apoyo emocional, desarrollado con:

Frontend: React + Bootstrap
Backend: Flask (Python)
Modelo de Lenguaje: DeepSeek-R1 ejecutándose localmente en un contenedor Docker con Ollama
🧠 ¿En qué consiste este proyecto?
Este asistente ofrece apoyo psicológico y emocional a través de una interfaz web intuitiva. Utiliza el modelo LLM DeepSeek-R1 para generar respuestas empáticas y humanas, ayudando a los usuarios a gestionar sus emociones.

📁 Estructura del proyecto
Code
emotional-support-agent/
├── frontend/               # Aplicación React
│   └── ...
├── backend/                # API Flask (app.py)
│   └── app.py
├── Dockerfile
├── README.txt
└── .gitignore
🚀 Requisitos
Docker
Ollama (para ejecutar el modelo DeepSeek-R1)
Asegúrate de tener Docker instalado. Luego, ejecuta Ollama con el siguiente comando:

bash
docker run -d --name ollama -p 11434:11434 -v ollama:/root/.ollama ollama/ollama
Para iniciar el modelo de lenguaje dentro del contenedor (o usando la API expuesta):

bash
ollama run deepseek-r1
La API estará disponible en http://localhost:11434

▶️ Cómo ejecutar el proyecto
Iniciar el backend
bash
cd backend
pip install -r requirements.txt
python app.py
El servidor Flask estará disponible en http://localhost:5000

Iniciar el frontend
bash
cd frontend
npm install
npm run dev
La aplicación React estará disponible en http://localhost:5173

💬 Personalización del asistente
Puedes modificar el comportamiento del asistente en backend/app.py, editando la variable system_message.
Ejemplo:

Python
system_message = (
    "Eres un asistente de apoyo emocional. "
    "Tu única función es proveer apoyo psicológico y bienestar emocional. "
    "No respondas preguntas fuera de ese dominio. "
    "Siempre responde de forma comprensiva y empática."
)
🧪 Ejemplo de interacción
Usuario: Me siento un poco estresado últimamente.
Asistente: <think>Analizando posibles causas emocionales y formas de ayudar</think>
Entiendo. El estrés puede ser difícil de manejar. ¿Hay algo específico que te preocupe o alguna situación reciente que te haya afectado?

🛑 Advertencia
Este asistente no sustituye el consejo profesional de un psicólogo o terapeuta. Es solo una herramienta tecnológica con fines educativos y experimentales.

📄 Licencia
Proyecto educativo desarrollado para el Diplomado en Inteligencia Artificial Generativa – Khipus.ai.

✨ Créditos
Desarrollado por Luis Humberto Navarro Ribeiro
Modelo: deepseek-r1 usando Ollama
