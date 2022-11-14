var canvas = document.querySelector('canvas');
const c = canvas.getContext('2d') // research

canvas.width = 1000;
canvas.height = 700;

c.fillRect(0, 0, canvas.width, canvas.height);


class player {
    constructor(position){
        this.position = position
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
}

const player1 = new player({
    x: 250,
    y: 250,
})

player1.draw()

console.log("newest")