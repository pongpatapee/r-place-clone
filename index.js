const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const CANVAS_ROWS = 50;
const CANVAS_COLS = 50;

let canvas = [];
for(let i = 0; i < CANVAS_ROWS; i++) {
    canvas[i] = [];
    for(let j = 0; j < CANVAS_COLS; j++) {
        canvas[i][j] = '#FFF';
    }
}

app.use(express.static('public'))
console.log('Server has started!');

io.on('connection', socket => {
    console.log('A new user has joined!');
    //on connection send the canvas to the client that just connected
    socket.emit('canvas', canvas);
    //when client send data for x, y, and color, store it in our "database" and emit the canvas back to every client in the serv
    socket.on('color', data => {
        canvas[data.row - 1][data.col - 1] = data.color;
        io.emit('canvas', canvas);
        console.log('User placed a tile!');
    });
});

server.listen(3000);