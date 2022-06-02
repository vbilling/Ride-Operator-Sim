class menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){}
    create(){
        day1Done = false;
        day2Done = false;
        day3Done = false;
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

        this.chaosText = this.add.image(680, 575, 'chaosText');
        this.chaosText.setScale(0.6);
        this.endlessText = this.add.sprite(310, 575, 'endlessText');
        this.endlessText.setScale(0.6);
        //if the mouse is hovering over the down button
        this.startButtonHover = false;
        this.chaosButtonHover = false;
        this.endlessButtonHover = false;
        //initilizing mouse
        this.pointer = this.input.activePointer;

        //sounds
        this.buttonPress = this.sound.add('buttonPress');
        //this.redButton3 = this.sound.add('redButton1');
        //this.redButton4 = this.sound.add('redButton2');
        this.game.sound.stopAll();

        

        //start button glow when hovered over
        this.startButton = this.physics.add.sprite(490, 650, 'blueButton').setInteractive();
        this.startButton.body.allowGravity = false;
        this.startButton.setScale(0.17);
        this.startButton.body.setSize(300, 140, 0.1, 1500);
        this.startButton.on("pointerover", () => {
            this.startButton.setFrame(1);
            this.startButton.stop();
            //will tell code in update to go to next scene
            this.startButtonHover = true;

        });
        this.startButton.on("pointerout", () => {
            this.startButton.setFrame(0);
            this.startButtonHover = false;
        });


        this.chaosButton = this.physics.add.sprite(670, 650, 'redButton').setInteractive();
        this.chaosButton.body.allowGravity = false;
        //this.chaosButton.setBlendMode(Phaser.BlendModes.DARKEN);
        this.chaosButton.setScale(0.17);
        if(winDone == true){
            this.chaosButton.on("pointerover", () => {
                this.chaosButton.setFrame(1);
                this.chaosButton.stop();
                //will tell code in update to go to next scene
                this.chaosButtonHover = true;
    
            });
            this.chaosButton.on("pointerout", () => {
                this.chaosButton.setFrame(0);
                this.chaosButtonHover = false;
            });
        }
 
        this.endlessButton = this.physics.add.sprite(300, 650, 'greenButton').setInteractive();
        this.endlessButton.body.allowGravity = false;
        //this.endlessButton.setBlendMode(Phaser.BlendModes.DARKEN);
        this.endlessButton.setScale(0.17);
        if(winDone == true){
            this.endlessButton.on("pointerover", () => {
                this.endlessButton.setFrame(1);
                this.endlessButton.stop();
                //will tell code in update to go to next scene
                this.endlessButtonHover = true;
    
            });
            this.endlessButton.on("pointerout", () => {
                this.endlessButton.setFrame(0);
                this.endlessButtonHover = false;
            });

        }

        this.anims.create({
            key: 'blinking',
            frames: this.anims.generateFrameNames('blueButton', {
                start: 0, 
                end: 1, 
                first: 0}),
                frameRate: 1.4,
                repeat: -1,
                yoyo: false
        });
        this.anims.create({
            key: 'blinking2',
            frames: this.anims.generateFrameNames('redButton', {
                start: 0, 
                end: 1, 
                first: 0}),
                frameRate: 1.4,
                repeat: -1,
                yoyo: false
        });
        this.anims.create({
            key: 'blinking3',
            frames: this.anims.generateFrameNames('greenButton', {
                start: 0, 
                end: 1, 
                first: 0}),
                frameRate: 1.4,
                repeat: -1,
                yoyo: false
        });
        if(menuDone == false){
            this.startButton.play('blinking');
        }

        this.startButton.on("pointerover", () => {
            //will tell code in update to go to next scene
            this.startButtonHover = true;
            this.startButton.stop();
        });
        this.startButton.on("pointerout", () => {
            this.startButtonHover = false;
        });
        if(winDone == false){
            this.chaosText.setFrame(1);
            this.endlessText.setFrame(1);
            this.chaosButton.setFrame(3);
            this.endlessButton.setFrame(3);
        }else{
            this.chaosText.setFrame(0);
            //this.endlessText.setFrame(0);
            this.chaosButton.setFrame(0);
            if(chaosDone == false){
                this.chaosButton.play('blinking2');
            }
            //this.endlessButton.setFrame(0);
        }

        menuDone = true;



    }
    update(){
        if(this.pointer.isDown && this.startButtonHover == true){
            this.startButton.setFrame(2);
            this.buttonPress.play();
            this.buttonPress.volume = 0.5;
            if(trainingDone == false){
                this.scene.start("trainingIntroScene");
            }else{
                this.scene.start("day1IntroScene");
            }
        }; 
        if(this.pointer.isDown && this.chaosButtonHover == true){
            this.chaosButton.setFrame(2);
            this.buttonPress.play();
            this.buttonPress.volume = 0.5;
            this.scene.start('chaosScene');
        }; 
        if(this.pointer.isDown && this.endlessButtonHover == true){
            this.endlessButton.setFrame(2);
            this.buttonPress.play();
            this.buttonPress.volume = 0.5;
            this.scene.start('endlessScene');
        }; 

    }
}