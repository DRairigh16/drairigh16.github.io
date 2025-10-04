export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "ship");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.road = 0;
        this.setY(this.height/2+115);
        this.initAnimations();
        this.anims.play("play");
        this.initItems();
        this.initScore();
        this.power_ups = {"magnet": false, "repel": false, "multiply": 1};
        this.pow_times = {"magnet": null, "repel": null, "multiply": null};
    }
    initAnimations(){
        this.anims.create({
            key: "play",
            frames:  [{key: "ship", frame: 0}, {key: "ship", frame: 1}, {key: "ship", frame: 2}, {key: "ship", frame: 3}, {key: "ship", frame: 1}],
            frameRate: 10,
            repeat: -1
        })
        /*this.anims.create({
            key: "slide",
            frames: [{key: "ship", frame: 3}],
            frameRate: 1
        })
        this.anims.create({
            key: "jump",
            frames: [{key: "ship", frame: 4}],
            frameRate: 1
        })*/
    }
    initItems(){
        this.item_dic = {"scale": {"type": "add-Score", "tone":1, "theory":2, "rythm": 0, "dynamics":0, "lungs":1, "posture": 0},
                        "long tone": {"type": "add-Score", "tone":3, "theory":0, "rythm": 0, "dynamics":1, "lungs":2, "posture": 1},
                        "rythm exercise": {"type": "add-Score", "tone":0, "theory":1, "rythm": 3, "dynamics":0, "lungs":1, "posture": 0},
                        "band": {"type": "magnet-Power"},
                        "private lesson": {"type": "repel-Power"},
                        "practice": {"type": "add-Score", "tone":1, "theory":0, "rythm": 3, "dynamics":3, "lungs":0, "posture": 2},
                        "concert": {"type": "multiply-Power"},
                        "forget practice": {"type": "deduct-Score", "tone":5, "theory":1, "rythm": 5, "dynamics":5, "lungs":0, "posture": 0},
                        "slouch": {"type": "deduct-Score", "tone":2, "theory":0, "rythm": 0, "dynamics":1, "lungs":2, "posture": 3},
                        "skip band": {"type": "flip-Power"},
                        };
    }
    initScore(){
       this.score = {"tone":0, "theory":0, "rythm": 0, "dynamics":0, "lungs":0, "posture": 0} 
       this.adder = {"tone":0, "theory":0, "rythm": 0, "dynamics":0, "lungs":0, "posture": 0} 
    }
    moveUp(scene){
        if (this.road > 0 && this.y == this.height/2+115+this.road*(this.height+10)){
            this.road -= 1;
            this.setVelocityY(-2*(this.height+10));
            this.scene.time.delayedCall(500, ()=>{this.setVelocityY(0); this.setY(this.height/2+115+this.road*(this.height+10))})
        }
    }
    moveDown(scene){
        if (this.road < 4 && this.y == this.height/2+115+this.road*(this.height+10)){
            this.road += 1;
            this.setVelocityY((this.height+10)*2);
            this.scene.time.delayedCall(500, ()=>{this.setVelocityY(0); this.setY(this.height/2+115+this.road*(this.height+10))})
        }
    }
    
    jump(){
        
    }
    fallBack(dis){
        this.setX(this.x-dis);
    }
    collectItem(player, item){
            let dic = this.item_dic[item.texture.key];
            let typ = dic["type"].split("-");
            if (typ[1] == "Score"){
                if (typ[0] == "add"){
                    this.score.tone += dic.tone*this.power_ups.multiply;
                    this.score.theory += dic.theory*this.power_ups.multiply;
                    this.score.rythm += dic.rythm*this.power_ups.multiply;
                    this.score.dynamics += dic.dynamics*this.power_ups.multiply;
                    this.score.lungs += dic.lungs*this.power_ups.multiply;
                    this.score.posture += dic.posture*this.power_ups.multiply;
                }
                if (typ[0] == "deduct"){
                    this.score.tone -= dic.tone;
                    this.score.theory -= dic.theory;
                    this.score.rythm -= dic.rythm;
                    this.score.dynamics -= dic.dynamics;
                    this.score.lungs -= dic.lungs;
                    this.score.posture -= dic.posture;
                }
                if (typ[0] == "mul"){
                    this.score.tone *= dic.tone;
                    this.score.theory *= dic.theory;
                    this.score.rythm *= dic.rythm;
                    this.score.dynamics *= dic.dynamics;
                    this.score.lungs *= dic.lungs;
                    this.score.posture *= dic.posture;
                }
                if (typ[0] == "div"){
                    this.score.tone /= dic.tone;
                    this.score.theory /= dic.theory;
                    this.score.rythm /= dic.rythm;
                    this.score.dynamics /= dic.dynamics;
                    this.score.lungs /= dic.lungs;
                    this.score.posture /= dic.posture;
                }
            }
            if (typ[1] == "Power"){
                this.collectPowerup(typ[0]);
            }
            this.score.tone = Phaser.Math.RoundTo(this.score.tone);
            if (this.score.tone<0){this.score.tone = 0;}

            this.score.rythm = Phaser.Math.RoundTo(this.score.rythm);
            if (this.score.rythm<0){this.score.rythm = 0;}

            this.score.dynamics = Phaser.Math.RoundTo(this.score.dynamics);
            if (this.score.dynamics<0){this.score.dynamics = 0;}

            this.score.theory = Phaser.Math.RoundTo(this.score.theory);
            if (this.score.theory<0){this.score.theory = 0;}

            this.score.posture = Phaser.Math.RoundTo(this.score.posture);
            if (this.score.posture<0){this.score.posture = 0;}

            this.score.lungs = Phaser.Math.RoundTo(this.score.lungs);
            if (this.score.lungs<0){this.score.lungs = 0;}
    }
    collectPowerup(powerup){
        //Lasting effect
        const lasting = ["magnet", "repel", "multiply"]
        lasting.forEach((v)=>{
            if (v == powerup){
                if (this.pow_times[powerup] != null){
                    this.pow_times[powerup].remove();
                    this.pow_times[powerup] = null;
                }
                if (powerup == "multiply"){
                    this.power_ups.multiply = 2;
                    this.pow_times[powerup] = this.scene.time.delayedCall(20000, ()=>{this.power_ups[powerup] = 1});
                    return true;
                }else{
                    this.power_ups[powerup] = true;
                    this.pow_times[powerup] = this.scene.time.delayedCall(20000, ()=>{this.power_ups[powerup] = false});
                    return true;
                }
            }})
        //Instant effect
        const instant = ["flip"]
        instant.forEach((v)=>{
            if (v == powerup){
                if (powerup == "flip"){
                    this.scene.items.children.getArray().forEach((c)=>{
                        if (this.scene.good_coins.includes(c.texture.key)){
                            c.setTexture(this.scene.bad_coins[Phaser.Math.Between(0, this.scene.bad_coins.length-1)]);
                        }})}
            }}
        )
    }

}
