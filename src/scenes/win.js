class win extends Phaser.Scene{
    constructor(){
        super("winScene");
    }
    preload(){

    }
    create(){
        this.add.text(200, 200, "YOU WIN");


    }
}