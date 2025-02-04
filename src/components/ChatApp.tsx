import React, { useState } from 'react';
import axios from 'axios';

interface ChatMessage {
    user: string;
    message: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [question, setQuestion] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSendMessage = async () => {
        if (question.trim() === '') return;

        // Add user's message to the chat
        setMessages([...messages, { user: 'User', message: question }]);
        setLoading(true);

        try {
            // Send the question to the API
            const response = await axios.post('http://192.168.31.166:8000/open-ai/chat', { question });
            const answer = response.data.data.data; // Assuming the API returns an answer property

            // Add bot's answer to the chat
            setMessages(prevMessages => [
                ...prevMessages,
                { user: 'Bot', message: answer }
            ]);
        } catch (error) {
            setMessages(prevMessages => [
                ...prevMessages,
                { user: 'Bot', message: 'Sorry, something went wrong.' }
            ]);
        } finally {
            setLoading(false);
            setQuestion('');
        }
    };

    return (
        <div style={{ maxWidth: '100%', maxHeight: '100%', margin: '0 auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2>Chat with Bot</h2>
                <div style={{ maxHeight: '400px', overflowY: 'scroll', marginBottom: '10px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <strong>{msg.user}:</strong>
                            <p>{msg.message}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question..."
                    style={{ width: '100%', padding: '10px' }}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    style={{
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Thinking...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ChatApp;
