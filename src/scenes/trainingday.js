class trainingday extends Phaser.Scene{
    constructor(){
        super("trainingdayScene");
    }
    preload(){
        this.load.image('day1Background', './assets/background-day1.png');
        this.load.image('ground', './assets/ground.png');
        this.load.spritesheet('readyButton', './assets/readyButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});

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


    }
    create(){
        //if training day was completed
        trainingDone = true;
        this.add.tileSprite(0,0, 960, 720, 'day1Background').setOrigin(0,0);
        this.textbox = this.add.rectangle(250, 20, 500, 115, 0xffffff).setOrigin(0, 0);
        this.ground = this.add.sprite(400, 695, 'ground');
        //number to keep track of which test rider we are on
        this.riderNum = 0;
        this.delay = 0;
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
            console.log('here');
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
                //this.whoosh.play();
                this.testRider.setVelocityX(-800);
                this.testRider.setVelocityY(-100);
            }
            if(this.testRider.x > 650){ //thrown to the right
                //this.whoosh.play()
                this.testRider.setVelocityX(800);
                this.testRider.setVelocityY(-100);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        //this.correct.play();
                    },
                    loop: false
                })
            }
        });
        //text configurations for all of the boss's text
        let mumblingConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            color: 'black',
            align: 'left',
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
        let instructionsConfig = {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: 'white',
            align: 'center',
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };
        //create an array to hold all the dialogue
        bossText = [
            "Ugh, another pimply teenage I have to train.",
            "OH there you are! Welcome to your new job as a ride \noperator at The Boardwalk!",
            "What was that mumbling about buying your mom a birthday\n present? Yeah I don't care but you should be able to\n afford it after three days of work.",
            "That is, if you manage to not get fired.",
            "Lets get started. Use your mouse to fling guests \nRIGHT to allow them to ride and \nLEFT to deny them.",
            "Good job.",
            "Guests must be taller than this line...",
            "...and shorter than this to ride.",
            "Oh you want to know if ears count? Tell me, do you think \nhats and hair should count?!",
            "Lets practice",
            "Make sure guests have the correct wristband! \nNO FREE RIDES!!! Today's color is BLUE.",
            "Oh and VERY important: no HATS, FOOD, DRINKS, WEAPONS, \nor CRIMINALS allowed!!!",
            "But MOST IMPORTANTLY, allow NO MORE than 8 guests ride \nat a time and also no less. Don't be losing me money.",
            "Go ahead and Practice. Once you've let EXACTLY 8 guests \non, press this ready button. You'll have to keep track \nof how many guests you let on.",
            "See you tomorrow at your first shift!"
        ];
        //intructions on how to advance text
        instructions = this.add.text(410, 140, "(press SPACE to advance text)", instructionsConfig);
        //print the first boss's phrase
        currentText = this.add.text(270, 50, bossText[0], mumblingConfig);
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
        //have advance text instructions fade in and out then dissapear at first click

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
                     //console.log(this.riderNum);
                }
                
   
            };
        }
        if(this.wrist == true){
            this.wrist_accessory.x = this.testRider.x;
            this.wrist_accessory.y = this.testRider.y;
        };

        //console.log(this.riderNum);


        
        //have text advance when space is pressed
        if(currentText.text == bossText[0]){
            //get rid of "press Space to advance"
            //instructions.destroy();
            //go to next phrase
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[1];
            }
        }else if(currentText.text == bossText[1]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[2];
            }
        }else if(currentText.text == bossText[2]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[3];
            }
        }else if(currentText.text == bossText[3]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[4];
                this.rider1();
                this.nextrider = false;
                this.counted = false;
            }
        }else if(currentText.text == bossText[4]){
            //if the third character is flung out of bounds, go to next text
            if(this.riderNum == 1){
                currentText.text = bossText[5];
            }
        }else if (currentText.text == bossText[5]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[6];
                //have an arrow appear at the line
            }

        }else if (currentText.text == bossText[6]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[7];
                //have an arrow appear at the line
            }
        }else if (currentText.text == bossText[7]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[8];
                
            }
        }else if (currentText.text == bossText[8]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                //testing player on guest heights
                currentText.text = bossText[9];
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
                currentText.text = bossText[10];
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
                currentText.text = bossText[11];
            }

        }else if(currentText.text == bossText[11]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                currentText.text = bossText[12];
            }
        }else if(currentText.text == bossText[12]){
            if(Phaser.Input.Keyboard.JustDown(keySpace)){
                //let exactly 8 guests on
                currentText.text = bossText[13];
                //ready button appears
                this.readyButton.setAlpha(1);
            }
        }else if(currentText.text == bossText[13]){
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