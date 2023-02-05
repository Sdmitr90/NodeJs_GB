#!/usr/bin/env node

import { Server } from 'socket.io';
import http  from 'http';
import path  from 'path';
import fs  from 'fs';

const host = "localhost";
const port = 3000;
const __dirname = process.cwd()
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        const indexPath = path.join(__dirname, 'index.html');
        const readStream = fs.createReadStream(indexPath);

        readStream.pipe(res);
    }
});

const io = new Server(server);

io.on('connection', client => {
    console.log('New client connected!');

    client.on('client-entered', message => {
        client.broadcast.emit('server-entered', message);
        client.emit('server-entered', message);
    });

    client.on('client-msg', data => {
        client.broadcast.emit('server-msg', data);
        client.emit('server-msg', data);
    });

    client.on('client-exit', name => {
        client.broadcast.emit('server-exit', name);
        client.emit('server-exit', name);
    });
});

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));
