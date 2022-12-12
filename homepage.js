var canvas = document.querySelector('canvas'); // grabs the canvas object so you can manipulate it 
const c = canvas.getContext('2d') // research
let time = 60;
document.querySelector('#timer').innerHTML = time;

canvas.width = 1000;
canvas.height = 700;

c.fillRect(0, 0, canvas.width, canvas.height); // draws canvas



const gravity = .2; // gravity constant applied to velocity of players
// const airRes = 1



//player object 
class player {
    constructor({position, velocity, color, offset}){
        this.position = position
        this.velocity = velocity; // speed that player moves in any given directon
        this.width = 50
        this.height = 150 
        this.facing = " ";
        this.lastKey; // last key pressed in relation to the entity being referenced
        this.attackBox = { // attack 
            position: {
                x: this.position.x, 
                y: this.position.y,
            },
            width: 100,
            height: 50,
            offset,
        }
        this.color = color
        this.isAttacking = false;
        this.health = 100;
        this.blocking = false;
        this.blockTimer = 0;

    }

    draw(){ // function in player class that displays it on screen
        c.fillStyle = this.color // color of player
        c.fillRect(this.position.x, this.position.y, this.width, this.height); // actual player model rectangle

        // attack box drawing 
        if(this.isAttacking && this.facing == "left"){ // draws when player is attacking
            c.fillStyle = "blue";
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, (this.attackBox.width - (this.attackBox.width + this.attackBox.width) + this.width), this.attackBox.height);
        }else if(this.isAttacking && this.facing == "right"){
            c.fillStyle = "blue";
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }

        if(this.blocking){
            c.fillStyle = 'purple';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

    }

    update(){ // applied on animation frames. Redraws the player in a different position 
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x // sets position based on player model
        this.attackBox.position.y = this.position.y
        this.position.y += this.velocity.y; // changing the y position based on velocity
        this.position.x += this.velocity.x;
        
        if(this.position.y + this.height  + this.velocity.y > canvas.height){ // checks to see if player is hitting edge of screen
            this.velocity.y = this.velocity.y * 0 ; // stops player from moving
        }else{
            this.velocity.y += gravity // speeding up velocity 
        }

    }

    attack(){ // attack function that sets attack to true for a duration
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 200)
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
    },
    offset: {
        x: 0,
        y: 0,
    },
    color: "red"
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
    },
    offset: { // where attackbox spawns based on offset
        x: 0,
        y: 0,
    },
    color: 'green'
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
    },

}


function leftRectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x - 50 <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.x > rectangle2.position.x
        && rectangle1.attackBox.position.x + rectangle1.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.isAttacking
    )
}


function rightRectangularCollision({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.isAttacking
    )

    /*
        left hit detection
        left side of attack box is < right side of player model AND right side of attack box is > left side of other player model
        top of attack box < other player model height AND bottom of attack box is > whwer player model is drawn
    */

    
    /* 
        right hit detection
        right side of attack box is > left side of other player model AND left side of attack box is < right side of other player model 
        top of attack box < other player model height AND bottom of attack box is > whwer player model is drawn
    */
    
}


function runTimer(num){ // timer tick down
    setTimeout(() =>{
        time = document.querySelector('#timer').innerHTML = num - 1;
    }, 1000);
}

function displayEnd(){ // shows game over messages
    document.querySelector('#game_over_message').style.opacity = 100;
    document.querySelector('#game_over').style.opacity = 100;
    document.querySelector('#game_over_message_winner').style.opacity = 100;
    document.querySelector('#game_over_winner').style.opacity = 100;

}

function checkWin(){ // sees if anyone wins and sets the winning message based on who wins
    if(player1.health <= 0 && enemy1.health > 0){
        document.querySelector('#game_over_message_winner').innerHTML = "Enemy Wins";
        return true;
    }else if(enemy1.health <= 0 && player1.health > 0){
        document.querySelector('#game_over_message_winner').innerHTML = "Player Wins";
        return true;
    }
}

function animate(){
    if(checkWin() || time <= 0){ // if game is won, console log game is over and stops the animation loop
        if(time == 0){
            document.querySelector('#game_over_message_winner').innerHTML = "Time ran out no winner!"; // sets game winning message to draw, out of time
        }
        displayEnd(); // shows game over message
    }else{
        runTimer(time);
        window.requestAnimationFrame(animate); // makes a function that calls itself and will run infinitely 
    }

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


    //collision detection 

    if(player1.facing == "left"){
        if(leftRectangularCollision({
            rectangle1: player1,
            rectangle2: enemy1
        }) && player1.isAttacking && enemy1.blocking == false){
            player1.isAttacking = false;
            enemy1.health = enemy1.health -20;
            document.querySelector('#enemyHealth').style.width = enemy1.health + '%';
        }
    }

    if(player1.facing == "right"){
        if(rightRectangularCollision({
            rectangle1: player1,
            rectangle2: enemy1
        }) && player1.isAttacking && enemy1.blocking == false){
            player1.isAttacking = false;
            enemy1.health = enemy1.health -20;
            document.querySelector('#enemyHealth').style.width = enemy1.health + '%';
        }
    }

    if(enemy1.facing == "left"){
        if(leftRectangularCollision({
            rectangle1: enemy1,
            rectangle2: player1
        }) && enemy1.isAttacking && player1.blocking == false){
            enemy1.isAttacking = false;
            player1.health = player1.health -20;
            document.querySelector('#playerHealth').style.width = player1.health + '%';
        }
    }
    
    if(enemy1.facing == "right"){
        if(rightRectangularCollision({
            rectangle1: enemy1,
            rectangle2: player1
        }) && enemy1.isAttacking && player1.blocking == false){
            enemy1.isAttacking = false;
            player1.health = player1.health -20;
            document.querySelector('#playerHealth').style.width = player1.health + '%';
        }
    }
}



window.addEventListener("keydown", (event) => { // adds event listener to window to see what key is pressed 
    // event returns the "Keyboard event " that occured which includes the name of the key IE "d" or "a" etc.

    // switch statement to see what key is pressed

    switch(event.key){
        case 'd':
            keys.d.pressed = true; // sets the pressed value to true (doesnt change until key is let go )
            player1.lastKey = 'd';
            player1.facing = "right";
            break;

        case 'a':
            keys.a.pressed = true;
            player1.lastKey = 'a'; // sets the lastKey property equal to the last key pressed
            player1.facing = "left";
            break;

        case 'w':
            if(player1.position.y < 551 && player1.position.y > 550){ // checks if player is on the ground (or really close to it)
                player1.velocity.y = -10;
            }
            break;
        
        case ' ':
            player1.attack();
            break;
        case 'j':
            enemy1.attack();
            break;
        case 'v':
            enemy1.blocking = true;
            break;
        case 'b':
            player1.blocking = true;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy1.lastKey = 'ArrowRight';
            enemy1.facing = "right"
            break;

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy1.lastKey = 'ArrowLeft';
            enemy1.facing = "left";
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
        case 'b':
            player1.blocking = false;
            break;
        case 'v':
            enemy1.blocking = false;
    
    }

})

function reset(){
    time = 60;
    document.querySelector('#timer').innerHTML = 60;
    player1.health = 100;
    enemy1.health = 100;    


    document.querySelector('#playerHealth').style.width = 100 + "%";
    document.querySelector('#enemyHealth').style.width = 100 + '%';
    document.querySelector('#game_over').style.opacity = 0;
    document.querySelector('#game_over_message_winner').style.opacity = 0;
    document.querySelector('#game_over_winner').style.opacity = 0;
    if(document.querySelector('#game_over_message').style.opacity == 100){
        document.querySelector('#game_over_message').style.opacity = 0;
        animate();
    }
    



    enemy1.position.x = 700;
    enemy1.position.y = 250;
    enemy1.velocity.x = 0;
    enemy1.velocity.y = 0;

    player1.position.x = 250;
    player1.position.y = 250;
    player1.velocity.x = 0;
    player1.velocity.y = 0;

    console.log("reset")
}


animate(); // runs infinite loop to animate screen