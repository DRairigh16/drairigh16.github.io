export class Instructions extends Phaser.Scene{
    constructor(){
        super("Instructions");
    }
    preload(){
        this.texts = [
            `Trombone Run:                                    |
    You have signed up for ETSBOA(East Tennessee Band &       
Orchestra Audition) and need to get your practice in before
you run out of time! Use the arrow keys to move up and down
so you can avoid obstacles and collect as many as skill points
as possible!
   -These are motif points, collect them to up your skill 
    level
  -These are untune coins, they will cause you to lose points.
    
  -This will repel untune coins.
    

  -This powerup will get you 2x the points for a while.
    

  -Get this to attract motif points from above and below.
    

  -Watch out for chips and soda, they will flip all motif 
   points to untune coins`,
//            `Trombone Run:                                  |
`   When ETSBOA catches up with you, you will go to the 
audition cut-scene. Then after you play you will see your
assesment. In order to win you need at least two of tone, 
rythm, and dynamics, one of posture or lungs, and you must get 
theory correct. In the winning scene click the instruments in 
the middle to go back to the home screen. In the losing scene
it will automatically do so. On the top-left of the winning 
scene is your score and on the top-right is your chair.





Good luck playing and a lot of motif points for you

Sincerely,
Rare-E Games`
            ]
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
    }
    create() {
        this.storyAndMain();
        this.scroll = false;
        this.time.delayedCall(15000, ()=>{this.scroll = true})
    }
    storyAndMain(){
        this.standmn = this.add.group();
        this.standmn.add(this.add.text(0, 0, this.texts[0], {fontSize: "32px", fill: "steelblue"}));
        //Motif points
        this.standmn.create(10, 190, "practice")
        this.standmn.create(31, 190, "scale")
        this.standmn.create(52, 190, "rythm exercise")
        this.standmn.create(10, 210, "long tone")
        //Untune coins
        this.standmn.create(10, 255, "forget practice");
        this.standmn.create(31, 255, "slouch")
        //Power ups
        this.standmn.create(20, 310, "private lesson");
        this.standmn.create(20, 410, "concert");
        this.standmn.create(20, 490, "band");
        //Bad habits
        this.standmn.create(20, 590, "skip band");

        this.standmn.add(this.add.text(0, 700, this.texts[1], {fontSize: "32px", fill: "steelblue"}));
        
    }
    update() {
        if (this.scroll){
            this.standmn.getChildren().forEach((v, i)=>{
                v.setY(v.y-0.5)
                if (i == 11 && v.y < -350){
                    this.sound.stopAll();
                    this.scene.start("Game")
                }
            })
        }
    }
}