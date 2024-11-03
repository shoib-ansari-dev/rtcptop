import { Server } from 'socket.io';
import http from 'http';


const server = http.createServer();

// CORS options
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (msg) => {
        console.log(`Received message: ${msg}`);
        // Echo the message back to the client
        socket.emit('message', `Server received: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
server.listen(4000, () => {
    console.log('Socket.IO server is running on http://localhost:4000');
});
