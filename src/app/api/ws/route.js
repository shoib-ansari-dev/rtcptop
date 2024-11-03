// pages/api/ws.js
import { Server } from 'ws';

let wss;

export default function handler(req, res) {
    if (req.method === 'GET') {
        if (!wss) {
            wss = new Server({ noServer: true });

            wss.on('connection', (ws) => {
                console.log('New client connected');

                ws.on('message', (message) => {
                    console.log(`Received: ${message}`);
                    ws.send(`Server: ${message}`);
                });

                ws.on('close', () => {
                    console.log('Client disconnected');
                });
            });

            res.socket.server.on('upgrade', (request, socket, head) => {
                wss.handleUpgrade(request, socket, head, (ws) => {
                    wss.emit('connection', ws, request);
                });
            });

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('WebSocket server is running');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('WebSocket server already running');
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
