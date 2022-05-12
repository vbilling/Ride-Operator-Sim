class score extends Phaser.Scene{
    constructor(){
        super("scoreScene");
    }
    preload(){
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});
        this.load.image('next', './assets/next.png');
        this.load.image('blood', './assets/blood.png');

    };
    create(){
        this.add.text(100, 100, 'Score Scene');
        //will help me round to one or two digits
        function roundTo(n, digits) {
            if (digits === undefined) {
              digits = 0;
            }
          
            var multiplicator = Math.pow(10, digits);
            n = parseFloat((n * multiplicator).toFixed(11));
            var test =(Math.round(n) / multiplicator);
            return +(test.toFixed(digits));
        };

        //total score 
        this.totalScore = 100;

        //clear the array in between each day
        master_array = []

        //make an array for all the score text that will print
        this.scoreText_array = [];
        riderSprite_array2 = [];
        accessorySprite_array2 = [];

        //next button
        this.nextButton = this.add.sprite(480, 80, 'next').setInteractive();

        this.nextButtonHover = false;
        this.nextButton.on("pointerover", () => {
            //will tell code in update to go to next scene
            this.nextButtonHover = true;

        });
        this.nextButton.on("pointerout", () => {
            this.nextButtonHover = false;
        });

        
        //make variables for all the things that you could lose points on
        this.tooShort = 0;
        this.tooTall = 0;
        this.hatCount = 0;
        this.wrongWristband = 0;
        this.foodCount = 0;
        this.weaponCount = 0;
        this.criminalCount = 0;
        this.missingRider = 0;
        this.moreRiders = 0;

        //put all texts in an array that will print in a function

        this.delay = 0;

        //will help me round to one or two digits
        function roundTo(n, digits) {
            if (digits === undefined) {
              digits = 0;
            }
          
            var multiplicator = Math.pow(10, digits);
            n = parseFloat((n * multiplicator).toFixed(11));
            var test =(Math.round(n) / multiplicator);
            return +(test.toFixed(digits));
        };

        //the scale for the coaster carts (will also be used to calculate character heights)
        this.coasterscale = 0.18;

        for(let i = 0; i < (customers); i++){
            this.customerHeight = roundTo(allRiders_array[i][0], 1);
            this.customer = this.physics.add.sprite(60, 350, allRiders_array[i][1]);
            this.customer.body.allowGravity = false;
            //make an array for the customer sprites so that accessories can track them
            //basically do this if the coaster scene is not around to do it for you
            riderSprite_array2.push(this.customer);
            //setting the height based on what the height was before with this.customerNewHeight
            if(this.customerHeight == 0.2){
                //will help place character coordinates correctly in coaster seat
                this.size = 'small';
                //an array to get the correct coordinates in update
                riderSize_array.push(this.size);
                this.customerNewHeight = (this.coasterscale - 0.08);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.3){
                this.size = 'medium';
                riderSize_array.push(this.size);
                this.customerNewHeight = (this.coasterscale - 0.05);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.4){
                this.size = 'large';
                riderSize_array.push(this.size);
                this.customerNewHeight = (this.coasterscale + 0.02);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.5){
                this.size = 'extra large';
                riderSize_array.push(this.size);
                this.customerNewHeight = (this.coasterscale + 0.05);
                this.customer.setScale(this.customerNewHeight);

            }
            //riderSprite_array[i]
            if(i == 0){ 
                if(this.size == "small"){
                    this.customer.x = -100 + 49;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){ 
                    this.customer.x = -100 + 43;
                    this.customer.y = 620 - 45;
                }; 
                if(this.size == 'large'){
                    this.customer.x = -100 + 30;
                    this.customer.y = 620 - 75;
                }; 
                if(this.size == 'extra large'){
                    this.customer.x = -100 + 27;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 1){
                if(this.size == "small"){ //perfect
                    this.customer.x = -100 - 30;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){ //perfect
                    this.customer.x = -100 - 25;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){ //perfect
                    this.customer.x = -100 - 4;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){ //perfect
                    this.customer.x = -100 + 5;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 2){
                if(this.size == "small"){
                    this.customer.x = -333 + 49;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = -333 + 43;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = -333 + 30;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -333 + 27;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 3){
                if(this.size == "small"){
                    this.customer.x = -333 -30;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = -333 - 25;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = -333 - 4;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -333 + 5;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 4){
                if(this.size == "small"){
                    this.customer.x = -566 + 49;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = -566 + 43;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = -566 + 30;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -566 + 27;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 5){
                if(this.size == "small"){
                    this.customer.x = -566 -30;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = -566 - 25;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = -566 - 4;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -566 + 5;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 6){
                if(this.size == "small"){
                    this.customer.x = -799 + 49;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = -799 + 43;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = -799 + 30;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -799 + 27;
                    this.customer.y = 620 - 90;
                };
            };
            if(i == 7){
                if(this.size == "small"){
                    this.customer.x = -799 -30;
                    this.customer.y = 620 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = -799 - 25;
                    this.customer.y = 620 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = -799 - 4;
                    this.customer.y = 620 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -799 + 5;
                    this.customer.y = 620 - 90;
                };
            };

            //if more customers are let on than allowed

            //now add the accessories (start a at 2 because first two values are height and body)
            for(let a = 2; a < (allRiders_array[i].length); a++){
                this.accessory = this.physics.add.sprite(this.customer.x, this.customer.y, allRiders_array[i][a]);
                this.accessory.body.allowGravity = false;
                //add accessories to an array
                accessorySprite_array2.push(this.accessory);
                this.accessory.setScale(this.customerNewHeight);
                
                //checking if there are any hats
                if(allRiders_array[i][a] == 'cowhat1'){
                    //name of accessory
                    first_array.push('hat');
                    //point value
                    first_array.push(-2);
                    //phrase to say
                    first_array.push('No hats allowed');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'cowhat2'){
                    //name of accessory
                    first_array.push('hat');
                    //point value
                    first_array.push(-2);
                    //phrase to say
                    first_array.push('No hats allowed');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'cowhat3'){
                    //name of accessory
                    first_array.push('hat');
                    //point value
                    first_array.push(-2);
                    //phrase to say
                    first_array.push('No hats allowed');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'partyhat'){
                    //name of accessory
                    first_array.push('hat');
                    //point value
                    first_array.push(-2);
                    //phrase to say
                    first_array.push('No hats allowed...even if its your birthday');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'soda1' || allRiders_array[i][a] == 'soda2'){
                    //name of accessory
                    first_array.push('Soda');
                    //point value
                    first_array.push(-3);
                    //phrase to say
                    first_array.push('No drinks allowed!!');
                    master_array.push(first_array);
                    first_array = [];
                    this.foodCount += 1;
                    
                };
                if(allRiders_array[i][a] == 'knife'){
                    //name of accessory
                    first_array.push('weapons');
                    //point value
                    first_array.push(-7);
                    //phrase to say
                    first_array.push('OH NO A KNIFE');
                    master_array.push(first_array);
                    first_array = [];
                    this.weaponCount += 1;

                    //make them bleeding
                    //bubble trail
                    //myParticleSystem = myParticleManager.createEmitter
                    this.bleed = this.add.particles('blood');
                    this.bleeding = this.bleed.createEmitter({ 
                        x: 30,
                        y: 50,
                        lifespan: { min: 20, max: 1500},
                        speed: { min: 5, max: 10},
                        gravityY: 100,
                        frequency: 0.001,
                        quantity: 0.001,
                        scale: { start: 0.02, end: 0.004},
                        follow: this.accessory,
                    });
                    this.bleed.setDepth(2);
                    
                };
                if(allRiders_array[i][a] == 'wristband1'){ //is the day 1 wristband
                    if(day2Done == true || day3Done == true){
                        //name of accessory
                        first_array.push('wristband1');
                        //point value
                        first_array.push(-6);
                        //phrase to say
                        first_array.push('wrong wristband');
                        master_array.push(first_array);
                        first_array = [];
                        this.wrongWristband += 1;
                    };
                };
                if(allRiders_array[i][a] == 'wristband2'){ //is the day 1 wristband
                    if(day2Done == false || day3Done == true){
                        //name of accessory
                        first_array.push('wristband2');
                        //point value
                        first_array.push(-6);
                        //phrase to say
                        first_array.push('wrong wristband');
                        master_array.push(first_array);
                        first_array = [];
                        this.wrongWristband += 1;
                    };
                };
                if(allRiders_array[i][a] == 'wristband3'){ //is the day 1 wristband
                    if(day3Done == false){
                        //name of accessory
                        first_array.push('wristband3');
                        //point value
                        first_array.push(-6);
                        //phrase to say
                        first_array.push('wrong wristband');
                        master_array.push(first_array);
                        first_array = [];
                        this.wrongWristband += 1;
                    };
                };
                if(allRiders_array[i][a] == 'ankleMoniter'){ //is the day 1 wristband
                    if(day3Done == false){
                        //name of accessory
                        first_array.push('criminal');
                        //point value
                        first_array.push(-11);
                        //phrase to say
                        first_array.push('You let a criminal ride');
                        master_array.push(first_array);
                        first_array = [];
                        this.criminalCount += 1;
                    };
                };
                if(allRiders_array[i][a] == 'handcuffs'){ //is the day 1 wristband
                    if(day3Done == false){
                        //name of accessory
                        first_array.push('criminal');
                        //point value
                        first_array.push(-11);
                        //phrase to say
                        first_array.push('You let a criminal ride');
                        master_array.push(first_array);
                        first_array = [];
                        this.criminalCount += 1;
                    };
                };
                if(allRiders_array[i][a] == 'corndog'){ //is the day 1 wristband
                    if(day3Done == false){
                        //name of accessory
                        first_array.push('corndog');
                        //point value
                        first_array.push(-5);
                        //phrase to say
                        first_array.push('NO FOOD ALLOWED');
                        master_array.push(first_array);
                        first_array = [];
                        this.foodCount += 1;
                    };
                };
            };
            //scoring for height with this.customerHeight
            console.log("LOOK HEREREEE");
            console.log('this.customerHeight', this.customerHeight);
            if(this.customerHeight < 0.25){
                this.tooShort += 1; 
                first_array.push('Too short');
                first_array.push(-10);
                first_array.push('A rider was too short and fell out of the ride.');
                master_array.push(first_array);
                first_array = [];
            };
            //too tall
            if(this.customerHeight > 0.43){
                this.tooTall += 1;   
                first_array.push('Too tall');
                first_array.push(-12);
                first_array.push('A rider was too tall and lost their head');
                master_array.push(first_array);
                first_array = [];   
            };
            //scoring if there are too many or not enough customers
            if(customers < 8){
                first_array.push('Missing riders');
                this.missingRider = (8 - customers);
                first_array.push(-2);
                first_array.push('Missing riders');
                master_array.push(first_array);
                first_array = [];
            };
            if(customers > 8){
                first_array.push('Too many riders');
                this.moreRiders = (customers - 8);
                first_array.push(-2);
                first_array.push('Too many riders by');
                master_array.push(first_array);
                first_array = [];
 
            };
      
        };



        
        //add coaster carts again so they are on top
        this.cart1 = this.physics.add.sprite(-100, 620, 'coasterCart', 0)
        this.cart1.setScale(this.coasterscale);
        this.cart1.body.allowGravity = false;
        this.cart2 = this.physics.add.sprite(-333, 620, 'coasterCart', 0)
        this.cart2.setScale(this.coasterscale);
        this.cart2.body.allowGravity = false;
        this.cart3 = this.physics.add.sprite(-566, 620, 'coasterCart', 0)
        this.cart3.setScale(this.coasterscale);
        this.cart3.body.allowGravity = false;
        this.cart4 = this.physics.add.sprite(-799, 620, 'coasterCart', 0)
        this.cart4.setScale(this.coasterscale);
        this.cart4.body.allowGravity = false;

        console.log('Too short:', this.tooShort);
        console.log('Too Tall:', this.tooTall);
        console.log("Hat count", this.hatCount);
        console.log("wrong wristband", this.wrongWristband);
        console.log("Food count", this.foodCount);
        console.log("Weapon count", this.weaponCount);
        console.log("Criminal count", this.criminalCount);
        console.log("Missing Riders", this.missingRider);
        console.log("Too many riders by", this.moreRiders);

        console.log("master array", master_array);

        //adding scores to total score
        for(let m = 0; m < master_array.length; m++){
            for(let s = 0; s < master_array[m].length; s++){
                this.currentScore = master_array[m][1];
            }
            this.totalScore += this.currentScore;
        }
        //printing out the reasons and scores
        for(let x = 0; x < master_array.length; x++){
            //print if riders are missing
            if(master_array[x][0] == 'Missing riders'){
                this.add.text(250, 180, "Missing " + this.missingRider + " riders: " + (master_array[x][1]*this.missingRider) + " points");
            };
            //if there are too many riders
            if(master_array[x][0] == 'Too many riders'){
                this.add.text(250, 180, "Too many riders by " + this.moreRiders + ": " + (master_array[x][1]*this.moreRiders) + " points");
            };
            //if some riders were too tall
            if(master_array[x][0] == 'Too tall'){
                this.add.text(250, 200, this.tooTall + " rider(s) are too tall" + ": " + (master_array[x][1]*this.tooTall) + " points");
            };
            //if some riders were too short
            if(master_array[x][0] == 'Too short'){
                this.add.text(250, 220, this.tooShort + " rider(s) are too short" + ": " + (master_array[x][1]*this.tooShort) + " points");
            };
            //wrong wristband
            if(master_array[x][2] == 'wrong wristband'){
                this.add.text(250, 240, this.wrongWristband + " incorrect wristband(s)" + ": " + (master_array[x][1]*this.wrongWristband) + " points");
            };
            //if there are hats
            if(master_array[x][0] == 'hat'){
                //check if missing riders or too many riders has been printed
                this.add.text(250, 260, "Hats X " + this.hatCount + ": " + (master_array[x][1]*this.hatCount) + " points");
            };
            if(master_array[x][0] == 'Soda'){
                //check if missing riders or too many riders has been printed
                this.add.text(250, 280, "Sodas X " + this.foodCount + ": " + (master_array[x][1]*this.foodCount) + " points");
            };
            if(master_array[x][0] == 'weapons'){
                //check if missing riders or too many riders has been printed
                this.add.text(250, 300, "Weapons X " + this.weaponCount + ": " + (master_array[x][1]*this.weaponCount) + " points");
            };
            if(master_array[x][0] == 'criminal'){
                //check if missing riders or too many riders has been printed
                this.add.text(250, 320, "you let a criminal ride" + ": " + (master_array[x][1]*this.criminalCount) + " points");
            };         

        }

        this.add.text(200, 150, "TOTAL SCORE:");
        this.add.text(320, 150, this.totalScore);
        this.percentage = 100 - this.totalScore;
        fired += this.percentage;
        //get grade from score
        if(this.totalScore > 0){
            this.grade = "F"
            if(this.totalScore >= 10){
                this.grade = "F+"
                if(this.totalScore >= 20){
                    this.grade = "D"
                    if(this.totalScore >= 30){
                        this.grade = "C-"
                        if(this.totalScore >= 40){
                            this.grade = "C"
                            if(this.totalScore >= 50){
                                this.grade = "C+"
                                if(this.totalScore >= 60){
                                    this.grade = "B-"
                                    if(this.totalScore >= 70){
                                        this.grade = "B"
                                        if(this.totalScore >= 80){
                                            this.grade = "B+"
                                            if(this.totalScore >= 90){
                                                this.grade = "A"
                                                if(this.totalScore >= 90){
                                                    this.grade = "A"
                                                    if(this.totalScore >= 95){
                                                        this.grade = "A+"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.add.text(450, 150, "GRADE: " + this.grade);
        this.add.text(650, 150, "You are " + fired +"% fired");
        console.log("Fired:", fired);

    };
    update(){
        this.delay += 1;
        if((this.delay/60) < 1.9){
            this.cart1.body.setVelocityX(490);
            this.cart2.body.setVelocityX(490);
            this.cart3.body.setVelocityX(490);
            this.cart4.body.setVelocityX(490);


            //set velocity of bodies
            for(let b = 0; b < (riderSprite_array2.length); b++){
                riderSprite_array2[b].body.setVelocityX(490);
                //and make them change to surprised face
                riderSprite_array2[b].setFrame(1);
            };
            //set velocity of the accessories
            for(let w = 0; w < (accessorySprite_array2.length); w++){
                accessorySprite_array2[w].body.setVelocityX(490);
            };
        }else{
            this.cart1.body.setVelocityX(0);
            this.cart2.body.setVelocityX(0);
            this.cart3.body.setVelocityX(0);
            this.cart4.body.setVelocityX(0);
            //set velocity of bodies
            for(let b = 0; b < (riderSprite_array2.length); b++){
                riderSprite_array2[b].body.setVelocityX(0);
                //and make them change to surprised face
                riderSprite_array2[b].setFrame(0);
            };
            //set velocity of the accessories
            for(let w = 0; w < (accessorySprite_array2.length); w++){
                accessorySprite_array2[w].body.setVelocityX(0);
            };

        }
        //next button pressed 
        if(this.nextButtonHover == true){
            this.input.on('pointerdown', function (pointer) {
                //button moves down then up with delay
                //go to fired scene if youre fired
                if(fired >= 100){
                    this.scene.start('loseScene');
                }else if(day2Done == false){
                    this.scene.start('day2Scene');
                }else if(day2Done == true && day3Done == false){
                    this.scene.start('day3Scene');
                };
                //if you are done with day 3 and not fired!
                if(day3Done == true && fired < 100){
                    this.scene.start('winScene');
                }
            }, this)
        }



    };
};