class lose extends Phaser.Scene{
    constructor(){
        super("loseScene");
    }
    preload(){
    }
    create(){
        loseDone = true;
        this.pointer = this.input.activePointer;
        game.sound.stopAll();
        this.deathmetal = this.sound.add('deathmetal');
        this.deathmetal.play();
        this.deathmetal.volume = 0.2;
        this.background3 = this.add.tileSprite(0, 0, 960, 720, 'redBackground3').setOrigin(0, 0);
        this.firedboss = this.add.sprite(450, 510, 'firedBoss');
        this.firedText = this.add.sprite(0, 0, 'firedText').setOrigin(0,0);
        this.menuButtonHover = false;
        this.menuButton = this.physics.add.sprite(850, 660, 'menuButton').setInteractive();
        this.menuButton.body.allowGravity = false;
        this.menuButton.setScale(0.2);
        this.menuButton.body.setSize(870, 300);
        this.menuButton.setAlpha(0);
        this.firedboss.setFrame(6);
        this.firedboss.setScale(2); 
        this.buttonPress = this.sound.add('buttonPress');

        this.time.addEvent({
            delay: 10000,
            callback: ()=>{
                this.menuButton.setAlpha(1);
            },
            loop: false
        }) 

    }
    update(){
        function randomDecimil(mn,mx){
            return Math.random() * (mx - mn) + mn
        }
        this.firedboss.x = this.firedboss.x + randomDecimil(-1, 1);

        this.menuButton.on("pointerover", () => {
            this.menuButtonHover = true;
            this.menuButton.setFrame(1);
        });
        this.menuButton.on("pointerout", () => {
            this.menuButtonHover = false;
            this.menuButton.setFrame(0);
        });

        if(this.menuButtonHover == true){
            this.input.on('pointerdown', function (pointer) {
                this.buttonPress.play();
                this.scene.start('menuScene');
            }, this)
        }

    }
}