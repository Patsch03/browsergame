var canvas = document.querySelector('canvas'); // grabs the canvas object so you can manipulate it 
const c = canvas.getContext('2d') // research

canvas.width = 1000;
canvas.height = 700;

c.fillRect(0, 0, canvas.width, canvas.height); // draws canvas


const gravity = .2; // gravity constant applied to velocity of players



//player object 
class player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity; // speed that player moves in any given directon
        this.height = 150 
    }

    draw(){ // function in player class that displays it on screen
        c.fillStyle = 'red' // color of player
        c.fillRect(this.position.x, this.position.y, 50, this.height) // actual player model rectangle
    }

    update(){ // applied on animation frames. Redraws the player in a different position 
        this.draw()
        this.position.y += this.velocity.y; // changing the y position based on velocity
        
        if(this.position.y + this.height > canvas.height){ // checks to see if player is hitting edge of screen
            this.velocity.y = 0; // stops player from moving
        }else{
            this.velocity.y += gravity // speeding up velocity 
        }
    }
}

const player1 = new player({ // creating new player
    position: {
        x: 250,
        y: 250,
    },
    velocity: {
        x: 0,
        y: 0,
    }
    
})

player1.draw() // displays the player created above

const enemy1 = new player({ // creating player
    position: {
        x: 700,
        y: 250,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

enemy1.draw() // displays player above

function animate(){
    window.requestAnimationFrame(animate); // makes a function that calls itself and will run infinitely 
    c.fillStyle = 'black' // sets background color
    c.fillRect(0, 0, canvas.width, canvas.height); // redraws background
    player1.update(); // calls update function which currently changes their position based on velocity 
    enemy1.update(); // ^^
    
}
animate() // runs infinite loop above