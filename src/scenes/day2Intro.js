class day2Intro extends Phaser.Scene{
    constructor(){
        super("day2IntroScene");
    }
    preload(){

        if(day1Done == false){
            this.load.image('wristband2', './assets/wristband2.png');
            //particle
            this.load.image('glow', './assets/glow.png');
            this.load.image('day2IntroText', './assets/day2IntroText.png');
        }


    }
    create(){
        //this.cameras.main.setBackgroundColor('#bb60f7')
        this.add.tileSprite(0, 0, 960, 720, 'day2IntroText').setOrigin(0, 0);
        this.wristband2 = this.add.image(880, 350, 'wristband2');
        this.wristband2.setScale(2);
        this.wristband2.setDepth(2);

        //particles
        this.particles = this.add.particles('glow');

        this.emitter = this.particles.createEmitter({
            //frame: 'yellow',
            x: 460, y: 480,
            lifespan: { min: 900, max: 2100 },
            angle: { start: 0, end: 360, steps: 64 },
            speed: 60,
            quantity: 20,//64 
            scale: { start: 0.2, end: 0.1 },
            frequency: 10, //32
            blendMode: 'ADD'
        });
        

    
        //this.emitter.setPosition(450, 450);
        //this.emitter.setSpeed(200);
        //this.emitter.setBlendMode(Phaser.BlendModes.ADD);

        //text fades in and out
        this.clock = 0;
        console.log(this.clock);
        this.cameras.main.fadeIn(1500, 0, 0, 0)
        this.clock = this.time.delayedCall(4700, () => {
            this.cameras.main.fadeOut(1500, 0, 0, 0);
        })
        this.clock = this.time.delayedCall(6700, () => {
            this.scene.start('day2Scene');
        })

    }
}