const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width=600;
const CANVAS_HEIGHT = canvas.height=600;

const playerImage = new Image();
playerImage.src = 'assets/PngItem_3575839.png';
const spriteWidth = 343;
const spriteHeight = 300;
let frameX = 0;
//não é necessário frame y nem navegar pelo y, visto ser constituido por uma unica row
let gameFrame = 0;
const staggerFrames = 9;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.drawimage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    if(gameFrame % staggerFrames == 0){
        if(frameX < 8) frameX++;
        else frameX = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();
                      