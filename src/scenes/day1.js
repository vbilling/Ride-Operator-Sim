class day1 extends Phaser.Scene{
    constructor(){
        super("day1Scene");
    }
    preload(){
        //Accessories (organized so that certain accessories don't overlap)
        //head accessories
        this.load.image('cowhat1', './assets/cowhat1.png');
        this.load.image('cowhat2', './assets/cowhat2.png');
        this.load.image('cowhat3', './assets/cowhat3.png');
        this.load.image('partyhat', './assets/partyhat.png');
        this.load.image('tiara', './assets/tiara.png');

        //held accessories
        this.load.image('soda1', './assets/soda1.png');
        this.load.image('soda2', './assets/soda2.png');
        this.load.image('knife', './assets/knife.png');
        this.load.image('corndog', '/assets/corndog.png');
        this.load.image('donut', '/assets/donut.png');
        this.load.image('scissors', '/assets/scissors.png');
        this.load.image('spatula', '/assets/spatula.png');

        //left wrist accessories
        this.load.image('wristband1', './assets/wristband1.png');
        this.load.image('wristband2', './assets/wristband2.png');
        this.load.image('wristband3', './assets/wristband3.png');
        this.load.image('watch', './assets/watch.png');

        //face accessories
        this.load.image('moustache', './assets/moustache.png');
        this.load.image('scar', './assets/scar.png');
        this.load.image('bandaid', './assets/bandaid.png');
        this.load.image('clownNose', './assets/clownNose.png');
        this.load.image('mask', './assets/mask.png');
        this.load.image('glasses1', './assets/glasses1.png');
        this.load.image('glasses2', './assets/glasses2.png');
        this.load.image('pacifier1', './assets/pacifier1.png');
        this.load.image('pacifier2', './assets/pacifier2.png');
        
        //waist accessories
        this.load.image('phanny1', './assets/phanny1.png');
        this.load.image('phanny2', './assets/phanny2.png');
        this.load.image('gucciBelt', './assets/gucciBelt.png');
        this.load.image('tutu', './assets/tutu.png');

        //left leg accessories
        this.load.image('ankleMoniter', './assets/ankleMoniter.png');

        //wrist accessories 2
        this.load.image('handcuffs', './assets/handcuffs.png')

        //neck accessories
        this.load.image('bdayNecklace', './assets/bdayNecklace.png');
        this.load.image('chain', './assets/chain.png');
        this.load.image('shellNecklace', './assets/shellNecklace.png');
        this.load.image('bowtie', './assets/bowtie.png');

    }

    create(){
        //load background
        this.add.tileSprite(0,0, 960, 720, 'day1Background').setOrigin(0,0);
        this.rulesSign = this.add.sprite(0, 0, 'rulesSign').setOrigin(0, 0);
        this.day1Title = this.add.sprite(0, -20, 'day1Title').setOrigin(0,0);
        //you have done day one and will help track which wristbands are correct
        day1Done = true;

        //temporary instructions text
        // this.add.text(130, 100, "Use the mouse to fling guests RIGHT to allow them to ride and LEFT to reject them.");
        // this.add.text(130, 120, "Let no more and no less than 8 guests ride");
        // this.add.text(130, 140, "Not Allowed: hats, food/drinks, weapons, criminals");
        // this.add.text(130, 160, "Today's wristband color: blue");

        //will help pick random bodies and accessories
        function random(mn, mx) {
            return Math.round(Math.random() * (mx - mn) + mn);
        };
        //making a ground for character to fall on
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 695, 'ground');

        //how many customers you let on the ride this round
        ridingCustomers = 0;

        //how many customers you dont let on a ride this round
        nonridingCustomers = 0;

        //will delay the next character spawn in
        this.delay = 0;
        //day 1 title
        //this.day1Title = this.add.image(0, 0, 'day1Title').setOrigin(0,0);
        //this.day1Title.setAlpha(0);

        //adding sounds
        this.whoosh = this.sound.add('whoosh');
        this.buttonPress = this.sound.add('buttonPress');
        this.correct = this.sound.add('correct');
        this.oceanWaves = this.sound.add('oceanWaves');
        this.oceanWaves.play();
        this.oceanWaves.loop = true;
        this.oceanWaves.volume = 0.3;

        this.exitSign = this.add.sprite(-50, 490, 'exitSign').setOrigin(0, 0);
        this.enterSign = this.add.sprite(620, 490, 'enterSign').setOrigin(0, 0);
        this.heightPole = this.add.sprite(0, 0, 'heightPole').setOrigin(0,0);
        this.exitSign.setScale(0.4);
        this.enterSign.setScale(0.4);

        //will count up for a text fade in timer
        this.clock = 0;

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
        this.timertext = this.add.text(700, 40, this.gametimer, gametimerConfig).setOrigin(0);

        //if the mouse is hovering over the down button
        this.readyButtonHover = false;

        //the riders are reset 
        allRiders_array = [];
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
            if(this.p1.x < 320){ //thrown to the left
                this.whoosh.play();
                //this.p1.setRotation(20);
                this.p1.setVelocityX(-800);
                this.p1.setVelocityY(-100);
            }
            if(this.p1.x > 650){ //thrown to the right
                this.whoosh.play();
                //this.p1.setRotation(-20);
                this.p1.setVelocityX(800);
                this.p1.setVelocityY(-100);
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
        this.readyButton = this.add.sprite(860, 70, 'readyButton').setInteractive();
        this.readyButton.setAlpha(0);
        this.readyButton.setScale(0.4);
        this.readyButton.on("pointerover", () => {
            this.readyButton.setFrame(1);
            //will tell code in update to go to next scene
            this.readyButtonHover = true;

        });
        this.readyButton.on("pointerout", () => {
            this.readyButton.setFrame(0);
            this.readyButtonHover = false;
        });
        // this.time.addEvent({
        //     delay: 100,
        //     callback: ()=>{
        //         this.readyButton.setFrame(1);
        //         this.time.addEvent({
        //             delay: 100,
        //             callback: ()=>{
        //                 this.readyButton.setFrame(0);
        
        //             },
        //             loop: true,
        //         });
        //     },
        //     loop: true,
        // })



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

        console.log('height:', this.scale);
        //add height to info array (will be first element)
        riderAccessories_array.push(this.scale);
        

        //randomly generate which character body
        //add all character bodies to an array
        this.body_array = ['cat1', 'cat2',  'duck1', 'duck2', 'duck3', 'bear1', 'bear2', 'cat3', 'fox']; 
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
        if(this.hat_chance >= 88){ 
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
        if(this.hold_chance >= 95){ 
            this.hold = true;
        }
        //then put all accessories in the aproporate arrays
        hold_array = ['soda1', 'soda2', 'knife'];   

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
        if(this.wrist_chance >= 1){
            this.wrist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        wrist_array = ['watch', 'wristband1', 'wristband1', 'wristband1', 'wristband2', 'wristband3', 'wristband1', 'wristband1','wristband1'];

        if(this.wrist == true){
            this.pick_wrist = random(0,wrist_array.length - 1);
            riderAccessories_array.push(wrist_array[this.pick_wrist]);
            this.wrist_accessory = this.add.sprite(this.p1.x, this.p1.y, wrist_array[this.pick_wrist], 0);
            this.wrist_accessory.setScale(this.scale);
        }else{
            riderAccessories_array.push("no wristband");
        }
        //face accessories
        this.face_chance = random(0, 100);
        //console.log('this.face_chance', this.face_chance);
        this.face = false;
        if(this.face_chance >= 90){
            this.face = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else) (need to fix scar)
        face_array = ['moustache', 'bandaid', 'mask', 'clownNose', 'glasses1', 'glasses2', 'pacifier1', 'pacifier2'];

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
        if(this.waist_chance >= 95){
            this.waist = true;
        }
        //then put all accessories in the aproporate arrays (wristbands more common than anything else)
        waist_array = ['phanny1', 'phanny2', 'gucciBelt', 'tutu'];

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
        if(this.leg_chance >= 101){
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
        if(this.neck_chance >= 95){ 
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

    update(){
        //for game timer
        this.gametimer -= 1;
        this.timertext.text = Math.round(this.gametimer/60);
        this.clock += 1;
        //if the timer runs out, go to next scene
        if(Math.round(this.gametimer/60) < 0){ // 60
            this.scene.start("coasterScene");
        };

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
                this.readyButton.setAlpha(1);
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
                        console.log('all riders array', allRiders_array);
                        this.newCharacter();
                    }
                }else if(this.p1.x < 0){
                    if(ridingCustomers < 8){
                        this.newCharacter();
                    }
                }
                this.needCharacter = false;
                // if(ridingCustomers > 8){
                //     nonridingCustomers += 1;
                //     console.log('Non Riding customers ', nonridingCustomers);
                //     console.log("These are extra riders");
                //     nonRiders_array.push(riderAccessories_array);
                //     console.log('non riders array', nonRiders_array);
            
                // }
  
            };
        }
        
        //will go to score scene if the done button is clicked
        if(this.pointer.isDown && this.readyButtonHover == true){
            this.scene.start("coasterScene");
            this.buttonPress.play();
        }; 
    



    };

}