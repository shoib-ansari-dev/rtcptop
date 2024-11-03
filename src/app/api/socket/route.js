// app/api/socket/route.js
import { Server } from 'socket.io';

export async function GET(req) {
    // This handler is to ensure that the server has the io instance
    const res = new Response();
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        io.on('connection', (socket) => {
            console.log('New client connected');

            socket.on('message', (data) => {
                console.log('Message received:', data);
                socket.broadcast.emit('message', data);
            });
        });
        res.socket.server.io = io; // Attach the io instance to the server
    }
    return res; // Return a response
}
