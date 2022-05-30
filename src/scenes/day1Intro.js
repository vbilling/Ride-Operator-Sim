class day1Intro extends Phaser.Scene{
    constructor(){
        super("day1IntroScene");
    }
    preload(){
        // this.load.image('day1IntroText', './assets/day1IntroText.png');
        // this.load.image('wristband1', './assets/wristband1.png');
        // this.load.image('day2IntroText', './assets/day2IntroText.png');
        // this.load.image('day3IntroText', './assets/day3IntroText.png');
        // this.load.image('abstract_1', './assets/abstract_1.png');
        // this.load.image('abstract_2', './assets/abstract_2.png');
        // this.load.image('abstract_3', './assets/abstract_3.png');

        // //particle
        // this.load.image('glow', './assets/glow.png');

    }
    create(){
        //this.cameras.main.setBackgroundColor('#bb60f7')
        this.add.sprite(0, 0, 'abstract_1').setOrigin(0,0)
        this.add.tileSprite(0, 0, 960, 720, 'day1IntroText').setOrigin(0, 0);
        this.wristband1 = this.add.image(880, 350, 'wristband1');
        this.wristband1.setScale(2);
        this.wristband1.setDepth(2);

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
        this.clock = 0
        
        this.cameras.main.fadeIn(1500, 0, 0, 0)
        this.clock = this.time.delayedCall(4700, () => {
            this.cameras.main.fadeOut(1500, 0, 0, 0);
        })
        this.clock = this.time.delayedCall(6700, () => {
            this.scene.start('day1Scene');
        })

    }
}