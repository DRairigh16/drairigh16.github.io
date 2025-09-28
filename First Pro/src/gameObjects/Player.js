export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "dude");
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        this.initAnimations();
        this.power_ups = {"bounce": false, "speed": 1, "shield": false, "magnet": false, "fly": 1}
        this.pow_img = this.scene.add.group();
        this.pow_mask = this.createBitmapMask();
        this.pow_mask.invertAlpha = true;
    }

    initAnimations(){
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }

    moveLeft(){
        this.setVelocityX(-200*this.power_ups.speed);
        this.anims.play("left", true);
    }

    moveRight(){
        this.setVelocityX(200*this.power_ups.speed);
        this.anims.play("right", true);
    }

    idle(){
        this.setVelocityX(0);
        this.anims.play("turn");
    }

    jump(){
        if (this.body.blocked.down || this.power_ups.fly > 1){
            this.setVelocityY(-500/this.power_ups.fly);
        }
    }
    updatePow(){
        this.pow_img.getChildren().forEach((sprite)=>{
            if (sprite.mask != this.pow_mask){
                sprite.setMask(this.pow_mask);
            }
            sprite.setX(this.x);
            sprite.setY(this.y);
        })
    }
    getPowerUp(powerup){
        ["bounce", "speed", "shield", "magnet", "fly"].forEach((value)=>{
            if (value==powerup){
                this.pow_img.create(this.x, this.y, powerup);
                var child = this.pow_img.children.getArray().slice(-1)[0];
                if (powerup == "speed" || powerup == "fly"){
                    this.power_ups[powerup] = 2;
                    this.scene.time.delayedCall(20000, (child)=>{this.power_ups[powerup] = 1; child.destroy();}, [child]);
                }
                else if(powerup != "shield"){
                    this.power_ups[powerup] = true;
                    this.scene.time.delayedCall(20000, (child)=>{this.power_ups[powerup] = false; child.destroy();}, [child]);
                }
                else{
                    this.power_ups[powerup] = true;
                    this.shield = this.pow_img.children.getArray().slice(-1)[0];}
        }})
    }
}
