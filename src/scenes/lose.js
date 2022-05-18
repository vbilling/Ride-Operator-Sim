class lose extends Phaser.Scene{
    constructor(){
        super("loseScene");
    }
    preload(){
        if(trainingDone == false){
            this.load.spritesheet('boss', './assets/boss.png', {frameWidth: 480, frameHeight: 360, startFrame: 0, endFrame: 6})
            this.load.image('blueBackground', './assets/blueBackground.png');
        }

    }
    create(){
        this.firebackground = this.add.sprite(460, 420, 'fire').setOrigin(0,0);
        this.boss = this.add.sprite(450, 450, 'boss');
        this.boss.setFrame(6);
        this.boss.setScale(2.5);

        this.add.text(200, 200, "YOU'RE FIRED");



    }
    update(){
        function randomDecimil(mn,mx){
            return Math.random() * (mx - mn) + mn
        }
        this.boss.x = this.boss.x + randomDecimil(-1, 1);

    }
}