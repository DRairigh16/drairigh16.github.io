export class Home extends Phaser.Scene{
    constructor(){
        super("Home");
    }
    preload(){
        this.load.image("title", "assets/Intro/TitleScene.png");
        this.load.image("start", "assets/Intro/startBtn.png");
        this.load.image("instructions", "assets/Intro/instructionsBtn.png");
        this.load.audio("menu_theme", "assets/Intro/MenuTheme.mp3");
    }
    create() {
        this.add.image(600, 350, "title");
        this.sound.play("menu_theme");
        this.start = this.add.image(400, 600, "start");
        this.start.setInteractive().on('pointerdown', (pointer, localX, localY, event)=>{
            this.sound.stopAll();
            this.scene.start("Game")
        });
        this.instructions = this.add.image(800, 600, "instructions");
        this.instructions.setInteractive().on('pointerdown', (pointer, localX, localY, event)=>{
            this.scene.start("Instructions")
        });
    }
    update() {
        // your update code here
    }
}