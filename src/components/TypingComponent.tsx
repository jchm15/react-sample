import { useState, useEffect, FC } from 'react';
import axios from "axios";

const App: FC = () => {
    const [question, setQuestion] = useState('');
    const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
    const [typingAnswer, setTypingAnswer] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const TypingEffect: FC<{ text: string; typingSpeed?: number }> = ({ text, typingSpeed = 50 }) => {
        const [displayedText, setDisplayedText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);

        useEffect(() => {
            setDisplayedText('');
            setCurrentIndex(0);
        }, [text]);

        useEffect(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setDisplayedText((prev) => prev + text[currentIndex]);
                    setCurrentIndex((prev) => prev + 1);
                }, typingSpeed);

                return () => clearTimeout(timeout);
            }
        }, [currentIndex, text, typingSpeed]);

        return <p>{displayedText}</p>;
    };

    const handleAskQuestion = () => {
        if (!question.trim()) return;

        const newEntry = { question, answer: '' };
        setHistory((prev) => [...prev, newEntry]);
        setTypingAnswer('');
        setIsTyping(true);
        const entryIndex = history.length;

        axios.post('http://192.168.31.166:8000/open-ai/chat', { question })
            .then(response => {
                setTypingAnswer(response.data.data.data);
                setHistory((prev) =>
                    prev.map((entry, index) =>
                        index === entryIndex ? { ...entry, answer: response.data.data.data } : entry
                    )
                );
                setIsTyping(false);
                setQuestion('');
            })
            .catch(error => {
                console.error('오류 발생:', error);
                setIsTyping(false);
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>질문과 답변</h1>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="질문을 입력하세요"
                style={styles.input}
            />
            <button onClick={handleAskQuestion} style={styles.button}>
                질문하기
            </button>
            <div style={styles.answerBox}>
                {history.map((entry, index) => (
                    <div key={index} style={styles.historyItem}>
                        <p><strong>질문:</strong> {entry.question}</p>
                        {index === history.length - 1 && isTyping ? (
                            <TypingEffect text={typingAnswer} typingSpeed={50} />
                        ) : (
                            <p>{entry.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { textAlign: 'center', padding: '20px' },
    heading: { fontSize: '24px', marginBottom: '10px' },
    input: { padding: '10px', width: '300px', marginRight: '10px' },
    button: { padding: '10px 20px', cursor: 'pointer' },
    answerBox: { marginTop: '20px' },
    historyItem: { marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }
};

export default App;
