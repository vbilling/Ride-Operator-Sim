class menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){

    }
    create(){
        game.settings = {
            mass:1,
            position:[0,3],
            angularVelocity:1,
        };
        this.scene.start('coasterScene');

    }
}