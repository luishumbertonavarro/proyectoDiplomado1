import { useState, useRef, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import TextareaAutosize from 'react-textarea-autosize';
import './ChatBox.css';
import axios from 'axios';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: '¿Cómo puedo ayudarte hoy?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions] = useState([
        "Estoy estresado",
        "Quiero hablar con alguien",
        "Necesito consejos",
        "Me siento solo"
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Scroll automático al final
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Autoenfocar al cargar
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        try {
            const res = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            if (!res.body) throw new Error('No response body from server');

            const reader = res.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let assistantResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                for (const char of chunk) {
                    assistantResponse += char;

                    await new Promise((resolve) => setTimeout(resolve, 10));

                    setMessages(prev => {
                        const updated = [...prev];
                        updated[updated.length - 1].content = assistantResponse;
                        return updated;
                    });
                }
            }

        } catch (err) {
            console.error('Error fetching chat response:', err);
            setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1].content = 'Lo siento, ocurrió un error al contactar al servidor.';
                return updated;
            });
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        inputRef.current?.focus();
    };

    return (
        <Container fluid className="d-flex flex-column vh-100 bg-dark text-light p-0" data-bs-theme="dark">
            <header className="p-3 border-bottom border-secondary text-center">
                <h1 className="h4 mb-0">🤖 Emotional Support Agent</h1>
            </header>

            <div className="chat-window">
                {messages.length === 1 && (
                    <div className="suggestions-container d-flex flex-wrap justify-content-center gap-2 p-3">
                        {suggestions.map((suggestion, index) => (
                            <Button key={index} variant="outline-light" onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div key={i} className={`d-flex mb-3 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`d-flex align-items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {msg.role === 'assistant' && (
                                <div className="avatar bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    🤖
                                </div>
                            )}
                            {msg.role === 'user' && (
                                <div className="avatar bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                    👤
                                </div>
                            )}
                            <div className={`p-3 rounded message-bubble ${msg.role === 'user' ? 'bg-primary' : 'bg-secondary'} text-white`}>
                                {msg.role === 'assistant' && loading && i === messages.length - 1 && !msg.content ? (
                                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-top border-secondary d-flex gap-2 align-items-end">
                <TextareaAutosize
                    ref={inputRef}
                    className="form-control"
                    placeholder="Escribe algo..."
                    minRows={1}
                    maxRows={5}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault(); // Previene salto de línea
                            handleSubmit(e);    // Llama a la función de enviar
                        }
                    }}
                    disabled={loading}
                    autoFocus
                />
                <Button variant="primary" type="submit" disabled={loading || !input.trim()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124L5.638 10.36 0.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Z" />
                    </svg>
                </Button>
            </form>
        </Container>
    );
};
