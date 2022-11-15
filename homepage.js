var canvas = document.querySelector('canvas'); // grabs the canvas object so you can manipulate it 
const c = canvas.getContext('2d') // research

canvas.width = 1000;
canvas.height = 700;

c.fillRect(0, 0, canvas.width, canvas.height); // draws canvas


const gravity = .2; // gravity constant applied to velocity of players
// const airRes = 1



//player object 
class player {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity; // speed that player moves in any given directon
        this.height = 150 
        this.lastKey; // last key pressed in relation to the entity being referenced
    }

    draw(){ // function in player class that displays it on screen
        c.fillStyle = 'red' // color of player
        c.fillRect(this.position.x, this.position.y, 50, this.height) // actual player model rectangle
    }

    update(){ // applied on animation frames. Redraws the player in a different position 
        this.draw()
        this.position.y += this.velocity.y; // changing the y position based on velocity
        this.position.x += this.velocity.x;
        
        if(this.position.y + this.height  + this.velocity.y > canvas.height){ // checks to see if player is hitting edge of screen
            this.velocity.y = this.velocity.y * 0 ; // stops player from moving
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



// object that has objects as properties and those objects (IE a, d, w, etc) have a boolesn property and it stores if they are pressed or not
const keys = {
    a:{
        pressed: false,
    },
    d:{
        pressed: false,
    },
    w:{
        pressed: false,
    },
    ArrowUp:{
        pressed: false,
    },
    ArrowLeft:{
        pressed: false,
    },
    ArrowRight:{
        pressed: false,
    }
}


function animate(){
    window.requestAnimationFrame(animate); // makes a function that calls itself and will run infinitely 
    c.fillStyle = 'black' // sets background color
    c.fillRect(0, 0, canvas.width, canvas.height); // redraws background
    player1.update(); // calls update function which currently changes their position based on velocity 
    enemy1.update(); // ^^


    player1.velocity.x = 0; // sets player velocity at 0 constantly unless key is being pushed
    if(keys.a.pressed && player1.lastKey === 'a'){ // if key a is pressed and the last key that was pressed
        player1.velocity.x = -1; // moves left
    }else if(keys.d.pressed && player1.lastKey === 'd'){ // if key d is pressed and the last key that was pressed
        player1.velocity.x = 1; // moves right 
    }


    // same logic as above for other entity 
    enemy1.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy1.lastKey === 'ArrowLeft'){
        enemy1.velocity.x = -1
    }else if(keys.ArrowRight.pressed && enemy1.lastKey === 'ArrowRight'){
        enemy1.velocity.x = 1;
    }
    
}



window.addEventListener("keydown", (event) => { // adds event listener to window to see what key is pressed 
    // event returns the "Keyboard event " that occured which includes the name of the key IE "d" or "a" etc.

    // switch statement to see what key is pressed

    switch(event.key){
        case 'd':
            keys.d.pressed = true; // sets the pressed value to true (doesnt change until key is let go )
            player1.lastKey = 'd';
            break;

        case 'a':
            keys.a.pressed = true;
            player1.lastKey = 'a'; // sets the lastKey property equal to the last key pressed
            break;

        case 'w':
            if(player1.position.y < 551 && player1.position.y > 550){ // checks if player is on the ground (or really close to it)
                player1.velocity.y = -10;
            }
            break;


        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy1.lastKey = 'ArrowRight';
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy1.lastKey = 'ArrowLeft';
            break;

        case 'ArrowUp':
            if(enemy1.position.y < 551 && enemy1.position.y > 550){
                enemy1.velocity.y = -10;
            }
            break
    }

})


// adds event listener to see when a key is let go of 
window.addEventListener("keyup", (event) => {
    // logs keyboard event of a key being let go of 
    switch(event.key){ // event has property of key this is equal to the char value of key pressed
        case 'd': // if its the key d 
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false; // sets pressed value of key to pressed 
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    
    }

})

animate(); // runs infinite loop to animate screen