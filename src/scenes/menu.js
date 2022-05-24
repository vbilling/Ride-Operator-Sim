class menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.spritesheet('startButton', './assets/startButton.png', {frameWidth: 384, frameHeight: 512, startFrame: 0, endFrame: 1});
        this.load.image('titleText', './assets/titleText.png');

        //loading all the audio
        this.load.audio('whoosh', './assets/whoosh.wav');
        this.load.audio('thud', './assets/thud.wav');
        this.load.audio('thud2', './assets/thud2.wav');
        this.load.audio('buttonPress', './assets/buttonPress.wav');
        this.load.audio('correct', './assets/correct.wav');
        this.load.audio('oceanWaves', './assets/oceanWaves.wav');
        this.load.audio('redButton1', './assets/redButton1.wav');
        this.load.audio('redButton2', './assets/redButton2.wav');
        this.load.audio('pop', './assets/pop.wav');
        this.load.audio('deathmetal', './assets/deathmetal.wav');

    }
    create(){
        menuDone = true;
        game.settings = {
            mass:1,
            position:[0,3],
            angularVelocity:1,
        };
        this.titleText = this.add.image(0, 0, 'titleText').setOrigin(0, 0);
        //if the mouse is hovering over the down button
        this.startButtonHover = false;
        //initilizing mouse
        this.pointer = this.input.activePointer;

        //sounds
        this.buttonPress = this.sound.add('buttonPress');
        this.game.sound.stopAll();



        

        //start button glow when hovered over
        this.startButton = this.physics.add.sprite(470, 550, 'startButton').setInteractive();
        this.startButton.body.allowGravity =false;
        this.startButton.setScale(0.6);
        this.startButton.body.setSize(300, 140) //, 0.1, 1500);
        this.startButton.on("pointerover", () => {
            this.startButton.setFrame(1);
            //will tell code in update to go to next scene
            this.startButtonHover = true;

        });
        this.startButton.on("pointerout", () => {
            this.startButton.setFrame(0);
            this.startButtonHover = false;
        });

    }
    update(){
        if(this.pointer.isDown && this.startButtonHover == true){
            this.buttonPress.play();
            this.buttonPress.volume = 0.5;
            this.scene.start("day1Scene");
        }; 
    }
}