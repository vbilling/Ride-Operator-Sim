class lose extends Phaser.Scene{
    constructor(){
        super("loseScene");
    }
    preload(){

    }
    create(){
        this.add.text(200, 200, "YOU'RE FIRED");


    }
}