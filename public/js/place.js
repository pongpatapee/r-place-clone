window.onload = function() {
    let socket = io();

    let canvas = document.getElementById('place');
    let ctx = canvas.getContext('2d');
    console.log(ctx);

    socket.on('canvas', canvasData => {
        canvasData.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                ctx.fillStyle = col;
                ctx.fillRect(colIndex * 10, rowIndex * 10, 10, 10);
            });
        });
    });

    submitBtn = document.getElementById('submit');

    function place_tile() {
        socket.emit("color", {
            col: parseInt(document.getElementById('x-coord').value),
            row: parseInt(document.getElementById('y-coord').value),
            color: (document.getElementById('color').value),
        });
        console.log('Tile placed!');
    }

    submitBtn.addEventListener('click', place_tile);
}