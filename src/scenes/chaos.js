class chaos extends Phaser.Scene{
    constructor(){
        super("chaosScene");
    }
    preload(){

    }
    create(){
        chaosDone = true;
        this.comingSoon = this.add.sprite(0, 0, 'comingSoon').setOrigin(0,0);

        //menu button
        this.pointer2 = this.input.activePointer;
        this.menuPointer = false;
        this.menuButton = this.physics.add.sprite(470, 550, 'menuButton');
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