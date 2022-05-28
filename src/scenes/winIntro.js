class winIntro extends Phaser.Scene{
    constructor(){
        super("winIntroScene");
    }
    preload(){
        // this.load.image('winText', './assets/winText.png');
        // this.load.image('greenBackground', './assets/greenBackground.png');

    }
    create(){
        this.add.sprite(0,0, 'greenBackground').setOrigin(0,0);

        this.winText = this.add.sprite(0, 0, 'winText').setOrigin(0,0);


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