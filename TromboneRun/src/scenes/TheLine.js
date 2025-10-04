import {Person} from "./../gameObjects/Person.js"
export class TheLine extends Phaser.Scene{
    constructor(){
        super("TheLine");
    }
    preload(){
        this.load.spritesheet("person", "assets/End/person.png", {frameHeight: 96, frameWidth: 110})
        this.load.spritesheet("player", "assets/Game/player.png", {frameHeight: 96, frameWidth: 110})
        this.load.image("judges", "assets/End/judges.png");
        this.load.image("room", "assets/End/room.png");
        
        this.load.spritesheet("check", "assets/End/check.png", {frameWidth: 50, frameHeight: 80})
        this.load.spritesheet("X", "assets/End/X.png", {frameWidth: 50, frameHeight: 80})

        this.load.audio("jaws", "assets/End/Jaws Theme.mp3");
        this.load.audio("mscale", "assets/End/scale.mp3");

    }
    create() {
        this.add.image(600, 350, "room");
        this.add.image(900, 150, "judges");

        this.line = [1, 2, 3, 4].map((v)=>{return new Person(this, 120*v+55, 642, "person")});
        this.player = new Person(this, 55, 642, "player");
        this.went = true
        this.time.delayedCall(1000, ()=>{this.audition(); this.sound.stopAll();this.sound.play("jaws", {loop: true})});
    }
    audition(){
        this.aud = this.line.splice(-1)[0];
        this.aud.toChair(880);
        this.line.forEach((value)=>{value.walk();})
        this.player.walk();
        this.time.delayedCall(10000, ()=>{
            let text = ["X", "check",][(Phaser.Math.Between(1, 100) > 50)+1-1]
            let c = this.physics.add.staticSprite(this.aud.x, this.aud.y, text);
            c.anims.create({key: text, frames: this.anims.generateFrameNumbers(text, {start: 0, end: {"check": 3, "X": 4}[text]})});
            c.anims.play(text);
            this.time.delayedCall(3000, ()=>{
                this.aud.setVelocityY({"check": -200, "X": 200}[text]);
                c.destroy();
                this.time.delayedCall(1000, ()=>{this.aud.destroy(); if(this.line.length>0){this.audition()}else{this.playerForward();}})
                })
        })
    }
    playerForward(){
        this.sound.stopAll();
        this.player.toChair(880);
        this.time.delayedCall(10000, ()=>{
            this.sound.stopAll();
            this.scene.start("Clipboard");
        })
    }
    update(time) {
        //if (time > 1000 && this.went){this.audition(); this.went=false;}
    }
}