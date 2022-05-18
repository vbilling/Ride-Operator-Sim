class trainingday extends Phaser.Scene{
    constructor(){
        super("trainingdayScene");
    }
    preload(){
        this.load.image('day1Background', './assets/background-day1.png');
        this.load.image('ground', './assets/ground.png');

        this.load.spritesheet('boss', './assets/boss.png', {frameWidth: 480, frameHeight: 360, startFrame: 0, endFrame: 2});


        this.load.image('directions', './assets/directions.png');
        this.load.image('textBubble', './assets/textBubble.png');
        this.load.image('boardwalkLogo', './assets/boardwalkLogo.png');
        this.load.spritesheet('readyButton', './assets/readyButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bouncingArrow', './assets/bouncingArrow.png', {frameWidth: 612, frameHeight: 612, startFrame: 0, endFrame: 7});
        this.load.spritesheet('rulesSign', './assets/rulesSign.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('allowArrow', './assets/allowArrow.png', {frameWidth: 712, frameHeight: 712, startFrame: 0, endFrame: 6});
        this.load.spritesheet('denyArrow', './assets/denyArrow.png', {frameWidth: 712, frameHeight: 712, startFrame: 0, endFrame: 6});

        this.load.spritesheet('cat1', './assets/cat1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1}); 
        this.load.spritesheet('cat2', './assets/cat2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duck1', './assets/duck1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duck2', './assets/duck2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duck3', './assets/duck3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bear1', './assets/bear1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bear2', './assets/bear2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duckyellow', './assets/duckyellow.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duckpink', './assets/duckpink.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duckblue', './assets/duckblue.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});

        this.load.image('wristband1', './assets/wristband1.png');
        this.load.image('wristband2', './assets/wristband2.png');
        this.load.image('wristband3', './assets/wristband3.png');

        if(menuDone == false){
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
        }
    }
    create(){
        //if training day was completed
        trainingDone = true;
        this.add.tileSprite(0,0, 960, 720, 'day1Background').setOrigin(0,0);
        this.textbox = this.add.sprite(0, 0, 'textBubble').setOrigin(0, 0);
        this.rulesSign = this.add.sprite(0, 0, 'rulesSign').setOrigin(0, 0);
        this.rulesSign.setAlpha(0);

        this.boss = this.add.sprite(180, 90, 'boss');
        this.boss.setScale(0.6);
        this.boss.setFrame(1);

        //sounds
        this.oceanWaves = this.sound.add('oceanWaves');
        this.oceanWaves.play();
        this.oceanWaves.loop = true;
        this.oceanWaves.volume = 0.3;
        this.whoosh = this.sound.add('whoosh');
        this.correct = this.sound.add('correct');

        this.ground = this.add.sprite(400, 695, 'ground');
        //number to keep track of which test rider we are on
        this.riderNum = 0;
        this.delay = 0;
        this.startdelay2 = false;
        this.delay2 = 0;
        //showing the boardwalk logo at the right time
        //if at least one rider has been created
        this.onerider = false;
        this.counted = false;
        this.nextrider = false;
        this.readyButtonHover = false;
        this.pointer = this.input.activePointer;
        this.readyButton = this.add.sprite(860, 70, 'readyButton').setInteractive();
        this.readyButton.setAlpha(0);
        this.readyButton.setScale(0.4);
        this.readyButton.on("pointerover", () => {
            this.readyButton.setFrame(1);
            this.readyButtonHover = true;

        });
        this.readyButton.on("pointerout", () => {
            this.readyButton.setFrame(0);
            this.readyButtonHover = false;
        });
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.input.on('drag', (_pointer, _gameObject, dragX, dragY)=>{
            this.testRider.x = dragX;
            this.testRider.y = dragY;
            this.testRider.setFrame(1);
            this.testRider.body.allowGravity = false;
        });
        this.input.on('dragend', (pointer, _gameObject)=>{
            this.testRider.setFrame(0);
            this.testRider.body.allowGravity = true;
            //flying across the screen
            if(this.testRider.x < 320){ //thrown to the left
                this.whoosh.play();
                this.testRider.setVelocityX(-800);
                this.testRider.setVelocityY(-100);
            }
            if(this.testRider.x > 650){ //thrown to the right
                this.whoosh.play()
                this.testRider.setVelocityX(800);
                this.testRider.setVelocityY(-100);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        this.correct.play();
                    },
                    loop: false
                })
            }
        });
        //make an animation for the bouncing arrow
        this.anims.create({
            key: 'arrow',
            frames: this.anims.generateFrameNames('bouncingArrow', {
                start: 0, 
                end: 6, 
                first: 0}),
                frameRate: 16,
                repeat: -1,
                yoyo: false
        });
        //aniation for allow arrow
        this.anims.create({
            key: 'allow',
            frames: this.anims.generateFrameNames('allowArrow', {
                start: 0, 
                end: 6, 
                first: 0}),
                frameRate: 16,
                repeat: -1,
                yoyo: true
        });
        this.anims.create({
            key: 'deny',
            frames: this.anims.generateFrameNames('denyArrow', {
                start: 0, 
                end: 6, 
                first: 0}),
                frameRate: 16,
                repeat: -1,
                yoyo: true
        });
        //text configurations for all of the boss's text
        let mumblingConfig = {
            fontFamily: 'Copperplate',
            fontSize: '16px',
            color: 'black',
            align: 'left',
            lineSpacing: 7,
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };
        let normalConfig = {
            fontFamily: 'Courier',
            fontSize: '16px',
            color: 'blue',
            align: 'left',
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };
        let arrowConfig = {
            fontFamily: 'Marker Felt',
            fontSize: '38px',
            color: '#87ed9c',
            align: 'center',
            stroke: 'black',
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };
        let arrow2Config = {
            fontFamily: 'Marker Felt',
            fontSize: '38px',
            color: '#ed8787',
            align: 'center',
            stroke: 'black',
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };
        //create an array to hold all the dialogue
        bossText = [
            "Ugh, now where is that pimply teenager I have \nto train.",
            "OH there you are! Welcome to your new job \nas a ride operator at",
            "What was that mumbling about buying your \nlittle brother a birthday present? Yeah I \ndon't care...",
            "...but i guess you should be able to afford \nit after three days of work. That is, if you \nmanage not to get fired.",
            "Lets get started. Use your mouse to fling \nguests RIGHT to allow them to ride and \nLEFT to deny them.",
            "Good job.",
            "Guests must be taller than this line...",
            "...and shorter than this to ride.",
            "Oh you want to know if ears count? Tell me,\n do you think hats and hair should count?!",
            "Lets practice checking height. Fling these \n guests accordingly.",
            "Make sure guests have the correct wristband! \nNO FREE RIDES!!! Today's color is",
            "Oh and VERY important: no HATS, FOOD, \nDRINKS, WEAPONS, or CRIMINALS allowed!!!",
            "But MOST IMPORTANTLY, don't allow more \nthan 8 guests ride at a time and also no less. \nDon't be losing me money.",
            "You'll have to keep track of how many \nguests you let on. Once you've let EXACTLY 8 \nguests on, press this ready button.",
            "See you tomorrow at your first shift!"
        ];
        //intructions on how to advance text
        this.instructions = this.add.sprite(0, 0, 'directions').setOrigin(0,0);
        //print the first boss's phrase
        currentText = this.add.text(305, 65, '', mumblingConfig);
        this.allowtext = this.add.text(0, 0, 'Allow', arrowConfig).setAlpha(0);
        this.denytext = this.add.text(0, 0, 'Deny', arrow2Config).setAlpha(0);
        this.typewriteTextWrapped(bossText[0]);



    };
    typewriteText(text){
	    const length = text.length
	    let i = 0
	    this.time.addEvent({
		    callback: () => {
			    currentText.text += text[i]
			    ++i
		    },
		    repeat: length - 1,
		    delay: 20 //50
	    })
    };
    typewriteTextWrapped(text){
	    const lines = currentText.getWrappedText(text)
	    const wrappedText = lines.join('\n')
	    this.typewriteText(wrappedText)
    };
    //make functions to create each test rider
    rider1(){
        this.delay = 0;
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, 'cat2', 0).setInteractive();
        this.testRider.setScale(0.35);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        this.physics.add.collider(this.testRider, platforms);
        this.onerider = true;
    }
    rider4(){
        this.delay = 0;
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, 'cat1', 0).setInteractive();
        this.testRider.setScale(0.2);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        this.physics.add.collider(this.testRider, platforms);
    }
    rider5(){
        this.delay = 0;
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, 'bear1', 0).setInteractive();
        this.testRider.setScale(0.45);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        this.physics.add.collider(this.testRider, platforms);
    }
    rider6(){
        this.delay = 0;
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, 'cat1', 0).setInteractive();
        this.testRider.setScale(0.3);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        this.physics.add.collider(this.testRider, platforms);
    }
    rider7(){
        this.delay = 0;
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, 'duckyellow', 0).setInteractive();
        this.testRider.setScale(0.35);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        this.physics.add.collider(this.testRider, platforms);
    }
    rider9(){
        this.delay = 0;
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, 'duckblue', 0).setInteractive();
        this.testRider.setScale(0.35);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        this.physics.add.collider(this.testRider, platforms);
    }
    newCharacters(){
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        function randomDecimil(mn,mx){
            return Math.random() * (mx - mn) + mn
        }
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        //respawn delay is reset
        this.delay = 0;
        //set the scale of them which will affect height
        this.height = randomDecimil(0.2, 0.5);
        this.scale = this.height; 
        //randomly generate which character body
        //add all character bodies to an array
        this.body_array = ['cat1', 'cat2', 'duck1', 'duck2', 'duck3', 'bear1', 'bear2'];
        //pick a random body
        this.pick_body = random(0,this.body_array.length - 1);
        // Add the character
        this.testRider = this.physics.add.sprite(halfscreenwidth, 400, this.body_array[this.pick_body], 0).setInteractive();
        riderAccessories_array.push(this.body_array[this.pick_body]);
        this.testRider.setScale(this.scale);
        this.testRider.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.testRider);
        // object has to be dragged by 16 pixels to be draggable 
        this.input.dragDistanceThreshold = 16;
        this.physics.add.collider(this.testRider, platforms);
        //wrist accessories
        this.wrist_chance = random(0, 100);
        //console.log('this.wrist_chance', this.wrist_chance);
        this.wrist = false;
        if(this.wrist_chance >= 1){
            this.wrist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        wrist_array = ['wristband1', 'wristband1', 'wristband1', 'wristband2', 'wristband3', 'wristband1', 'wristband1','wristband1'];

        if(this.wrist == true){
            this.pick_wrist = random(0,wrist_array.length - 1);
            riderAccessories_array.push(wrist_array[this.pick_wrist]);
            this.wrist_accessory = this.add.sprite(this.testRider.x, this.testRider.y, wrist_array[this.pick_wrist], 0);
            this.wrist_accessory.setScale(this.scale);
        }else{
            riderAccessories_array.push("no wristband");
        }
    }

    update(){
        //if 'this.directions' still exists, have it fade in and out
        

        if(this.startdelay2 == true){
            this.delay2 += 1;
        }else{
            this.delay2 = 0;
        }

        if(this.onerider == true){
            if(this.testRider.x > 1000 || this.testRider.x < -50){
                this.testRider.destroy();
                if(this.wrist == true){
                    this.wrist_accessory.destroy();
                };
                this.nextrider = true;
                if(this.counted == false){
                     this.riderNum += 1;
                     this.counted = true;
                }
            };
        }
        if(this.wrist == true){
            this.wrist_accessory.x = this.testRider.x;
            this.wrist_accessory.y = this.testRider.y;
        };


        //have text advance when space is pressed
        if(currentText.text == bossText[0]){
            //get rid of "press Space to advance"
            //instructions.destroy();
            //go to next phrase
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[1]);
                this.boss.setFrame(0);
                this.startdelay2 = true;

            }

        }else if(currentText.text == bossText[1]){
            if(this.delay2/60 > 1.5){
                this.logo = this.add.sprite(580, 135, 'boardwalkLogo');
                this.logo.setScale(1.1);
                this.startdelay2 = false;
            };
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                this.logo.destroy();
                currentText.text = this.typewriteTextWrapped(bossText[2]);
            }
        }else if(currentText.text == bossText[2]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[3]);
                this.boss.setFrame(1);
            }
        }else if(currentText.text == bossText[3]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[4]);
                this.boss.setFrame(0);
                this.allowArrow = this.add.sprite(800, 300, 'allowArrow');
                this.allowArrow.setScale(0.3);
                this.denyArrow = this.add.sprite(130, 300, 'denyArrow');
                this.denyArrow.setScale(0.3);
                this.allowArrow.play('allow');
                this.denyArrow.play('deny');
                this.allowtext.x = this.allowArrow.x - 30;
                this.allowtext.y = this.allowArrow.y - 110;
                this.allowtext.setAlpha(1);
                this.denytext.x = this.denyArrow.x - 40;
                this.denytext.y = this.denyArrow.y - 110;
                this.denytext.setAlpha(1);
                this.rider1();
                this.nextrider = false;
                this.counted = false;
            }
        }else if(currentText.text == bossText[4]){

            //if the third character is flung out of bounds, go to next text
            if(this.riderNum == 1){
                currentText.text = this.typewriteTextWrapped(bossText[5]);
            }
        }else if (currentText.text == bossText[5]){
            this.allowArrow.destroy();
            this.denyArrow.destroy();
            this.allowtext.destroy();
            this.denytext.destroy();
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[6]);
                //have an arrow appear at the line
                this.arrow1 = this.add.sprite(330, 443, 'bouncingArrow');
                this.arrow1.setScale(0.2);
                this.arrow1.play('arrow');
            }

        }else if (currentText.text == bossText[6]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[7]);
                //have an arrow appear at the line
                this.arrow2 = this.add.sprite(275, 267, 'bouncingArrow');
                this.arrow2.setScale(0.2);
                this.arrow2.play('arrow');
            }
        }else if (currentText.text == bossText[7]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[8]);
                this.boss.setFrame(1);
                this.arrow1.destroy();
                this.arrow2.destroy();
                
            }
        }else if (currentText.text == bossText[8]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                //testing player on guest heights
                currentText.text = this.typewriteTextWrapped(bossText[9]);
                this.boss.setFrame(0);
                this.rider4();
                this.nextrider = false;
                this.counted = false;
            }
        }else if(currentText.text == bossText[9]){
            if(this.riderNum == 2 && this.nextrider == true){
                this.delay += 1;
                if(Math.round(this.delay/60) > 0.2){
                    this.rider5();
                    this.nextrider = false;
                    this.counted = false;
                };
            }
            if(this.riderNum == 3 && this.nextrider == true){
                this.delay += 1;
                if(Math.round(this.delay/60) > 0.2){
                    this.rider6();
                    this.nextrider = false;
                    this.counted = false;
                };      
            }
            if(this.riderNum == 4){
                //this.startdelay2 = true;
                currentText.text = this.typewriteTextWrapped(bossText[10]);
                //if(this.delay2/60 > 1.5){
                    this.wristband = this.add.sprite(850, 45, 'wristband1');
                    //this.startdelay2 = false;
                //};
                //this.wristband.setScale(1.5);
                this.rider7();
                this.nextrider = false;
                this.counted = false;
            }
        }else if(currentText.text == bossText[10]){
            if(this.riderNum == 5 && this.nextrider == true){
                this.delay += 1;
                if(Math.round(this.delay/60) > 0.2){
                    this.rider9();
                    this.nextrider = false;
                    this.counted = false;
                };
            }
            if(this.riderNum == 6){
                this.boss.setFrame(2);
                this.wristband.destroy();
                currentText.text = this.typewriteTextWrapped(bossText[11]);
                //make rule sign glow
                this.rulesSign.setAlpha(1);
                this.rulesSign.setFrame(1);
            }

        }else if(currentText.text == bossText[11]){
            
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = this.typewriteTextWrapped(bossText[12]);
                this.boss.setFrame(0);
                this.rulesSign.setFrame(0);
                
            }
        }else if(currentText.text == bossText[12]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                //let exactly 8 guests on
                currentText.text = this.typewriteTextWrapped(bossText[13]);
                
            }
        }else if(currentText.text == bossText[13]){
            //ready button appears
            this.readyButton.setAlpha(1);
            if(this.pointer.isDown && this.readyButtonHover == true){
                this.scene.start("day1IntroScene");
                //this.buttonPress.play();
            }; 
            if(this.nextrider == true){
                this.delay += 1;
                if(Math.round(this.delay/60) > 0.2){
                    this.newCharacters();
                    this.nextrider = false;
                };

            }
        }

    
    };
}