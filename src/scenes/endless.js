class endless extends Phaser.Scene{
    constructor(){
        super("endlessScene");
    }
    preload(){

    }
    create(){
        this.comingSoon = this.add.sprite(0, 0, 'comingSoon2').setOrigin(0,0);

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
        });
        this.menuButton.on("pointerout", () => {
            this.menuPointer = false;
        });



    }
    update(){
        if(this.pointer2.isDown && this.menuPointer == true){
            this.scene.start('menuScene');
        }; 


    }
}