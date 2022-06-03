class day1Intro extends Phaser.Scene{
    constructor(){
        super("day1IntroScene");
    }
    preload(){
    }
    create(){
        game.sound.stopAll();

        this.day1Jingle = this.sound.add('day1Jingle');
        this.day1Jingle.play();
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