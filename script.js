const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const playerImage = new Image();
playerImage.src = 'PngItem_3575839.png';

class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.width = 30
        this.height = 30
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
player.draw()

/*function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(playerImage, 0, 0);
    requestAnimationFrame(animate);
};
animate();
*/                     
