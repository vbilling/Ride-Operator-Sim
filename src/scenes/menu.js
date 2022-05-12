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
        this.add.text(300, 300, "MENU SCENE");
        this.scene.start('day1IntroScene');

    }
}