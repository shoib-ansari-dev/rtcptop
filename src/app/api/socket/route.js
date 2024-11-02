import { Server } from 'socket.io';

let io

export function POST(req, res) {
    if (!res.socket.server.io) {
        console.log('Setting up Socket.io server...');
        io = new Server(res.socket.server);

        io.on('connection', (socket) => {
            console.log(`User connected: ${socket.id}`);

            socket.on('join', (roomId) => {
                socket.join(roomId);
                console.log(`User joined room: ${roomId}`);
            });

            socket.on('signal', (data) => {
                console.log(`Signal received for room ${data.roomId}`);
                io.to(data.roomId).emit('signal', data);
            });
        });

        res.socket.server.io = io;
    }
    res.end();
}
