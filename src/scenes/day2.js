class day2 extends Phaser.Scene{
    constructor(){
        super("day2Scene");
    }
    preload(){


    };

    create(){
        day2Done = true;
        this.add.text(70, 70, "DAY 2");
        this.add.tileSprite(0,80, 960, 720, 'day2Background').setOrigin(0,0);
        this.rulesSign = this.add.sprite(15, -100, 'rulesSign').setOrigin(0, 0);
        this.header = this.add.sprite(0, 0, 'header').setOrigin(0,0);
        this.dayheader = this.add.sprite(0, 0, 'day2Header').setOrigin(0,0);
        this.day2Title = this.add.sprite(335, 67, 'day2Title').setOrigin(0,0);
        this.day2Title.setScale(0.3);
        //temporary instructions text
        // this.add.text(130, 100, "Use the mouse to fling guests RIGHT to allow them to ride and LEFT to reject them.");
        // this.add.text(130, 120, "Let no more and no less than 8 guests ride");
        // this.add.text(130, 140, "Not Allowed: hats, food/drinks, weapons, criminals");
        // this.add.text(130, 160, "Today's wristband color: yellow");
        //will help pick random bodies and accessories
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        //making a ground for character to fall on
        let platforms = this.physics.add.staticGroup();
        platforms.create(480, 1020, 'ground');
        //how many customers you let on the ride this round
        ridingCustomers = 0;
        //how many customers you dont let on a ride this round
        nonridingCustomers = 0;

        this.exitSign = this.add.sprite(-50, 490, 'exitSign').setOrigin(0, 0);
        this.enterSign = this.add.sprite(620, 490, 'enterSign').setOrigin(0, 0);
        this.heightPole = this.add.sprite(20, -6, 'heightPole').setOrigin(0,0);
        this.exitSign.setScale(0.4);
        this.enterSign.setScale(0.4);

        //will delay the next character spawn in
        this.delay = 0;

        //this.capacityMeter = this.add.sprite(225, 170, 'capacityMeter');
        //this.capacityMeter.setScale(0.9);

        this.timerClock = this.add.sprite(754, 93, 'timerClock');
        this.timerClock.setScale(0.65);

        //implementing a game timer
        this.originalGameTimer = 4500;
        this.gametimer = 4500;
        let gametimerConfig = {
            fontFamily: 'Copperplate',
            fontSize: '40px',
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
        this.timertext = this.add.text(830, 40, this.gametimer, gametimerConfig).setOrigin(0);
        this.timertext.setAlpha(0);
        this.wristbandCheck = this.add.image(420, 15, 'wristband2');
        //this.riderCount = this.add.text(45, 10, 'Riders: '+ ridingCustomers, gametimerConfig).setOrigin(0);
        //if the mouse is hovering over the down button
        this.readyButtonHover = false;
        //the riders are reset 
        allRiders_array = [];

        //adding sounds
        this.whoosh = this.sound.add('whoosh');
        this.buttonPress = this.sound.add('buttonPress');
        this.correct = this.sound.add('correct');
        //this.oceanWaves = this.sound.add('oceanWaves');
        //this.oceanWaves.play();
        //this.oceanWaves.loop = true;
        //this.oceanWaves.volume = 0.3;
        this.tick1 = this.sound.add('tick1');
        this.tick2 = this.sound.add('tick2');
        this.lightbulb = this.sound.add('lightbulb');
        this.lightbulb.volume = 0.4;

        this.ground = this.add.sprite(480, 390, 'ground');
        
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
                this.p1.setVelocityX(-800);
                this.p1.setVelocityY(-300);
            }
            if(this.p1.x > 650){
                this.whoosh.play();
                //this.p1.setRotation(-20);
                this.p1.setVelocityX(800);
                this.p1.setVelocityY(-300);
                this.time.addEvent({
                    delay: 100,
                    callback: ()=>{
                        //this.correct.play();
                    },
                    loop: false
                })
            }
            
        });
        //initilizing mouse
        this.pointer = this.input.activePointer;

        //done button glow when hovered over
        this.readyButton = this.add.sprite(860, 70, 'readyButton').setInteractive();
        this.readyButton.setAlpha(0);
        this.readyButton.setScale(0.4)
        this.readyButton.on("pointerover", () => {
            this.readyButton.setFrame(1);
            //will tell code in update to go to next scene
            this.readyButtonHover = true;

        });
        this.readyButton.on("pointerout", () => {
            this.readyButton.setFrame(0);
            this.readyButtonHover = false;
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
        platforms.create(480, 1020, 'ground');
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
        this.body_array = ['cat1', 'cat2', 'cat3', 'duck1', 'duck2', 'duck3', 'bear1', 'bear2', 'fox'];
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
        if(this.hat_chance >= 80){ 
            this.hat = true;
        }
        //then put all accessories in the aproporate arrays (making these arrays global)
        head_array = ['cowhat1', 'cowhat2', 'cowhat3', 'partyhat', 'tiara'];

        if(this.hat == true){
            this.pick_hat = random(0,head_array.length - 1);
            riderAccessories_array.push(head_array[this.pick_hat]);
            this.head_accessory = this.add.sprite(this.p1.x, this.p1.y +8, head_array[this.pick_hat], 0);
            this.head_accessory.setScale(this.scale);
        };
        

        //wrist accessories
        this.wrist_chance = random(0, 100);
        //console.log('this.wrist_chance', this.wrist_chance);
        this.wrist = false;
        if(this.wrist_chance >= 5){
            this.wrist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        wrist_array = ['watch', 'wristband2', 'wristband2', 'wristband2', 'wristband2', 'wristband2', 'wristband2', 'wristband2', 'wristband2','wristband3', 'wristband2', 'wristband2','wristband2'];

        if(this.wrist == true){
            this.pick_wrist = random(0,wrist_array.length - 1);
            riderAccessories_array.push(wrist_array[this.pick_wrist]);
            this.wrist_accessory = this.add.sprite(this.p1.x, this.p1.y, wrist_array[this.pick_wrist], 0);
            this.wrist_accessory.setScale(this.scale);
        }else{
            riderAccessories_array.push("no wristband");
        };
        
        //wrist 2 accessories (wrist accessories that can spawn at the same time as the other wrist accessories)
        this.wrist2_chance = random(0, 100);
        //console.log('this.wrist_chance', this.wrist_chance);
        this.wrist2 = false;
        if(this.wrist2_chance >= 97){
            this.wrist2 = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        wrist2_array = ['handcuffs'];

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
        if(this.face_chance >= 75){
            this.face = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else) (need to fix scar)
        face_array = ['moustache', 'bandaid', 'glasses1', 'glasses2', 'mask', 'clownNose', 'pacifier1', 'pacifier2'];

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
        if(this.waist_chance >= 30){
            this.waist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        waist_array = ['phanny1', 'phanny2', 'gucciBelt', 'tutu', 'bikini1', 'bikini2', 'bikini3', 'bikini4', 'bikini5', 
        'swimTrunks1', 'swimTrunks2', 'swimTrunks3', 'swimTrunks4'];

        if(this.waist == true){
            this.pick_waist = random(0,waist_array.length - 1);  
            riderAccessories_array.push(waist_array[this.pick_waist]);  
            this.waist_accessory = this.add.sprite(this.p1.x, this.p1.y, waist_array[this.pick_waist], 0);
            this.waist_accessory.setScale(this.scale);
        };

        //held accessories
        this.hold_chance = random(0, 100);
        //console.log('this.hold_chance', this.hold_chance);
        this.hold = false;
        if(this.hold_chance >= 80){ //85
            this.hold = true;
        }
        //then put all accessories in the aproporate arrays
        hold_array = ['soda1', 'soda2', 'knife', 'corndog', 'donut', 'scissors', 'spatula'];

        if(this.hold == true){
            this.pick_hold = random(0,hold_array.length - 1);
            riderAccessories_array.push(hold_array[this.pick_hold]);
            this.hold_accessory = this.add.sprite(this.p1.x, this.p1.y +8, hold_array[this.pick_hold], 0);
            this.hold_accessory.setScale(this.scale);
        };

        //left leg accessory
        this.leg_chance = random(0, 100);
        //console.log('this.leg_chance', this.leg_chance);
        this.leg = false;
        if(this.leg_chance >= 95){
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
        if(this.neck_chance >= 85){
            this.neck = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        neck_array = ['chain', 'shellNecklace', 'bowtie'];

        if(this.neck == true){
            this.pick_neck = random(0,neck_array.length - 1);
            riderAccessories_array.push(neck_array[this.pick_neck]);
            this.neck_accessory = this.add.sprite(500, 500, neck_array[this.pick_neck], 0);
            this.neck_accessory.setScale(this.scale);
        };

        //adding accessories to an array (this will represent each character and be nested in allRiders_array if allowed to ride)
        console.log('riderAccessories_array:', riderAccessories_array);


    };
    advanceScene(){
        this.time.addEvent({
            delay: 700,
            callback: ()=>{
                //this.buttonPress.play();
                this.scene.start("coasterScene");
            },
            loop: false
        }) 
    }


    update(){
        //for game timer
        this.gametimer -= 1;
        this.timertext.text = Math.round(this.gametimer/60);
        //this.riderCount.text = 'Riders: ' + ridingCustomers;
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

        //resets character if they fall off the platform 
        if(this.p1.y > game.config.height){
            this.p1.y = 400;
        }

        //if the character is flung to the right (aka allowed to ride)
        if(this.p1.x > 1000 || this.p1.x < -50){
            this.p1.destroy();
            if(ridingCustomers < 8){
                //will spawn a new character (see below)
                this.needCharacter = true;
            }else{
                this.advanceScene();
                //this.readyButton.setAlpha(1);
            }


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
                    ridingCustomers += 1;
                    console.log('customers', ridingCustomers);
                    allRiders_array.push(riderAccessories_array);
                    if(ridingCustomers < 8){
                        this.lightbulb.play();
                        console.log('all riders array', allRiders_array);
                        this.newCharacter();
                    }else{
                        this.buttonPress.play();
                    }
                }else if(this.p1.x < 0){
                    if(ridingCustomers < 8){
                        this.newCharacter();
                    }
                }
                this.needCharacter = false;
            };
        }
        //change capacity meter to match amount of riders
        if (ridingCustomers == 0){
            this.header.setFrame(0);
        }
        if (ridingCustomers == 1){
            this.header.setFrame(1);
        }
        if (ridingCustomers == 2){
            this.header.setFrame(2);
        }
        if (ridingCustomers == 3){
            this.header.setFrame(3);
        }
        if (ridingCustomers == 4){
            this.header.setFrame(4);
        }
        if (ridingCustomers == 5){
            this.header.setFrame(5);
        }
        if (ridingCustomers == 6){
            this.header.setFrame(6);
        }
        if (ridingCustomers == 7){
            this.header.setFrame(7);
        }
        if (ridingCustomers == 8){
            this.header.setFrame(8);
        }

        //the timer clock ticking up
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - (this.originalGameTimer/8))){
            this.timerClock.setFrame(1);
            this.tick1.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*2))){
            this.timerClock.setFrame(2);
            this.tick2.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*3))){
            this.timerClock.setFrame(3);
            this.tick1.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*4))){
            this.timerClock.setFrame(4);
            this.tick2.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*5))){
            this.timerClock.setFrame(5);
            this.tick1.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*6))){
            this.timerClock.setFrame(6);
            this.tick2.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*7))){
            this.timerClock.setFrame(7);
            this.tick1.play();
        }
        if(Math.floor(this.gametimer) == Math.floor(this.originalGameTimer - ((this.originalGameTimer/8)*8))){
            this.timerClock.setFrame(8);
            this.tick2.play();
        }
        //will go to score scene if the done button is clicked
        if(this.pointer.isDown && this.readyButtonHover == true){
            //this.buttonPress.play();
            this.scene.start("coasterScene");
        }; 
    };
}