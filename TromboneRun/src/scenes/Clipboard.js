export class Clipboard extends Phaser.Scene{
    constructor(){
        super("Clipboard");
    }
    preload(){
        this.load.image("clipboard", "assets/End/clipboard.png");

        this.load.spritesheet("check", "assets/End/check.png", {frameWidth: 50, frameHeight: 80});
        this.load.spritesheet("X", "assets/End/X.png", {frameWidth: 50, frameHeight: 80});
    }
    create() {
        //this.registry.set("Player Score", {"tone": Phaser.Math.Between(720, 750), "rythm": Phaser.Math.Between(720, 750), "dynamics": Phaser.Math.Between(620, 650), "theory": Phaser.Math.Between(380, 410), "posture": Phaser.Math.Between(380, 410), "lungs": Phaser.Math.Between(480, 510)});
        this.add.image(10, 10, "check");
        console.log(this.registry.get("Player Score"))
        this.txt = this.add.text(400, 200, "Loading...", {fontSize: "64px", color: "beige"});
        this.dots = 3;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.down = false
        this.opps = []
        this.space_call = ()=>{
            if (this.opps.length < 6){
                if (this.dots == 3){this.dots = 1}
                else{this.dots += 1}
                this.txt.setText("Loading"+[".", "..", "..."][this.dots-1])
                this.opps.push(this.get_player());
                if (this.opps.length != 6){
                    this.time.delayedCall(Phaser.Math.Between(100, 500), ()=>{this.space_call();})}
                else{this.txt.setText(""); this.open(this.registry.get("Player Score"))}
            }
        }
        this.space_call();
    }
    get_player(){
        let great = {"tone": Phaser.Math.Between(720, 750), "rythm": Phaser.Math.Between(720, 750), "dynamics": Phaser.Math.Between(620, 650), "theory": Phaser.Math.Between(380, 410), "posture": Phaser.Math.Between(380, 410), "lungs": Phaser.Math.Between(480, 510)};
        let good = {"tone": Phaser.Math.Between(680, 720), "rythm": Phaser.Math.Between(700, 720), "dynamics": Phaser.Math.Between(550, 620), "theory": Phaser.Math.Between(300, 380), "posture": Phaser.Math.Between(300, 380), "lungs": Phaser.Math.Between(400, 480)};
        let med = {"tone": Phaser.Math.Between(500, 680), "rythm": Phaser.Math.Between(550, 700), "dynamics": Phaser.Math.Between(480, 550), "theory": Phaser.Math.Between(280, 300), "posture": Phaser.Math.Between(250, 300), "lungs": Phaser.Math.Between(380, 400)};
        let bad = {"tone": Phaser.Math.Between(400, 450), "rythm": Phaser.Math.Between(400, 550), "dynamics": Phaser.Math.Between(390, 480), "theory": Phaser.Math.Between(200, 280), "posture": Phaser.Math.Between(200, 250), "lungs": Phaser.Math.Between(300, 380)};
        let chance = [bad, med, med, good, good, good, great];
        let rtn = chance[Phaser.Math.Between(0, chance.length-1)];
        rtn["score"] = this.get_score(rtn);
        return rtn;
    }
    get_score(score){
        let max = {"tone": 800, "rythm": 800, "dynamics": 700, "theory": 460, "posture": 460, "lungs": 460};
        var temp_score = {"tone": score.tone+1-1, "rythm": score.rythm+1-1, "dynamics": score.dynamics+1-1, "theory": score.theory+1-1, "posture": score.posture+1-1, "lungs": score.lungs+1-1}
        //Keep score from exceeding max.
        if (temp_score.tone > max.tone){temp_score.tone = max.tone}
        if (temp_score.rythm > max.rythm){temp_score.rythm = max.rythm}
        if (temp_score.dynamics > max.dynamics){temp_score.dynamics = max.dynamics}
        if (temp_score.theory > max.theory){temp_score.theory = max.theory}
        if (temp_score.posture > max.posture){temp_score.posture = max.posture}
        if (temp_score.lungs > max.lungs){temp_score.lungs = max.lungs}

        let weight = {"rythm": 25, "tone": 20, "dynamics": 20, "theory": 15, "posture": 10, "lungs": 10};
        let rtn = {"tone": (temp_score["tone"]/max.tone)*weight.tone, "rythm": (temp_score["rythm"]/max.rythm)*weight.rythm, "dynamics": (temp_score["dynamics"]/max.dynamics)*weight.dynamics, "theory": (temp_score["theory"]/max.theory)*weight.theory, "posture": (temp_score["posture"]/max.posture)*weight.posture, "lungs": (temp_score["lungs"]/max.lungs)*weight.lungs};
        return rtn.tone+rtn.rythm+rtn.dynamics+rtn.theory+rtn.posture+rtn.lungs

    }
    open(ply_score){
        this.add.image(600, 350, "clipboard");
        let beat = this.opps.toSorted((a, b)=>a.score-b.score)[3];
        console.log(this.opps.toSorted((a, b)=>a.score-b.score));
        this.checked = {}
        let check = (section, y)=>{
            let cx = {true: "check", false: "X"}[ply_score[section] > beat[section]];
            this.checked[section] = ply_score[section] > beat[section]
            let img = this.add.sprite(765, y+60, cx);
            img.setScale(0.5, 0.5);
            img.anims.create({
                key: cx,
                frames: this.anims.generateFrameNumbers(cx, {start: 0, end: {"check": 3, "X": 4}[cx]}),
            });
            img.anims.play(cx);}
        this.time.delayedCall(2000, ()=>{check("tone", 100)});
        this.time.delayedCall(4000, ()=>{check("rythm", 200)});
        this.time.delayedCall(6000, ()=>{check("dynamics", 300)});
        this.time.delayedCall(8000, ()=>{check("theory", 400)});
        this.time.delayedCall(10000, ()=>{check("posture", 500)});
        this.time.delayedCall(12000, ()=>{check("lungs", 600)});
        this.time.delayedCall(13000, ()=>{this.endScene()});
    }
    gotIn(){
        return ((this.checked.tone+this.checked.rythm+this.checked.dynamics) > 1 && this.checked.lungs+this.checked.posture > 0 && this.checked.theory)
    }
    endScene(){
        this.sound.stopAll();
        this.registry.set("score", this.get_score(this.registry.get("Player Score")));
        let chair = this.opps.toSorted((a, b)=>a.score-b.score).map((v)=>v.score)
        console.log(chair)
        chair.forEach((v, i)=>{
            if (v < this.registry.get("score")){
                this.registry.set("chair", 6-i)
            }
        })
        this.scene.start({true: "WinGame", false: "GameOver"}[this.gotIn()])
    }
    update() {
    
    }
}