export class Person extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.initAnimations();
        this.bnf = false
        this.times = 0
        this.forw = ()=>{
            if (this.times > 0 && this.bnf){
                this.anims.play("aplay", true);
                this.setX(380);
                this.setFlipX(false);
                this.setVelocityX(200);
                this.scene.time.delayedCall(2100, ()=>{
                    this.backw()
                })
            }
        }
        this.backw = ()=>{
            if (this.times > 0 && this.bnf){
                this.setX(820);
                this.setFlipX(true);
                this.setVelocityX(-200);
                this.times -= 1
                this.scene.time.delayedCall(2100, ()=>{
                    if (this.times == 0){
                        this.setX(380);
                        this.setVelocityX(0);
                        this.setFlipX(false);
                        this.anims.stop();
                        this.scene.scene.start("Home")
                    }
                    this.forw()
                })
            }
        }
    }
    initAnimations(){
        let t = this.texture.key
        this.anims.create({
            key: "aplay",
            frames: [{key: t, frame: 0}, {key: t, frame: 1}, {key: t, frame: 2}, {key: t, frame: 3}, {key: t, frame: 1}],
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "asit",
            frames: [{key: t, frame: 4}],
            frameRate: 1,
            repeat: -1
        })
    }
    walk(){
        this.setVelocityX(this.width/2);
        this.anims.play("aplay", true);
        this.scene.time.delayedCall(2000, ()=>{this.setVelocityX(0); this.anims.stop()});
    }
    toChair(chair_x){
        this.setVelocityX(200);
        this.anims.play("aplay", true);

        this.scene.time.delayedCall((chair_x-this.x)*5, ()=>{this.setVelocityX(0);this.setX(chair_x); this.setY(this.y-15); this.anims.play("asit"); this.scene.sound.play("mscale")});
    }
    backAndForth(times){
        if (this.times == 0){
            this.bnf = true;
            this.times = times;
            this.forw();
        }else{
            console.warn("Tried to run back and forth when already doing so.")
        }
    }
}