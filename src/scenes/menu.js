class menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.spritesheet('startButton', './assets/startButton.png', {frameWidth: 384, frameHeight: 512, startFrame: 0, endFrame: 1});
        this.load.image('titleText', './assets/titleText.png');

    }
    create(){
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
            this.scene.start("day1IntroScene");
        }; 
    }
}