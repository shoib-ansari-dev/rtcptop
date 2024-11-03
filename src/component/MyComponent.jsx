// app/components/MyComponent.jsx
"use client"; // Important to specify this is a client component
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const MyComponent = () => {
    useEffect(() => {
        const socket = io("http://localhost:3000/api/route"); // Connect to the WebSocket server without specifying the path

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('message', (data) => {
            console.log('Received message:', data);
        });

        return () => {
            socket.disconnect(); // Clean up on unmount
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', 'Hello, world!');
    };

    return (
        <div>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default MyComponent;
