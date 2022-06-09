const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const playerImage = new Image();
playerImage.src = 'assets/PngItem_3575839.png';
const spriteWidth = 343;
const spriteHeight = 300;
let frameX = 0;
//não é necessário frame y nem navegar pelo y, visto ser constituido por uma unica row
let gameFrame = 0;
const staggerFrames = 1;
const gravity = 0.5;

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= CANVAS_HEIGHT)
            this.velocity.y += gravity
        else
            this.velocity.y = 0
    }
}

const player = new Player()


function animate(){
    /*ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.drawimage(image, sx, sy, sw, sh, dx, dy, dw, dh); 
    ctx.drawImage(playerImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0,
         spriteWidth, spriteHeight);

    if(gameFrame%staggerFrames ==0){
       if(frameX<6) frameX ++;
        else frameX=0;
    }*/

    //gameFrame++;
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    player.update()
};
animate();                   