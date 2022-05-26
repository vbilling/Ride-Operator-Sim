class menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.spritesheet('startButton', './assets/startButton.png', {frameWidth: 384, frameHeight: 512, startFrame: 0, endFrame: 1});
        this.load.image('titleText', './assets/titleText.png');
        this.load.image('boardwalkTitle', './assets/boardwalkTitle.png');
        this.load.image('background', './assets/rollercoaster_background_day1.png');
        this.load.image('menuPanel', './assets/menuPanel.png');
        this.load.image('startText', './assets/startText.png');
        this.load.image('chaosText', './assets/chaos.png');
        this.load.image('endlessText', './assets/endless.png');
        this.load.image('happyBoss', './assets/happyBoss.png');
        this.load.image('rainbow', './assets/rainbow.png');
        this.load.image('sparkle', './assets/sparkle.png');
        this.load.spritesheet('redButton', './assets/redButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 2});
        this.load.spritesheet('blueButton', './assets/blueButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 2});
        this.load.spritesheet('greenButton', './assets/greenButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 2});

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
        var background = this.add.sprite(0, 0, 'background').setOrigin(0,0);
        //sparkles
        var textures = this.textures;
        var origin = background.getTopLeft();
        var titleTextSource = {
            getRandomPoint: function (vec)
            {
                do
                {
                    var x = Phaser.Math.Between(0, 750); //titleText.width-1
                    var y = Phaser.Math.Between(0, 300); //titleText.height -1
                    var pixel = textures.getPixel(x, y, 'background');
                } while (pixel.alpha < 255);
        
                return vec.setTo(x + origin.x, y + origin.y);
            }
        };
        
        var particles = this.add.particles('sparkle');
        
        particles.createEmitter({
            x: 120,
            y: 120,
            lifespan: 4400,
            gravityY: 10,
            scale: { start: 0, end: 0.1, ease: 'Quad.easeOut' },
            alpha: { start: 1, end: 0.25, ease: 'Quad.easeIn' },
            //blendMode: 'ADD',
            emitZone: { type: 'random', source: titleTextSource }
        });
        var titleText = this.add.image(30, -20, 'boardwalkTitle').setOrigin(0, 0);


        this.happyBoss = this.add.sprite(500, 350, 'happyBoss');
        this.happyBoss.setScale(1.2);

        var rainbow = this.add.image(770, 320, 'rainbow').setScale(0.45);
        var rainbow2 = this.add.sprite(220, 320, 'rainbow').setScale(0.45);
        this.controlpanel = this.add.sprite(480, 310, 'menuPanel');
        this.controlpanel.setScale(1.2);
        this.startText = this.add.sprite(500, 575, 'startText');
        this.startText.setScale(0.6);

        this.chaosText = this.add.sprite(680, 575, 'chaosText');
        this.chaosText.setBlendMode(Phaser.BlendModes.DARKEN);
        this.chaosText.setScale(0.6);

        this.endlessText = this.add.sprite(310, 575, 'endlessText');
        this.endlessText.setBlendMode(Phaser.BlendModes.DARKEN);
        this.endlessText.setScale(0.6);

        //if the mouse is hovering over the down button
        this.startButtonHover = false;
        //initilizing mouse
        this.pointer = this.input.activePointer;

        //sounds
        this.buttonPress = this.sound.add('buttonPress');
        this.game.sound.stopAll();

        

        //start button glow when hovered over
        this.startButton = this.physics.add.sprite(490, 650, 'blueButton').setInteractive();
        this.startButton.body.allowGravity = false;
        this.startButton.setScale(0.17);
        this.startButton.body.setSize(300, 140, 0.1, 1500);
        this.startButton.on("pointerover", () => {
            this.startButton.setFrame(1);
            //will tell code in update to go to next scene
            this.startButtonHover = true;

        });
        this.startButton.on("pointerout", () => {
            this.startButton.setFrame(0);
            this.startButtonHover = false;
        });

        this.chaosButton = this.physics.add.sprite(670, 650, 'redButton').setInteractive();
        this.chaosButton.body.allowGravity = false;
        this.chaosButton.setBlendMode(Phaser.BlendModes.DARKEN);
        this.chaosButton.setScale(0.17);

        this.endlessButton = this.physics.add.sprite(300, 650, 'greenButton').setInteractive();
        this.endlessButton.body.allowGravity = false;
        this.endlessButton.setBlendMode(Phaser.BlendModes.DARKEN);
        this.endlessButton.setScale(0.17);



    }
    update(){
        if(this.pointer.isDown && this.startButtonHover == true){
            this.buttonPress.play();
            this.buttonPress.volume = 0.5;
            this.scene.start("trainingIntroScene");
        }; 
    }
}