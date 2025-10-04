import {Player} from "./../gameObjects/Player.js"
export class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('background', 'assets/Game/music.png');
        this.load.image('logo', 'assets/phaser.png');
        this.load.spritesheet('ship', 'assets/Game/player.png', { frameWidth: 110, frameHeight: 96 });
        //Items
        this.load.image("scale", "assets/Game/scale.png");
        this.load.image("band", "assets/Game/band.png");
        this.load.image("concert", "assets/Game/concert.png");
        this.load.image("forget practice", "assets/Game/forgetPractice.png");
        this.load.image("long tone", "assets/Game/longTone.png");
        this.load.image("practice", "assets/Game/practice.png");
        this.load.image("private lesson", "assets/Game/privateLesson.png");
        this.load.image("rythm exercise", "assets/Game/rythmExercise.png");
        this.load.image("skip band", "assets/Game/skipBand.png");
        this.load.image("slouch", "assets/Game/slouch.png");
        //Item formations
        this.init_formations();
        //Theme song
        this.load.audio("theme", "assets/perpetual-rhapsody.mp3");

    }
    init_formations(){
        var temp = {"G": [[0, 0], [40, 0]], "B": [], "GP": [["private lesson", 80, 4], ["band", 80, 4]], "BP": []}//{"G":good_coins[[x_pos, road]],
        //"B":bad_coins[[x_pos, road]], "GP": GoodPower-ups[[name, x_pos, road]], "BP": BadPower-ups[[name, x_pos, road]]}
        let fish = {'G': [[470.0, 2], [530.0, 1], [560.0, 1], [600.0, 1], [680.0, 0], [710.0, 0], [740.0, 0], [810.0, 1], [520.0, 3], [560.0, 3], [600.0, 3], [640.0, 4], [680.0, 4], [720.0, 4], [790.0, 3], [860.0, 2], [910.0, 1], [910.0, 4], [640.0, 1], [680.0, 1], [710.0, 1], [750.0, 1], [820.0, 2], [790.0, 2], [760.0, 2], [520.0, 2], [540.0, 2], [490.0, 2], [580.0, 2], [610.0, 2], [640.0, 2], [670.0, 2], [700.0, 2], [720.0, 2], [620.0, 3], [690.0, 3], [660.0, 3], [720.0, 3], [750.0, 3], [910.0, 2], [950.0, 1], [950.0, 4], [950.0, 2], [940.0, 0], [940.0, 4], [980.0, 0], [990.0, 4]], 'B': [[1110.0, 4], [1180.0, 2], [1030.0, 1], [1030.0, 0], [1040.0, 4], [990.0, 1], [1220.0, 2], [1160.0, 4]], 'GP': [], 'BP': [["skip band", 1300, 1]]}
        let trident = {'G': [[10.0, 1], [40.0, 1], [70.0, 1], [100.0, 1], [120.0, 1], [150.0, 1], [580.0, 1], [600.0, 1], [660.0, 1], [710.0, 1], [740.0, 1], [760.0, 1], [780.0, 1], [300.0, 2], [330.0, 2], [470.0, 3], [500.0, 3]], 'B': [[180.0, 1], [210.0, 1], [240.0, 1], [270.0, 1], [320.0, 0], [340.0, 0], [480.0, 0], [510.0, 0], [550.0, 1], [640.0, 1], [620.0, 1], [690.0, 1], [810.0, 1], [840.0, 1], [770.0, 0], [810.0, 0], [790.0, 0], [770.0, 2], [790.0, 2], [810.0, 2], [870.0, 1], [840.0, 0], [840.0, 2], [900.0, 1], [350.0, 1], [370.0, 1], [430.0, 1], [460.0, 1]], 'GP': [['private lesson', 410.0, 0], ['band', 400.0, 1]], 'BP': [['skip band', 400.0, 2]]}
        let n1 = {'G': [[20.0, 2], [20.0, 1], [70.0, 0], [80.0, 3], [60.0, 1], [60.0, 2], [100.0, 1], [100.0, 0], [100.0, 2], [100.0, 3], [130.0, 2], [130.0, 1], [130.0, 0], [130.0, 3], [150.0, 1], [160.0, 0], [150.0, 2], [150.0, 3], [180.0, 2], [210.0, 2], [240.0, 1], [240.0, 2], [270.0, 2], [270.0, 1], [300.0, 1], [270.0, 0], [290.0, 2], [110.0, 4], [140.0, 4]], 'B': [[180.0, 0], [180.0, 1], [210.0, 0], [240.0, 0], [180.0, 3], [210.0, 3], [240.0, 3], [210.0, 1], [340.0, 2], [320.0, 2], [300.0, 0], [340.0, 1]], 'GP': [], 'BP': [['skip band', 270.0, 3]]}
        let blink = {'G': [[20.0, 4], [120.0, 4], [230.0, 4], [350.0, 4]], 'B': [[60.0, 4], [170.0, 4], [290.0, 4], [420.0, 4]], 'GP': [['concert', 560.0, 4]], 'BP': [['skip band', 490.0, 4]]}
        let eric = [{'G': [[80.0, 2], [140.0, 1], [220.0, 0], [310.0, 0], [400.0, 1], [450.0, 2], [530.0, 3], [610.0, 4]], 'B': [[760.0, 3], [780.0, 2], [810.0, 1], [720.0, 4]], 'GP': [], 'BP': [['skip band', 280.0, 1], ['skip band', 280.0, 2]]}, {'G': [[240.0, 2], [300.0, 4], [240.0, 0], [280.0, 0], [330.0, 0], [380.0, 0], [430.0, 0], [490.0, 0], [540.0, 0], [580.0, 0], [420.0, 2], [460.0, 2], [500.0, 2], [530.0, 2], [580.0, 2], [620.0, 2], [650.0, 2], [260.0, 1], [300.0, 1], [350.0, 1], [390.0, 1], [460.0, 1], [500.0, 1], [540.0, 1], [580.0, 1], [340.0, 4], [370.0, 4], [420.0, 4], [470.0, 4], [280.0, 2], [320.0, 2], [360.0, 2], [390.0, 2], [870.0, 0], [880.0, 1], [880.0, 2]], 'B': [[780.0, 4], [870.0, 3]], 'GP': [], 'BP': [['skip band', 140.0, 2], ['skip band', 430.0, 1], ['skip band', 140.0, 0]]}, {'G': [[10.0, 0], [70.0, 0], [140.0, 1], [200.0, 2], [280.0, 3], [400.0, 3], [470.0, 2], [550.0, 1], [610.0, 0]], 'B': [[510.0, 0], [150.0, 0], [200.0, 0], [250.0, 0], [470.0, 0], [420.0, 0], [180.0, 1], [230.0, 1], [270.0, 1], [500.0, 1], [460.0, 1], [410.0, 1], [340.0, 3]], 'GP': [], 'BP': [['skip band', 320.0, 2]]}, {'G': [[240.0, 1], [200.0, 2], [200.0, 1], [240.0, 1], [140.0, 1], [170.0, 1], [170.0, 1], [200.0, 1], [240.0, 1], [140.0, 1], [140.0, 2], [170.0, 2], [200.0, 2], [230.0, 2]], 'B': [[40.0, 1], [40.0, 2], [100.0, 1], [40.0, 1], [60.0, 0], [130.0, 0], [110.0, 0], [170.0, 0], [160.0, 1], [220.0, 0], [270.0, 0], [320.0, 1], [300.0, 1], [330.0, 1], [370.0, 1], [330.0, 2], [360.0, 2], [360.0, 1], [220.0, 0], [260.0, 0], [310.0, 0], [350.0, 0]], 'GP': [], 'BP': []}]
        let ericred = [{'G': [[480.0, 4], [520.0, 4], [560.0, 4], [590.0, 4], [430.0, 3], [370.0, 2], [430.0, 1], [490.0, 0], [530.0, 0], [570.0, 0], [600.0, 0], [660.0, 1], [720.0, 2], [660.0, 3], [500.0, 1], [590.0, 1], [460.0, 3], [520.0, 3], [620.0, 3], [400.0, 1], [340.0, 2], [390.0, 3], [700.0, 3], [750.0, 2], [690.0, 1], [550.0, 3], [590.0, 3]], 'B': [], 'GP': [], 'BP': []}, {'G': [[190.0, 2], [190.0, 0], [190.0, 4], [370.0, 1], [460.0, 4], [240.0, 3], [290.0, 3], [420.0, 1], [480.0, 1], [190.0, 4], [240.0, 4], [290.0, 4], [460.0, 4], [520.0, 4], [580.0, 4], [270.0, 0], [340.0, 0], [420.0, 0], [380.0, 0], [550.0, 4], [490.0, 4], [380.0, 2]], 'B': [[270.0, 1], [270.0, 2], [350.0, 2], [510.0, 2], [550.0, 1], [610.0, 0], [610.0, 1], [560.0, 2], [610.0, 2], [520.0, 3], [580.0, 3], [330.0, 4], [400.0, 4], [370.0, 3], [430.0, 2], [230.0, 0], [310.0, 0]], 'GP': [], 'BP': []}, {'G': [[440.0, 0], [470.0, 0], [500.0, 0], [390.0, 1], [560.0, 1], [430.0, 2], [510.0, 2]], 'B': [[430.0, 1], [470.0, 1], [520.0, 1], [540.0, 0], [470.0, 2], [550.0, 2], [620.0, 3], [670.0, 4], [620.0, 4]], 'GP': [], 'BP': []}]
        let me = [{'G': [[10.0, 2], [40.0, 2], [60.0, 2], [80.0, 2], [100.0, 2], [120.0, 2], [150.0, 2], [170.0, 2], [200.0, 2], [220.0, 2], [240.0, 2], [260.0, 2], [290.0, 2], [310.0, 2], [330.0, 2], [350.0, 2], [370.0, 2], [390.0, 2], [420.0, 2], [440.0, 2], [460.0, 2], [480.0, 2], [510.0, 2], [90.0, 1], [410.0, 1], [80.0, 3], [420.0, 3], [110.0, 1], [130.0, 1], [150.0, 1], [170.0, 1], [180.0, 1], [200.0, 1], [220.0, 1], [240.0, 1], [260.0, 1], [280.0, 1], [300.0, 1], [320.0, 1], [340.0, 1], [370.0, 1], [390.0, 1], [100.0, 3], [120.0, 3], [140.0, 3], [160.0, 3], [180.0, 3], [200.0, 3], [220.0, 3], [240.0, 3], [260.0, 3], [280.0, 3], [290.0, 3], [310.0, 3], [330.0, 3], [360.0, 3], [370.0, 3], [390.0, 3]], 'B': [], 'GP': [], 'BP': []}, {'G': [[20.0, 0], [100.0, 0], [120.0, 1], [230.0, 1], [110.0, 1], [230.0, 2], [370.0, 2], [210.0, 2], [370.0, 3], [540.0, 3], [350.0, 3], [540.0, 4], [720.0, 4], [40.0, 0], [60.0, 0], [80.0, 0], [150.0, 1], [170.0, 1], [180.0, 1], [210.0, 1], [250.0, 2], [270.0, 2], [290.0, 2], [310.0, 2], [330.0, 2], [350.0, 2], [390.0, 3], [410.0, 3], [430.0, 3], [450.0, 3], [480.0, 3], [490.0, 3], [510.0, 3], [560.0, 4], [580.0, 4], [610.0, 4], [630.0, 4], [650.0, 4], [680.0, 4], [700.0, 4], [710.0, 3], [950.0, 3], [820.0, 2], [1040.0, 2], [120.0, 0], [920.0, 1], [1100.0, 1], [1010.0, 0], [1190.0, 0], [730.0, 3], [960.0, 2], [980.0, 2], [1010.0, 2], [940.0, 1], [960.0, 1], [980.0, 1], [1010.0, 1], [1020.0, 1], [1050.0, 1], [1060.0, 1], [1080.0, 1], [1030.0, 0], [1050.0, 0], [1070.0, 0], [1090.0, 0], [1120.0, 0], [1140.0, 0], [1160.0, 0], [760.0, 3], [780.0, 3], [800.0, 3], [820.0, 3], [850.0, 3], [870.0, 3], [880.0, 3]], 'B': [[20.0, 4], [140.0, 4], [150.0, 3], [240.0, 3], [320.0, 1], [450.0, 1], [410.0, 0], [520.0, 0], [40.0, 4], [60.0, 4], [80.0, 4], [100.0, 4], [120.0, 4], [170.0, 3], [190.0, 3], [220.0, 3], [340.0, 1], [370.0, 1], [390.0, 1], [410.0, 1], [430.0, 1], [430.0, 0], [450.0, 0], [470.0, 0], [490.0, 0], [540.0, 0], [700.0, 0], [860.0, 1], [690.0, 1], [790.0, 2], [940.0, 2], [900.0, 3], [1070.0, 3], [570.0, 0], [590.0, 0], [610.0, 0], [630.0, 0], [650.0, 0], [670.0, 0], [710.0, 1], [730.0, 1], [750.0, 1], [780.0, 1], [800.0, 1], [820.0, 1], [840.0, 1], [810.0, 2], [920.0, 2], [900.0, 2], [880.0, 2], [840.0, 2], [860.0, 2], [930.0, 3], [970.0, 3], [990.0, 3], [1010.0, 3], [1030.0, 3], [1050.0, 3]], 'GP': [], 'BP': []}, {'G': [[30.0, 2], [100.0, 2], [130.0, 1], [230.0, 1], [300.0, 2], [390.0, 2], [130.0, 3], [240.0, 3], [440.0, 1], [540.0, 1], [440.0, 3], [540.0, 3], [610.0, 2], [710.0, 2], [750.0, 1], [850.0, 1], [750.0, 3], [850.0, 4], [900.0, 2], [50.0, 2], [80.0, 2], [160.0, 1], [180.0, 1], [200.0, 1], [150.0, 3], [180.0, 3], [200.0, 3], [220.0, 3], [320.0, 2], [350.0, 2], [370.0, 2], [460.0, 1], [480.0, 1], [500.0, 1], [520.0, 1], [460.0, 3], [480.0, 3], [500.0, 3], [520.0, 3], [630.0, 2], [650.0, 2], [670.0, 2], [690.0, 2], [780.0, 1], [800.0, 2], [770.0, 3], [790.0, 3], [820.0, 3], [840.0, 4]], 'B': [[440.0, 2], [560.0, 2], [460.0, 2], [480.0, 2], [500.0, 2], [520.0, 2], [540.0, 2], [770.0, 2], [850.0, 2]], 'GP': [], 'BP': [['skip band', 190.0, 2], ['skip band', 810.0, 2]]}, {'G': [[10.0, 0], [170.0, 0], [20.0, 1], [170.0, 1], [20.0, 2], [160.0, 2], [20.0, 3], [160.0, 3], [280.0, 0], [390.0, 0], [270.0, 3], [380.0, 3], [280.0, 2], [380.0, 2], [280.0, 1], [380.0, 1], [510.0, 0], [640.0, 0], [510.0, 1], [650.0, 1], [500.0, 2], [650.0, 2], [490.0, 3], [650.0, 3], [760.0, 0], [900.0, 0], [760.0, 1], [760.0, 2], [760.0, 3], [900.0, 1], [900.0, 2], [900.0, 3], [40.0, 0], [60.0, 0], [80.0, 0], [100.0, 0], [120.0, 0], [140.0, 0], [40.0, 1], [60.0, 1], [80.0, 1], [100.0, 1], [120.0, 1], [140.0, 1], [40.0, 2], [60.0, 2], [80.0, 2], [110.0, 2], [140.0, 2], [40.0, 3], [60.0, 3], [80.0, 3], [100.0, 3], [130.0, 3], [150.0, 3], [300.0, 0], [320.0, 0], [340.0, 0], [370.0, 0], [300.0, 1], [320.0, 1], [340.0, 1], [370.0, 1], [300.0, 2], [320.0, 2], [340.0, 2], [360.0, 2], [290.0, 3], [310.0, 3], [330.0, 3], [360.0, 3], [530.0, 0], [540.0, 0], [560.0, 0], [580.0, 0], [600.0, 0], [620.0, 0], [530.0, 1], [550.0, 1], [570.0, 1], [590.0, 1], [610.0, 1], [630.0, 1], [530.0, 2], [550.0, 2], [570.0, 2], [590.0, 2], [610.0, 2], [510.0, 3], [530.0, 3], [560.0, 3], [580.0, 3], [600.0, 3], [620.0, 3], [780.0, 0], [810.0, 0], [830.0, 0], [850.0, 0], [870.0, 0], [780.0, 1], [810.0, 1], [830.0, 2], [850.0, 2], [880.0, 2], [780.0, 2], [810.0, 2], [830.0, 2], [850.0, 2], [870.0, 2], [780.0, 3], [800.0, 3], [820.0, 3], [840.0, 3], [860.0, 3], [880.0, 3]], 'B': [[260.0, 4], [380.0, 4], [480.0, 4], [170.0, 4], [660.0, 4], [750.0, 4], [910.0, 4], [1000.0, 4]], 'GP': [], 'BP': [['skip band', 230.0, 1], ['skip band', 220.0, 2], ['skip band', 440.0, 2], ['skip band', 210.0, 4], ['skip band', 430.0, 4], ['skip band', 700.0, 0], ['skip band', 710.0, 2], ['skip band', 710.0, 3], ['skip band', 960.0, 4], ['skip band', 950.0, 1], ['skip band', 950.0, 0], ['skip band', 950.0, 2], ['skip band', 710.0, 4], ['skip band', 440.0, 3], ['skip band', 440.0, 1]]}]
        this.formations = [fish, temp, trident, n1, blink, ericred[Phaser.Math.Between(0, 2)]].concat(eric).concat(me)
    }
    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        this.crowd = this.physics.add.sprite(66, 200, 'logo');

        this.player = new Player(this, 593, 320);

        this.tweens.add({
            targets: this.crowd,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });
        this.physics.add.overlap(this.crowd, this.player, (crowd, player)=>{this.endGame(player, crowd)})

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys_pressed = {"up": false, "down": false}
        
        this.scoreText = this.add.text(200, 40, "Tone: 0 - Rythm: 0 - Dynamics:0\nTheory: 0 - Posture: 0 - Lungs:0", {fontSize: "32px", color: "red"});

        this.items = this.physics.add.group();
        this.item_pos = [0, 1, 2, 3, 4].map((value)=>{
            let height = this.player.height;
            return height/2+100+value*(height+10)});
        this.good_coins = ["long tone", "practice", "rythm exercise", "scale"];
        this.good_powerups = ["concert", "band", "private lesson"]
        this.bad_coins = ["slouch", "forget practice"]
        this.bad_powerups = ["skip band"]
        
        this.physics.add.overlap(this.player, this.items, (player, item)=>{this.hitItem(player, item)});
        this.physics.add.overlap(this.crowd, this.items, (crowd, item)=>{this.deleteItem(crowd, item)});

        this.sec = 2;
        this.sound.play("theme");
        this.fllBack = ()=>{
            this.player.fallBack(20);
            this.fllBc = this.time.delayedCall(13897, ()=>{
                this.fllBack();
            })
        }
        this.fllBc = this.time.delayedCall(2000, ()=>{this.fllBack();})


    }
    endGame(player, crowd){
        this.registry.set("Player Score", this.player.score)
        this.scene.start("TheLine");
    }
    printScore(){
        let score = this.player.score;
        let scoreStr = "Tone: "+score.tone+" - Rythm: "+score.rythm+" - Dynamics: "+score.dynamics+"\nTheory: "+score.theory+" - Posture: "+score.posture+" - Lungs: "+score.lungs;
        if (this.player.power_ups.multiply == 2){
            scoreStr = scoreStr+" 2x"
        }
        this.scoreText.setText(scoreStr);
    }
    deleteItem(crowd, item){
        this.items.children.delete(item);
        item.destroy();
    }
    hitItem(player, item){
        this.player.collectItem(player, item);
        this.deleteItem(null, item);
        this.printScore();
    }
    addFormation(){
        var form = this.formations[Phaser.Math.Between(0, this.formations.length-1)]
        for (let c of form["G"]){
            this.addItem(c[0], c[1], "good")
        }
        for (let c of form["B"]){
            this.addItem(c[0], c[1], "bad")
        }
        for (let c of form["GP"]){
            this.addItem(c[1], c[2], c[0])
        }
        for (let c of form["BP"]){
            this.addItem(c[1], c[2], c[0])
        }
    }
    addItem(x, road, name){
        let typ;
        if (name == "good"){
            typ = this.good_coins[Phaser.Math.Between(0, this.good_coins.length-1)]}
        else if (name == "bad"){
            typ = this.bad_coins[Phaser.Math.Between(0, this.bad_coins.length-1)]}
        else{
            typ = name
        }
        var item = this.items.create(1220+x, this.item_pos[road], typ);
        item.setCollideWorldBounds(false);
        item.setVelocityX(-200);
    }
    update(time, delta) {
        this.background.tilePositionX += 3;
        if (this.items.children.getArray().every((value)=>{return (value.x<1200-this.player.width*3)})){
            this.addFormation();
        }
        this.items.children.getArray().forEach((item)=>{
            if (item.dd && (item.x < 0 || item.x > 1200 || item.y < 0 || item.y > 700)){
                item.destroy();
            }
        })
        if (this.player.power_ups.magnet || this.player.power_ups.repel){
            this.items.children.getArray().forEach((item)=>{
                let dis = Math.sqrt(Math.abs(this.player.x-item.x)**2 + Math.abs(this.player.y-item.y)**2)
                if (this.good_coins.includes(item.texture.key) && this.player.power_ups.magnet && dis < 192){
                    //item.setVelocityX(0);
                    item.setAngle(-1*Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(item.x, item.y, this.player.x, this.player.y)));
                    let angle = Phaser.Math.DegToRad(item.angle)
                    item.setVelocity(Math.cos(angle)*dis*2, Math.sin(angle)*dis*-2);
                    //console.log(item.angle, this.player.setAngularVelocity)
                }
                if (this.bad_coins.includes(item.texture.key) && this.player.power_ups.repel && dis < 192){
                    item.setAngle(-1*Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(item.x, item.y, this.player.x, this.player.y)));
                    let angle = Phaser.Math.DegToRad(item.angle)
                    item.setVelocity(Math.sin(angle)*dis, Math.cos(angle)*dis);
                    item.dd = true
                }
            })
        }
        if (this.cursors.down.isDown){
            this.keys_pressed["down"] = true;
        }else if(this.keys_pressed["down"]){
            this.keys_pressed["down"] = false;
            this.player.moveDown();
        }
        if (this.cursors.up.isDown){
            this.keys_pressed["up"] = true;
        }else if(this.keys_pressed["up"]){
            this.keys_pressed["up"] = false;
            this.player.moveUp();
        }
        if (this.cursors.space.isDown){
            this.keys_pressed["space"] = true;
        }else if(this.keys_pressed["space"]){
            this.keys_pressed["space"] = false;
        }
    }
    
}
