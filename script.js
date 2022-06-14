const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 576;

const platformSrc = 'assets/platform.png'
const hillsSrc = 'assets/hills.png'
const backgroundSrc = 'assets/background.png'
const platformSmallTallSrc = 'assets/platformSmallTall.png'

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT

const playerImage = new Image();
playerImage.src = 'assets/PngItem_3575839-rem.png';
const spriteWidth = 343;
const spriteHeight = 300;
let frameX = 0;
//não é necessário frame y nem navegar pelo y, visto ser constituido por uma unica row
let gameFrame = 0;
const staggerFrames = 4;
const gravity = 0.5;

class Player {
    constructor(){
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 171 / 2
        this.height = 75

        this.image = playerImage
        this.frames = 0
    }

    draw(){
        ctx.drawImage(this.image, 343 * this.frames, 0, 343, 300, this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        if(gameFrame%staggerFrames == 0){
            if(this.frames<8) this.frames ++;
             else this.frames=0;
        }
        /*if(this.frames<9) this.frames ++;
            else this.frames=0;*/
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y <= CANVAS_HEIGHT)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor({x, y, image}){
        this.position = {
            x: x,
            y: y
        }

        this.image = image

        this.width = image.width
        this.height = image.height
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({x, y, image}){
        this.position = {
            x: x,
            y: y
        }

        this.image = image

        this.width = image.width
        this.height = image.height
    }

    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(src){
    const image = new Image()
    image.src = src
    return image
}

let platformImage = createImage(platformSrc)
let platformSmallTallImage = createImage(platformSmallTallSrc)

let player = new Player()
let platforms = []
let genericObjects = []

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0;

function init(){
    player = new Player()
    platforms = [
        new Platform({x: platformImage.width * 4 + 300 + 100 - 2 + platformImage.width - platformSmallTallImage.width, y: 270, image: platformSmallTallImage}),
        new Platform({x: -1, y: 470, image: platformImage}),
        new Platform({x: platformImage.width - 3, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 2 + 100 + 100, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 3 + 300 + 100, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 4 + 300 + 100 - 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 5 + 1000 + 20- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 6 + 1000 + 300- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 9 + 1500 + 50- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 11 + 1750 + 75- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 12 + 2100 + 100- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 14 + 2400 + 100- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 15 + 2500 + 100- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 18 + 2800 + 100- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 20 + 3000 + 100- 2, y: 470, image: platformImage}),
        new Platform({x: platformImage.width * 15 + 2200 + 100- 2, y: 345, image: platformImage})

    ]
    genericObjects = [
        new GenericObject({x: -1, y: -1, image: createImage(backgroundSrc)}),
        new GenericObject({x: -1, y: -1, image: createImage(hillsSrc)})
    ]

    scrollOffset = 0;
    
}

function animate(){
    /*ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //ctx.drawimage(image, sx, sy, sw, sh, dx, dy, dw, dh); 
    ctx.drawImage(playerImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0,
         spriteWidth, spriteHeight);

    if(gameFrame%staggerFrames ==0){
       if(frameX<9) frameX ++;
        else frameX=0;
    }*/

    gameFrame++;
    requestAnimationFrame(animate);
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    if(gameFrame % staggerFrames == 0){
        if(frameX < 9)frameX ++;
        else frameX = 0
    }
    
    genericObjects.forEach((genericObject) => {
        genericObject.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)){
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed){
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x -= player.speed * 0.66
            })
            
        } else if (keys.left.pressed && scrollOffset > 0){
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
                genericObject.position.x += player.speed * 0.66
            })
            
        }
    }

    // player platform collision
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y 
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x  <= platform.position.x + platform.width){
                player.velocity.y = 0
        }
    })

    // win condition
    if (scrollOffset > platformImage.width * 20 + 700 - 2){
        window.alert('You win')
    }

    // lose condition
    if (player.position.y > CANVAS_HEIGHT){
        init()
    }
};

init();
animate();             

window.addEventListener('keydown', ({key}) => {
    console.log(key)
    switch (key){
        case 'ArrowLeft':
            console.log('left')
            keys.left.pressed = true
            break
        case 'ArrowRight':
            console.log('right')
            keys.right.pressed = true
            break
        case 'ArrowUp':
            console.log('up')
            player.velocity.y -= 15
            break
        case 'ArrowDown':
            console.log('down')
            break
    }
})

window.addEventListener('keyup', ({key}) => {
    console.log(key)
    switch (key){
        case 'ArrowLeft':
            console.log('left')
            keys.left.pressed = false
            break
        case 'ArrowRight':
            console.log('right')
            keys.right.pressed = false
            break
        case 'ArrowUp':
            console.log('up')
            break
        case 'ArrowDown':
            console.log('down')
            break
    }
})