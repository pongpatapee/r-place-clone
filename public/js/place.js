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

    function place_tile(x, y) {
        socket.emit("color", {
            col: x,
            row: y,
            color: (document.getElementById('color').value),
        });
        console.log(`Tile placed at ${x}, ${y}!`);
    }

    submitBtn.addEventListener('click', ()=> {
        let x = parseInt(document.getElementById('x-coord').value);
        let y = parseInt(document.getElementById('y-coord').value);

        place_tile(x, y);
    });
    canvas.addEventListener('click', (e)=>{
        let h = 10;
        let w = 10;
        
        let x = parseInt(e.offsetX / w);
        let y = parseInt(e.offsetY / h);
        place_tile(x + 1, y + 1);
    })
}