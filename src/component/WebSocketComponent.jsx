// components/WebSocketComponent.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const WebSocketComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIo = io('ws://localhost:4000');

        socketIo.on('connect', () => {
            console.log('Connected to Socket.IO server');
        });

        socketIo.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        socketIo.on('disconnect', () => {
            console.log('Disconnected from Socket.IO server');
        });

        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (socket && input) {
            socket.emit('message', input);
            setInput('');
        }
    };

    return (
        <div>
            <h1>Socket.IO Chat</h1>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h2>Messages:</h2>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
};

export default WebSocketComponent;
