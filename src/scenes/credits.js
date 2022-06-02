class credits extends Phaser.Scene{
    constructor(){
        super("creditsScene");
    }
    create(){
        this.add.tileSprite(0, 80, 960, 720, 'day1Background', ).setOrigin(0,0);
        this.header = this.add.sprite(0, 0, 'header').setOrigin(0,0);
        this.header.setFrame(8);

        this.william = this.add.sprite(135, 400, 'fox', 0).setScale(.25);
        
        this.victoria = this.add.sprite(460, 400, 'cat3', 0).setScale(.25);

        this.karoline = this.add.sprite(800, 400, 'dog1', 0).setScale(.25);

        this.add.sprite(halfscreenwidth, 100, 'credits');

        this.add.sprite(450, 575, 'creditVictoria').setScale(.25);

        this.add.sprite(790, 575, 'creditKaroline').setScale(.25);

        this.add.sprite(125, 575, 'creditWilliam').setScale(.25);

        //menu button
        this.pointer2 = this.input.activePointer;
        this.menuPointer = false;
        this.menuButton = this.physics.add.sprite(800, 650, 'menuButton');
        this.menuButton.body.allowGravity = false;
        this.menuButton.setScale(0.2);
        this.menuButton.body.setSize(870, 300);
        this.menuButton.setInteractive();
        this.menuButton.on("pointerover", () => {
            this.menuPointer = true;
            this.menuButton.setFrame(1);
        });
        this.menuButton.on("pointerout", () => {
            this.menuPointer = false;
            this.menuButton.setFrame(0);
        });
        this.buttonPress = this.sound.add('buttonPress');
    }
    advanceScene(){
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                //this.buttonPress.play();
            },
            loop: false
        }) 
        this.time.addEvent({
            delay: 500,
            callback: ()=>{
                //this.buttonPress.play();
                this.scene.start("menuScene");
            },
            loop: false
        }) 
    }
    update(){
        if(this.pointer2.isDown && this.menuPointer == true){
            this.advanceScene();
        }; 


    }
}