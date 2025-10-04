import {Person} from "./../gameObjects/Person.js"
export class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }
    preload(){
        this.load.image("Background", "assets/Game/staff.png");
        this.load.spritesheet("player", "assets/Game/player.png", {frameWidth: 110, frameHeight: 96});
        //this.load.audio("song", "assets/Game/player.png", {loop: true}); .m4a does not work
    }
    create() {
        this.add.image(600, 350, "Background");
        this.add.text(280, 190, "You did not get into ETSBOA.\nBetter luck next time!", {fontSize: "64px", fontFamily: "cursive", fill: "goldenrod"});
        this.person = new Person(this, 400, 400, "player");
        this.person.setTint(0xff0000)
        this.person.backAndForth(5)
    }
    update() {
        // your update code here
    }
}