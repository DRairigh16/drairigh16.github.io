export class WinGame extends Phaser.Scene{
    constructor(){
        super("WinGame");
    }
    preload(){
        this.load.image("flag", "assets/Game/band.png");
        this.load.image("stand", "assets/Game/privateLesson.png");
        this.load.image("coin", "assets/Game/practice.png");
        this.load.image("background", "assets/Game/music.png");
    }
    create() {
        this.add.image(600, 350, "background");
        this.register();
        this.add.text(50, 50, "Your Score: "+Phaser.Math.RoundTo(this.score, -1)+"%", {fontSize: "32px", fill: ["#FF0000", "#10D32A", "#D3B000", "#FFD800"][Math.floor(this.score/25)], fontFamily: "fantasy"});
        this.add.text(1050, 50, ""+this.chair.toString()+["", "st", "nd", "rd"][this.chair]+" chair", {fontSize: "32px", fill: ["#FF0000", "#10D32A", "#D3B000", "#FFD800"][4-this.chair], fontFamily: "fantasy"});
        let coins = this.physics.add.group({
            key: "coin",
            repeat: 11,
            setXY: {x: 600, y:420},
        })
        this.time.delayedCall(2000, ()=>{
            coins.children.getArray().forEach((coin, index)=>{
                coin.setVelocityX((index-5)*20+Phaser.Math.Between(0, 20));
                coin.setVelocityY(-400-Phaser.Math.Between(-20, 20));
                coin.setGravityY(200)
            })
        })
        let flag = this.add.image(600, 350, "flag").setScale(1.5, 1.5);
        let img = this.add.image(660, 350, "stand").setScale(1.5, 1.5);
        let img2 = this.add.image(540, 350, "stand").setScale(1.5, 1.5);
        this.add.text(280, 190, "You Got Into ETSBOA!!!", {fontSize: "64px", fontFamily: "cursive", fill: "goldenrod"});
        this.m = this.input.mousePointer
    }
    register(){
        if (this.registry.get("score") == undefined){
            console.warn("WinGame could not find player score.")
            this.score = Phaser.Math.FloatBetween(0, 100);
        }else{
            this.score = this.registry.get("score");
        }
        if (this.registry.get("chair") == undefined){
            console.warn("WinGame could not find player chair.")
            this.chair = Phaser.Math.Between(1, 3);
        }else{
            this.chair = this.registry.get("chair");
        }
        if (this.registry.get("highScore") == undefined){
            console.warn("WinGame could not find high score.")
            this.highscore = Phaser.Math.FloatBetween(0, 100);
        }else{
            this.highscore = this.registry.get("highScore");
        }
    }
    update() {
        if (this.m.x < 630 && this.m.x > 570 && this.m.y < 410 && this.m.y > 290 && this.m.isDown){
            this.scene.start("Home");
        }
    }
}