class lose extends Phaser.Scene{
    constructor(){
        super("loseScene");
    }
    preload(){
        this.load.image('redBackground', './assets/redBackground2.png');
        this.load.image('firedText', './assets/firedText.png');
        this.load.spritesheet('startoverButton', './assets/startoverButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});
        if(trainingDone == false){
            this.load.image('firedBoss', './assets/firedBoss.png');
              
        }

    }
    create(){
        this.pointer = this.input.activePointer;
        this.background = this.add.tileSprite(0, 0, 960, 720, 'redBackground').setOrigin(0, 0);
        this.boss = this.add.sprite(450, 510, 'firedBoss');
        this.firedText = this.add.sprite(0, 0, 'firedText').setOrigin(0,0);
        this.startoverButton = this.add.sprite(850, 670, 'startoverButton').setInteractive();
        this.startoverButton.setScale(0.35);
        this.startoverButtonHover = false;
        this.boss.setFrame(6);
        this.boss.setScale(2); 
        this.deathmetal = this.sound.add('deathmetal');
        this.deathmetal.play();



    }
    update(){
        function randomDecimil(mn,mx){
            return Math.random() * (mx - mn) + mn
        }
        this.boss.x = this.boss.x + randomDecimil(-1, 1);

        this.startoverButton.on("pointerover", () => {
            this.startoverButton.setFrame(1);
            this.startoverButtonHover = true;
        });
        this.startoverButton.on("pointerout", () => {
            this.startoverButton.setFrame(2);
            this.startoverButtonHover = false;
        });

        if(this.startoverButtonHover == true){
            this.input.on('pointerdown', function (pointer) {
                this.scene.start('menuScene');

            }, this)
        }

    }
}