class load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }
    preload(){
        this.load.image('ground', './assets/ground.png');
        this.load.image('heightPole', './assets/height_pole.png');
        this.load.image('exitSign', './assets/exit_sign.png');
        this.load.image('rulesSign', './assets/rulesSign.png');
        this.load.image('enterSign', './assets/enter_sign.png');
        this.load.spritesheet('readyButton', './assets/readyButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});

        this.load.image('day1Background', './assets/background_day1.png');
        this.load.image('day2Background', './assets/background_day2.png');
        this.load.image('day2Title', './assets/day2Title.png');
        this.load.image('player', './assets/player.png');
        this.load.image('day1Title', './assets/day1Title.png');
        this.load.image('day3Background', './assets/background_day3.png');
        this.load.image('day3Title', './assets/day3Title.png');
 
        //bodies
        this.load.spritesheet('cat1', './assets/cat1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2}); 
        this.load.spritesheet('cat2', './assets/cat2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('cat3', './assets/cat3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('duck1', './assets/duck1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('duck2', './assets/duck2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('duck3', './assets/duck3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('bear1', './assets/bear1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('bear2', './assets/bear2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('dog1', './assets/dog1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('dog2', './assets/dog2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});

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

        


        this.scene.start("menuScene");

    }


}