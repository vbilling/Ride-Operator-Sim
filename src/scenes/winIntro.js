class winIntro extends Phaser.Scene{
    constructor(){
        super("winIntroScene");
    }
    preload(){

    }
    create(){
        this.add.sprite(0,0, 'greenBackground').setOrigin(0,0);
        game.sound.stopAll();
        this.winText = this.add.sprite(0, 0, 'winText').setOrigin(0,0);

        this.trumpet = this.sound.add('trumpet');
        this.trumpet.play();
        this.trumpet.volume = 0.15;


        this.clock = 0
        
        this.cameras.main.fadeIn(1100, 0, 0, 0)
        this.clock = this.time.delayedCall(3800, () => {
            this.cameras.main.fadeOut(1100, 0, 0, 0);
        })
        this.clock = this.time.delayedCall(4800, () => {
            this.scene.start('winScene');
        })

    }

}