var canvas = document.querySelector('canvas');
const c = canvas.getContext('2d') // research

canvas.width = 1000;
canvas.height = 700;

c.fillRect(0, 0, canvas.width, canvas.height);


class player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity;
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150)
    }
}

const player1 = new player({
    position: {
        x: 250,
        y: 250,
    },
    velocity: {
        x: 10,
        y: 10,
    }
    
})

player1.draw()

const enemy1 = new player({
    position: {
        x: 700,
        y: 250,
    },
    velocity: {
        x: 10,
        y: 10,
    }
})

enemy1.draw()

function animate(){
    window.requestAnimationFrame(animate);
    
}
animate()