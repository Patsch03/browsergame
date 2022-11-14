var canvas = document.querySelector('canvas');

canvas.width = 1000;
canvas.height = 700;

const c = canvas.getContext('2d') // research

class player {
    constructor(position){
        this.position = position
    }

    draw(){

    }
}

const player = new player({
    x: 250,
    y: 250,
})