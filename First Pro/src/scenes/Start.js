import {Player} from "./../gameObjects/Player.js"
export class Boom extends Phaser.Scene {


    constructor() {
        super('Boom');
        this.highScore = 0;
    }

    preload ()
    {
        this.load.image('sky', 'assets/assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio("theme", "assets/perplex-park.mp3");

        this.load.image("bounce", "assets/powerups/bounce.png");
        this.load.image("speed", "assets/powerups/speed.png");
        this.load.image("shield", "assets/powerups/shield.png");
        this.load.image("magnet", "assets/powerups/magnet.png");
        this.load.image("fly", "assets/powerups/fly.png");
    }

    create ()
    {
        this.add.image(400, 300, 'sky');


        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = new Player(this, 100, 515);

        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.stars = this.physics.add.group({key: "star", repeat: 11, setXY: {x: 12, y: 0, stepX: 70}});

        this.stars.children.iterate(child =>{
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.stars, this.player, this.collectStar, null, this);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: "#000"});

        this.bombs = this.physics.add.group();

        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.sound.play("theme", {loop: true})
          }

    update ()
    {
        if (this.cursors.left.isDown){
            this.player.moveLeft()
        }
        else if (this.cursors.right.isDown){
            this.player.moveRight()
        }
        else {
            this.player.idle()
        }

        if (this.cursors.up.isDown){
            this.player.jump()
        }
        if (this.cursors.space.isDown && this.player.power_ups.bounce){
            //this.releaseBomb();
            this.player.setBounceY(1.1)
        }else{
            this.player.setBounceY(0.2)
        }
        if (this.player.power_ups.magnet){
            this.stars.children.getArray().forEach((star)=>{
                if (Math.round(Math.sqrt(Math.abs(star.x-this.player.x)**2+Math.abs(star.y-this.player.y)**2)) < 100 && star.active){
                    this.collectStar(this.player, star);
                }
            })
        }
        this.player.updatePow();
       }
    collectStar(player, star){
        star.disableBody(true, true);
        
        this.score += 10;
        if (this.score > this.highScore){
            this.highScore = this.score;
        }
        if(this.score%180 == 0){
            this.player.getPowerUp(["bounce", "speed", "shield", "magnet", "fly"][Phaser.Math.Between(0, 4)]);
        }
        this.scoreText.setText("Score: "+this.score.toString()+"\nHigh Score: "+this.highScore);

        if (this.stars.countActive(true)===0){
            this.stars.children.iterate(child=>{
                child.enableBody(true, child.x, 0, true, true);
            });
        
        this.releaseBomb();
        }
    }
    hitBomb(player, bomb){
        if (this.player.power_ups.shield){
            this.player.power_ups.shield = false;
            this.player.shield.destroy();
        }else{
            this.physics.pause();
            player.setTint(0xff0000);
            player.anims.play("turn");
            this.time.delayedCall(2000, ()=>{this.sound.stopAll();this.scene.start("Game Over");});
        }
    }
    releaseBomb(){
        var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0,400);

        var bomb = this.bombs.create(x, 16, "bomb");
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

    }
}
