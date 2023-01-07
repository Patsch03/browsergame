class Sprite {
    constructor({position, imageSrc}){
        this.position = position
        this.width = 50
        this.height = 150 
        this.image = new Image()
        this.image.src = imageSrc
    }
    
    draw(){ // function in player class that displays it on screen
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){ // applied on animation frames. Redraws the player in a different position 
        this.draw()
    }
}


class Fighter {
    constructor({position, velocity, color, offset, facing}){
        this.position = position
        this.velocity = velocity; // speed that player moves in any given directon
        this.width = 50
        this.height = 150 
        this.facing = facing;
        this.lastKey; // last key pressed in relation to the entity being referenced
        this.attackBox = { // attack //
            position: { // position 
                x: this.position.x, 
                y: this.position.y,
            },
            width: 100,
            height: 50,
            offset,
        }
        this.color = color // color
        this.isAttacking = false; // if entity is attacking or not
        this.health = 100; // health
        this.blocking = false; // if the entity is blocking
        this.blockTimer = 0; // stopping player from blocking all the time change this to block health
        this.kickBox = { 
            position: { // same as attack just lower on the player
                x: this.position.x, 
                y: this.position.y + (this.height - 50),
            },
            width: 100,
            height: 50,
            offset,
        }
        this.attackType = "";
        
    }



    draw(){ // function in player class that displays it on screen
        c.fillStyle = this.color // color of player
        c.fillRect(this.position.x, this.position.y, this.width, this.height); // actual player model rectangle

        if(this.isAttacking && this.facing == "right" && this.attackType == "kick"){
            c.fillStyle = "white";
            c.fillRect(this.kickBox.position.x, this.kickBox.position.y, this.kickBox.width, this.kickBox.height);
            console.log(this.color +  "right kick");
        }else if(this.isAttacking && this.facing == "left" && this.attackType == "kick"){
            c.fillStyle = "white";
            c.fillRect(this.kickBox.position.x, this.kickBox.position.y, (this.kickBox.width - (this.kickBox.width + this.kickBox.width) + this.width), this.kickBox.height);
            console.log(this.color +  "left kick");

        }
        if(this.isAttacking && this.facing == "left" && this.attackType == "punch"){ // draws when player is attacking
            c.fillStyle = "blue";
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, (this.attackBox.width - (this.attackBox.width + this.attackBox.width) + this.width), this.attackBox.height);
            console.log(this.color +  "left punch");
        }else if(this.isAttacking && this.facing == "right" && this.attackType == "punch"){
            c.fillStyle = "blue";
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
            console.log(this.color + "right punch");

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
        this.kickBox.position.x = this.position.x;
        this.kickBox.position.y = this.position.y + (this.height - 50);

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