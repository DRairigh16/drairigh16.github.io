export class GameOver extends Phaser.Scene{
    constructor(){
        super("Game Over");
    }
    preload(){}
    create() {
        this.endText = this.add.text(100, 100, "            Game Over!\nPress Space to Restart", {fontSize: "64px", fontFamily: "fantasy", fill: "#120"});
        this.key = this.input.keyboard.createCursorKeys()
    }
    update() {
        if(this.key.space.isDown){
            this.scene.start("Boom")
        }
    }
}