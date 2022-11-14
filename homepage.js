var canvas = document.querySelector('canvas');
const c = canvas.getContext('2d') // research

canvas.width = 1000;
canvas.height = 700;

c.fillRect(0, 0, canvas.width, canvas.height);


const gravity = .2;
class player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity;
        this.height = 150
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update(){
        this.draw()
        this.velocity.y += gravity
        this.position.y += this.velocity.y;
        
        if(this.position.y + this.height > canvas.height){
            this.velocity.y = 0;
        }
    }
}

const player1 = new player({
    position: {
        x: 250,
        y: 250,
    },
    velocity: {
        x: 0,
        y: 0,
    }
    
})

player1.draw()

const enemy1 = new player({
    position: {
        x: 700,
        y: 250,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

enemy1.draw()

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'    
    c.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    enemy1.update();
    
}
animate()