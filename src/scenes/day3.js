class day3 extends Phaser.Scene{
    constructor(){
        super("day3Scene");
    }
    preload(){

        if(day1Done == false || day2Done == false){
            this.load.image('ground', './assets/ground.png');
            this.load.spritesheet('doneButton', './assets/doneButton.png', {frameWidth: 100, frameHeight: 100, startFrame: 0, endFrame: 1});
            //Character Bodies
            this.load.spritesheet('cat1', './assets/cat1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1}); 
            this.load.spritesheet('cat2', './assets/cat2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
            this.load.spritesheet('duck1', './assets/duck1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
            this.load.spritesheet('duck2', './assets/duck2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
            this.load.spritesheet('duck3', './assets/duck3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
    
            //Accessories (organized so that certain accessories don't overlap)
            //head accessories
            this.load.image('cowhat1', './assets/cowhat1.png');
            this.load.image('cowhat2', './assets/cowhat2.png');
            this.load.image('cowhat3', './assets/cowhat3.png');
            this.load.image('partyhat', './assets/partyhat.png');
            //held accessories
            this.load.image('soda1', './assets/soda1.png');
            this.load.image('soda2', './assets/soda2.png');
            this.load.image('knife', './assets/knife.png');
            this.load.image('corndog', '/assets/corndog.png');
            //left wrist accessories
            this.load.image('watch', './assets/watch.png');
            this.load.image('wristband1', './assets/wristband1.png');
            this.load.image('wristband2', './assets/wristband2.png');
            this.load.image('wristband3', './assets/wristband3.png');
            //face accessories
            this.load.image('moustache', './assets/moustache.png');
            this.load.image('scar', './assets/scar.png');
            this.load.image('bandaid', './assets/bandaid.png');
            //waist accessories
            this.load.image('phanny1', './assets/phanny1.png');
            this.load.image('phanny2', './assets/phanny2.png');
            this.load.image('gucciBelt', './assets/gucciBelt.png');
    
            //left leg accessories
            this.load.image('ankleMoniter', './assets/ankleMoniter.png');
    
            //neck accessories
            this.load.image('bdayNecklace', './assets/bdayNecklace.png');
    
            //wrist accessories 2
            this.load.image('handcuffs', './assets/handcuffs.png')
        }


    };

    create(){
        day3Done = true;
        this.add.text(70, 70, "DAY 3");
        //temporary instructions text
        this.add.text(130, 100, "Use the mouse to fling guests RIGHT to allow them to ride and LEFT to reject them.");
        this.add.text(130, 120, "Let no more and no less than 8 guests ride");
        this.add.text(130, 140, "Not Allowed: hats, food/drinks, weapons, criminals");
        this.add.text(130, 160, "Today's wristband color: pink");
        //will help pick random bodies and accessories
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        //making a ground for character to fall on
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        //how many customers you let on the ride this round
        customers = 0;
        //will delay the next character spawn in
        this.delay = 0;
        //implementing a game timer
        this.gametimer = 4000;
        let gametimerConfig = {
            fontFamily: 'Chalkduster',
            fontSize: '30px',
            color: 'white',
            align: 'center',
            stroke: '#415392', //#526aba
            strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };
        //displaying the timer
        console.log("game timer", this.gametimer);
        this.timertext = this.add.text(864, 27, this.gametimer, gametimerConfig).setOrigin(0);
        //if the mouse is hovering over the down button
        this.doneButtonHover = false;
        //the riders are reset 
        allRiders_array = [];
        //adding sounds
        this.whoosh = this.sound.add('whoosh');
        this.buttonPress = this.sound.add('buttonPress');
        this.oceanWaves = this.sound.add('oceanWaves');
        this.correct = this.sound.add('correct');
        this.oceanWaves.play();
        this.oceanWaves.loop = true;
        this.oceanWaves.volume = 0.3;
        
        //spawn the first character (function is below)
        this.newCharacter();

        this.input.dragDistanceThreshold = 16;
        this.physics.add.collider(this.p1, platforms);
        this.input.on('drag', (_pointer, _gameObject, dragX, dragY)=>{
            this.p1.x = dragX;
            this.p1.y = dragY;
            this.p1.setFrame(1);
            this.p1.body.allowGravity = false;
        });
        this.input.on('dragend', (pointer, _gameObject)=>{
            //this.p1.setVelocityX(dragX);
            //this.p1.velocityFromAngle(50, 200, this.p1.body.velocity);
            this.p1.setFrame(0);
            this.p1.body.allowGravity = true;
            //flying across the screen
            if(this.p1.x < 320){
                this.whoosh.play();
                //this.p1.setRotation(20);
                this.p1.setVelocityX(-700);
                this.p1.setVelocityY(-300);
            }
            if(this.p1.x > 700){
                this.whoosh.play();
                //this.p1.setRotation(-20);
                this.p1.setVelocityX(700);
                this.p1.setVelocityY(-300);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        this.correct.play();
                    },
                    loop: false
                })
            }
        });
        //initilizing mouse
        this.pointer = this.input.activePointer;

        //done button glow when hovered over
        this.doneButton = this.add.sprite(860, 620, 'doneButton').setInteractive();
        this.doneButton.on("pointerover", () => {
            this.doneButton.setFrame(1);
            //will tell code in update to go to next scene
            this.doneButtonHover = true;

        });
        this.doneButton.on("pointerout", () => {
            this.doneButton.setFrame(0);
            this.doneButtonHover = false;
        });

    };
    newCharacter(){
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        function randomDecimil(mn,mx){
            return Math.random() * (mx - mn) + mn
        }
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');
        //clear the accessories array for the new rider
        riderAccessories_array = []
        //respawn delay is reset
        this.delay = 0;
        //set the scale of them which will affect height
        this.height = randomDecimil(0.2, 0.5);
        this.scale = this.height;

        //console.log('height:', this.scale);
        //add height to info array (will be first element)
        riderAccessories_array.push(this.scale);
                //randomly generate which character body
        //add all character bodies to an array
        this.body_array = ['cat1', 'cat2', 'duck1', 'duck2', 'duck3', 'bear1', 'bear2'];
        //pick a random body
        this.pick_body = random(0,this.body_array.length - 1);
        // Add the character
        this.p1 = this.physics.add.sprite(halfscreenwidth, 400, this.body_array[this.pick_body], 0).setInteractive();
        riderAccessories_array.push(this.body_array[this.pick_body]);
        this.p1.setScale(this.scale);
        this.p1.body.setSize(400, 990, 0.1, 1500);
        this.input.setDraggable(this.p1);
        // object has to be dragged by 16 pixels to be draggable 
        this.input.dragDistanceThreshold = 16;
        this.physics.add.collider(this.p1, platforms);
//Accessory Generation!
        //first generate if there even will be an accessory for each category (can change likelyhood percentages)
        //will there be a hat
        this.hat_chance = random(0, 100);
        //console.log('this.hat_chance', this.hat_chance);
        this.hat = false;
        if(this.hat_chance >= 77){ 
            this.hat = true;
        }
        //then put all accessories in the aproporate arrays (making these arrays global)
        head_array = ['cowhat1', 'cowhat2', 'cowhat3', 'partyhat'];

        if(this.hat == true){
            this.pick_hat = random(0,head_array.length - 1);
            riderAccessories_array.push(head_array[this.pick_hat]);
            this.head_accessory = this.add.sprite(this.p1.x, this.p1.y +8, head_array[this.pick_hat], 0);
            this.head_accessory.setScale(this.scale);
        };
        
        //held accessories
        this.hold_chance = random(0, 100);
        //console.log('this.hold_chance', this.hold_chance);
        this.hold = false;
        if(this.hold_chance >= 65){ //85
            this.hold = true;
        }
        //then put all accessories in the aproporate arrays
        hold_array = ['soda1', 'soda2', 'knife', 'corndog'];

        if(this.hold == true){
            this.pick_hold = random(0,hold_array.length - 1);
            riderAccessories_array.push(hold_array[this.pick_hold]);
            this.hold_accessory = this.add.sprite(this.p1.x, this.p1.y +8, hold_array[this.pick_hold], 0);
            this.hold_accessory.setScale(this.scale);
        };

        //wrist accessories
        this.wrist_chance = random(0, 100);
        //console.log('this.wrist_chance', this.wrist_chance);
        this.wrist = false;
        if(this.wrist_chance >= 10){
            this.wrist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        wrist_array = ['watch', 'wristband3', 'wristband3', 'wristband3', 'wristband3', 'wristband3', 'wristband1', 'wristband3','wristband3'];

        if(this.wrist == true){
            this.pick_wrist = random(0,wrist_array.length - 1);
            riderAccessories_array.push(wrist_array[this.pick_wrist]);
            this.wrist_accessory = this.add.sprite(this.p1.x, this.p1.y, wrist_array[this.pick_wrist], 0);
            this.wrist_accessory.setScale(this.scale);
        }else{
            riderAccessories_array.push("no wristband");
        }
        
        //wrist 2 accessories (wrist accessories that can spawn at the same time as the other wrist accessories)
        this.wrist2_chance = random(0, 100);
        //console.log('this.wrist_chance', this.wrist_chance);
        this.wrist2 = false;
        if(this.wrist2_chance >= 88){
            this.wrist2 = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        wrist2_array = ['handcuffs', 'watch'];

        if(this.wrist2 == true){
            this.pick_wrist2 = random(0,wrist2_array.length - 1);
            riderAccessories_array.push(wrist2_array[this.pick_wrist2]);
            this.wrist2_accessory = this.add.sprite(this.p1.x, this.p1.y, wrist2_array[this.pick_wrist2], 0);
            this.wrist2_accessory.setScale(this.scale);
        };

        //face accessories
        this.face_chance = random(0, 100);
        //console.log('this.face_chance', this.face_chance);
        this.face = false;
        if(this.face_chance >= 70){
            this.face = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else) (need to fix scar)
        face_array = ['moustache', 'bandaid'];

        if(this.face == true){
            this.pick_face = random(0,face_array.length - 1);
            riderAccessories_array.push(face_array[this.pick_face]); 
            this.face_accessory = this.add.sprite(this.p1.x, this.p1.y, face_array[this.pick_face], 0);
            this.face_accessory.setScale(this.scale);
        };

        //waist accessories
        this.waist_chance = random(0, 100);
        //console.log('this.waist_chance', this.waist_chance);
        this.waist = false;
        if(this.waist_chance >= 70){
            this.waist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        waist_array = ['phanny1', 'phanny2', 'gucciBelt'];

        if(this.waist == true){
            this.pick_waist = random(0,waist_array.length - 1);  
            riderAccessories_array.push(waist_array[this.pick_waist]);  
            this.waist_accessory = this.add.sprite(this.p1.x, this.p1.y, waist_array[this.pick_waist], 0);
            this.waist_accessory.setScale(this.scale);
        };

        //left leg accessory
        this.leg_chance = random(0, 100);
        //console.log('this.leg_chance', this.leg_chance);
        this.leg = false;
        if(this.leg_chance >= 85){
            this.leg = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        leg_array = ['ankleMoniter'];

        if(this.leg == true){
            this.pick_leg = random(0,leg_array.length - 1);
            riderAccessories_array.push(leg_array[this.pick_leg]);
            this.leg_accessory = this.add.sprite(500, 500, leg_array[this.pick_leg], 0);
            this.leg_accessory.setScale(this.scale);
        };

        //neck accessory
        this.neck_chance = random(0, 100);
        //console.log('this.leg_chance', this.leg_chance);
        this.neck = false;
        if(this.neck_chance >= 70){
            this.neck = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        neck_array = ['bdayNecklace'];

        if(this.neck == true){
            this.pick_neck = random(0,neck_array.length - 1);
            riderAccessories_array.push(neck_array[this.pick_neck]);
            this.neck_accessory = this.add.sprite(500, 500, neck_array[this.pick_neck], 0);
            this.neck_accessory.setScale(this.scale);
        };
        //adding accessories to an array (this will represent each character and be nested in allRiders_array if allowed to ride)
        console.log('riderAccessories_array:', riderAccessories_array);
    };


    update(){
        //for game timer
        this.gametimer -= 1;
        this.timertext.text = Math.round(this.gametimer/60);
        //if the timer runs out, go to next scene
        if(Math.round(this.gametimer/60) < 0){
            this.scene.start("coasterScene");
        }

        //constntly have the accessories follow the character (but only if they are generated)
        if(this.hold == true){
            this.hold_accessory.x = this.p1.x;
            this.hold_accessory.y = this.p1.y;
        };
        if(this.hat == true){
            this.head_accessory.x = this.p1.x;
            this.head_accessory.y = this.p1.y +8;
        };
        if(this.wrist == true){
            this.wrist_accessory.x = this.p1.x;
            this.wrist_accessory.y = this.p1.y;
        };
        if(this.face == true){
            this.face_accessory.x = this.p1.x;
            this.face_accessory.y = this.p1.y;
        };
        if(this.waist == true){
            this.waist_accessory.x = this.p1.x;
            this.waist_accessory.y = this.p1.y;
        };
        if(this.leg == true){
            this.leg_accessory.x = this.p1.x;
            this.leg_accessory.y = this.p1.y;
        };
        if(this.neck == true){
            this.neck_accessory.x = this.p1.x;
            this.neck_accessory.y = this.p1.y;
        };
        if(this.wrist2 == true){
            this.wrist2_accessory.x = this.p1.x;
            this.wrist2_accessory.y = this.p1.y;
        };

        //if the character is flung to the right (aka allowed to ride)
        if(this.p1.x > 1000 || this.p1.x < -50){
            this.p1.destroy();

            //will spawn a new character (see below)
            this.needCharacter = true;
            //destroy all accessories if they exist
            if(this.hold == true){
                this.hold_accessory.destroy();
            };
            if(this.hat == true){
                this.head_accessory.destroy();
            };
            if(this.wrist == true){
                this.wrist_accessory.destroy();
            };
            if(this.face == true){
                this.face_accessory.destroy();
            };
            if(this.waist == true){
                this.waist_accessory.destroy();
            };
            if(this.leg == true){
                this.leg_accessory.destroy();
            };
            if(this.neck == true){
                this.neck_accessory.destroy();
            };
            if(this.wrist2 == true){
                this.wrist2_accessory.destroy();
            }
        }
        //spawn a new character
        if(this.needCharacter == true){
            //set a timer so there is a delay
            this.delay += 1;
            if(Math.round(this.delay/60) > 0.2){
                //add the character and their charastics to the array
                if(this.p1.x > 960){
                    customers += 1;
                    console.log('customers', customers);
                    allRiders_array.push(riderAccessories_array);
                    console.log('all riders array', allRiders_array);
                }
                this.newCharacter();
                this.needCharacter = false;
            };
        }
        //will go to score scene if the done button is clicked
        if(this.pointer.isDown && this.doneButtonHover == true){
            this.buttonPress.play();
            this.scene.start("coasterScene");
        }; 
    };
}