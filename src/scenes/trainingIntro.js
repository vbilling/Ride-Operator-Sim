class trainingIntro extends Phaser.Scene{
    constructor(){
        super("trainingIntroScene");
    }
    preload(){
        this.load.image('trainingIntroText', './assets/trainingIntroText.png');
        this.load.image('background', './assets/abstract_4.png');
  
    }
    create(){
        //this.cameras.main.setBackgroundColor('#bb60f7')
        this.add.sprite(0, 0, 'background').setOrigin(0,0);
        this.add.tileSprite(0, 0, 960, 720, 'trainingIntroText').setOrigin(0, 0);
        
        //text fades in and out
        this.clock = 0
        
        this.cameras.main.fadeIn(1500, 0, 0, 0)
        this.clock = this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(1500, 0, 0, 0);
        })
        this.clock = this.time.delayedCall(4500, () => {
            this.scene.start('trainingdayScene');
        })

    }
}