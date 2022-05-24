class score extends Phaser.Scene{
    constructor(){
        super("scoreScene");
    }
    preload(){
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});
        this.load.spritesheet('nextButton', './assets/nextButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});
        this.load.image('blood', './assets/blood.png');

        //for score board
        this.load.image('scoreBoard', './assets/scoreBoard.png');
        this.load.image('NOhats', './assets/NOhats.png');
        this.load.image('NOfood', './assets/NOfood.png');
        this.load.image('NOweapons', './assets/NOweapons.png');
        this.load.image('NOcriminals', './assets/NOcriminals.png');
        this.load.spritesheet('capacityMeter', './assets/capacityMeter.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 2});
        this.load.image('incorrectWristbandText', './assets/incorrectWristbandText.png');
        this.load.image('missingWristbandText', './assets/missingWristbandText.png');
        this.load.image('TOOshortText', './assets/TOOshortText.png');
        this.load.image('TOOtallText', './assets/TOOtallText.png');

        //delete later
        if(day1Done == false && day2Done == false && day3Done == false){
            this.load.image('wristband1', './assets/wristband1.png');
            this.load.image('wristband2', './assets/wristband2.png');
            this.load.image('wristband3', './assets/wristband3.png');
        }

        if(trainingDone == false){
            this.load.spritesheet('boss', './assets/boss.png', {frameWidth: 480, frameHeight: 360, startFrame: 0, endFrame: 6})
            this.load.image('coasterBackground', './assets/coasterBackground.png');
        }


    };
    create(){
        this.background = this.add.tileSprite(0, 0, 960, 720, 'coasterBackground').setOrigin(0, 0);

        //total customers let on ride 
        this.totalCustomers = 0;
        this.totalCustomers = ridingCustomers + nonridingCustomers;

        this.boss = this.add.sprite(230, 90, 'boss');
        this.boss.setScale(0.6);
        this.boss.setFrame(2);

        //making the boss shake when hes angry
        this.shake = false;
        
        //score text config
        let scoreConfig = {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: 'white',
            align: 'center',
            stroke: "black",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 4
            }
        };
        let combo1Config = {
            fontFamily: 'Avenir Next Heavy',
            fontSize: '30px',
            color: 'red',
            align: 'center',
            padding: {
                top: 5,
                bottom: 4
            }
        };
        let combo2Config = {
            fontFamily: 'Avenir Next Heavy',
            fontSize: '30px',
            color: 'green',
            align: 'center',
            padding: {
                top: 5,
                bottom: 4
            }
        };
        this.add.text(200, 300, 'Score Scene');
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

        //load sounds
        this.thud = this.sound.add('thud');
        this.thud2 = this.sound.add('thud2');
        this.buttonPress = this.sound.add('buttonPress');
        this.pop = this.sound.add('pop');
        

        //score board
        this.scoreBoard = this.add.sprite(0, 15, 'scoreBoard').setOrigin(0,0);

        //load the right wristband
        if(day2Done == false){
            this.add.sprite(840, 205, 'wristband1')
        };
        if(day2Done == true && day3Done == false){
            this.add.sprite(840, 205, 'wristband2')
        };
        if(day3Done == true){
            this.add.sprite(840, 205, 'wristband3')
        }

        this.capacityMeter = this.add.sprite(0, 15, 'capacityMeter').setOrigin(0, 0);
        this.capacityMeter.setFrame(1);

        //total score 
        this.totalScore = 100;

        //clear the array in between each day
        master_array = []

        this.nextButtonHover = false;

        //make an array for all the score text that will print
        this.scoreText_array = [];
        riderSprite_array2 = [];
        accessorySprite_array2 = [];

        //make variables for all the things that you could lose points on
        this.tooShort = 0;
        this.tooTall = 0;
        this.hatCount = 0;
        this.wrongWristband = 0;
        this.noWristband = 0;
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
        this.coasterscale = 0.16;

        console.log("all riders array:", allRiders_array);

        for(let i = 0; i < (ridingCustomers); i++){
            this.customerHeight = roundTo(allRiders_array[i][0], 1);
            this.customer = this.physics.add.sprite(60, 390, allRiders_array[i][1]); //370
            this.body = 
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
                this.customerNewHeight = (this.coasterscale + 0.00);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.5){
                this.size = 'extra large';
                riderSize_array.push(this.size);
                this.customerNewHeight = (this.coasterscale + 0.05);
                this.customer.setScale(this.customerNewHeight);
                console.log("HERE YA GO", this.customer.frame);
                this.customer.setFrame(2);

            }
            //riderSprite_array[i]
            if(i == 0){ 
                if(this.size == "small"){ //perfect
                    this.customer.x = -100 + 49;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){ //perfect
                    this.customer.x = -100 + 43;
                    this.customer.y = 620 - 5;
                }; 
                if(this.size == 'large'){ //perfect
                    this.customer.x = -100 + 30;
                    this.customer.y = 620 - 40;
                }; 
                if(this.size == 'extra large'){ //perfect
                    this.customer.x = -100 + 27;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 1){
                if(this.size == "small"){ //perfect
                    this.customer.x = -100 - 30;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){ //perfect
                    this.customer.x = -100 - 25;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){ //perfect
                    this.customer.x = -100 - 4;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){ //perfect
                    this.customer.x = -100 + 5;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 2){
                if(this.size == "small"){
                    this.customer.x = -333 + 49;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){
                    this.customer.x = -333 + 43;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){
                    this.customer.x = -333 + 30;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -333 + 27;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 3){
                if(this.size == "small"){
                    this.customer.x = -333 -30;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){
                    this.customer.x = -333 - 25;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){
                    this.customer.x = -333 - 4;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -333 + 5;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 4){
                if(this.size == "small"){
                    this.customer.x = -566 + 49;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){
                    this.customer.x = -566 + 43;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){
                    this.customer.x = -566 + 30;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -566 + 27;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 5){
                if(this.size == "small"){
                    this.customer.x = -566 -30;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){
                    this.customer.x = -566 - 25;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){
                    this.customer.x = -566 - 4;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -566 + 5;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 6){
                if(this.size == "small"){
                    this.customer.x = -799 + 49;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){
                    this.customer.x = -799 + 43;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){
                    this.customer.x = -799 + 30;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -799 + 27;
                    this.customer.y = 620 - 60;
                };
            };
            if(i == 7){
                if(this.size == "small"){
                    this.customer.x = -799 -30;
                    this.customer.y = 620 + 10;
                };
                if(this.size == "medium"){
                    this.customer.x = -799 - 25;
                    this.customer.y = 620 - 5;
                };
                if(this.size == 'large'){
                    this.customer.x = -799 - 4;
                    this.customer.y = 620 - 40;
                };
                if(this.size == 'extra large'){
                    this.customer.x = -799 + 5;
                    this.customer.y = 620 - 60;
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
                    first_array.push(-2);
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
                    first_array.push(-5); //-5
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
                        first_array.push(-3);
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
                        first_array.push(-3);
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
                        first_array.push(-3);
                        //phrase to say
                        first_array.push('wrong wristband');
                        master_array.push(first_array);
                        first_array = [];
                        this.wrongWristband += 1;
                    };
                };
                if(allRiders_array[i][a] == 'no wristband'){ //is the day 1 wristband
                    if(day3Done == false){
                        //name of accessory
                        first_array.push('no wristband');
                        //point value
                        first_array.push(-3);
                        //phrase to say
                        first_array.push('no wristband');
                        master_array.push(first_array);
                        first_array = [];
                        this.noWristband += 1;
                    };
                };
                if(allRiders_array[i][a] == 'ankleMoniter'){ //is the day 1 wristband
                    if(day3Done == false){
                        //name of accessory
                        first_array.push('criminal');
                        //point value
                        first_array.push(-6);
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
                        first_array.push(-6);
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
                        first_array.push(-2);
                        //phrase to say
                        first_array.push('NO FOOD ALLOWED');
                        master_array.push(first_array);
                        first_array = [];
                        this.foodCount += 1;
                    };
                };
            };
            //scoring for height with this.customerHeight
            console.log('this.customerHeight', this.customerHeight);
            if(this.customerHeight < 0.25){
                this.tooShort += 1; 
                first_array.push('Too short');
                first_array.push(-5);
                first_array.push('A rider was too short and fell out of the ride.');
                master_array.push(first_array);
                first_array = [];
            };
            //too tall
            if(this.customerHeight > 0.43){
                this.tooTall += 1;   
                first_array.push('Too tall');
                first_array.push(-5);
                first_array.push('A rider was too tall and lost their head');
                master_array.push(first_array);
                first_array = [];   
            };
            //scoring if there are too many or not enough customers
            if(this.totalCustomers < 8){
                first_array.push('Missing riders');
                this.missingRider = (8 - this.totalCustomers);
                first_array.push(-1* this.missingRider);
                first_array.push('Missing riders');
                master_array.push(first_array);
                first_array = [];
            };
            if(this.totalCustomers > 8){
                first_array.push('Too many riders');
                this.moreRiders = (this.totalCustomers - 8);
                first_array.push(-1*this.moreRiders);
                first_array.push('Too many riders by');
                master_array.push(first_array);
                first_array = [];
            };
      
        };
        
        //add coaster carts again so they are on top
        this.cart1 = this.physics.add.sprite(-100, 640, 'coasterCart', 0)
        this.cart1.setScale(this.coasterscale);
        this.cart1.body.allowGravity = false;
        this.cart2 = this.physics.add.sprite(-333, 640, 'coasterCart', 0)
        this.cart2.setScale(this.coasterscale);
        this.cart2.body.allowGravity = false;
        this.cart3 = this.physics.add.sprite(-566, 640, 'coasterCart', 0)
        this.cart3.setScale(this.coasterscale);
        this.cart3.body.allowGravity = false;
        this.cart4 = this.physics.add.sprite(-799, 640, 'coasterCart', 0)
        this.cart4.setScale(this.coasterscale);
        this.cart4.body.allowGravity = false;

        console.log('Too short:', this.tooShort);
        console.log('Too Tall:', this.tooTall);
        console.log("Hat count", this.hatCount);
        console.log("wrong wristband", this.wrongWristband);
        console.log("no wristband", this.noWristband);
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

        //makeing the scoreboard stuff show up not dependent on if things were done wrong
        //order: too tall, too short, capacity, missing wristbands, incorrect wristbands, hats, food/drinks, weapons, criminals, %fired
        this.time.addEvent({
            delay: 2300,
            callback: ()=>{
                this.add.sprite(10, 25, 'TOOtallText').setOrigin(0,0);
                this.thud2.play();
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.tooTall > 0){
                            this.thud.play();
                            this.add.text(310, 207, 'x' + this.tooTall, combo1Config); 
                        }else{
                            this.thud.play();
                            this.add.text(310, 207, 'x' + this.tooTall, combo2Config); 
                        }
                    },
                    loop: false
                }) 
            },
            loop: false
        })
        this.time.addEvent({
            delay: 3700,
            callback: ()=>{
                this.add.sprite(10, 5, 'TOOshortText').setOrigin(0,0);
                this.thud2.play();
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.tooShort > 0){
                            this.thud.play();
                            this.add.text(310, 260, 'x' + this.tooShort, combo1Config); 
                        }else{
                            this.thud.play();
                            this.add.text(310, 260, 'x' + this.tooShort, combo2Config); 
                        }
                    },
                    loop: false
                }) 
            },
            loop: false
        })
        if(this.totalCustomers == 0){
            this.totalScore -= 34;
            this.time.addEvent({
                delay: 5100,
                callback: ()=>{
                    this.thud2.play();
                    this.capacityMeter.setFrame(0);
                    this.time.addEvent({
                        delay: 700,
                        callback: ()=>{
                            this.thud.play();
                            this.add.text(395, 245, (this.totalCustomers), combo1Config);
                        },
                        loop: false
                    })
                },
                loop: false
            })

        }else if(this.totalCustomers < 8){
            this.time.addEvent({
                delay: 5100,
                callback: ()=>{
                    this.thud2.play();
                    this.capacityMeter.setFrame(0);
                    this.time.addEvent({
                        delay: 700,
                        callback: ()=>{
                            this.thud.play();
                            this.add.text(395, 245, (this.totalCustomers), combo1Config);
                        },
                        loop: false
                    })
                },
                loop: false
            })
        }
        if(this.totalCustomers == 8){
            this.time.addEvent({
                delay: 5100,
                callback: ()=>{
                    this.thud2.play();
                    this.capacityMeter.setFrame(1);
                    this.time.addEvent({
                        delay: 700,
                        callback: ()=>{
                            this.thud.play();
                            this.add.text(460, 213, (this.totalCustomers), combo2Config);
                        },
                        loop: false
                    })
                },
                loop: false
            })
        }
        if(this.totalCustomers > 8){
            this.time.addEvent({
                delay: 5100,
                callback: ()=>{
                    this.thud2.play();
                    this.capacityMeter.setFrame(2);
                    this.time.addEvent({
                        delay: 700,
                        callback: ()=>{
                            this.thud.play();
                            this.add.text(520, 245, this.totalCustomers, combo1Config);
                        },
                        loop: false
                    })
                },
                loop: false
            })
        }
        this.time.addEvent({
            delay: 6500,
            callback: ()=>{
                this.thud2.play();
                this.add.sprite(10, 17, 'missingWristbandText').setOrigin(0,0);
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.noWristband > 0){
                            this.thud.play();
                            this.add.text(780, 222, 'x' + this.noWristband, combo1Config);
                        }else{
                            this.thud.play();
                            this.add.text(780, 222, 'x' + this.noWristband, combo2Config);
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })
        this.time.addEvent({
            delay: 7900,
            callback: ()=>{
                this.thud2.play();
                this.add.sprite(10, 15, 'incorrectWristbandText').setOrigin(0,0);
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.wrongWristband > 0){
                            this.thud.play();
                            this.add.text(780, 268, 'x' + this.wrongWristband, combo1Config);
                        }else{
                            this.thud.play();
                            this.add.text(780, 268, 'x' + this.wrongWristband, combo2Config);
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })

        this.time.addEvent({
            delay: 9300,
            callback: ()=>{
                this.thud2.play();
                this.NOhats = this.add.sprite(0, 15, 'NOhats').setOrigin(0, 0);
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.hatCount > 0){
                            this.thud.play();
                            this.add.text(240, 375, 'x' + this.hatCount, combo1Config);
                        }else{
                            this.thud.play();
                            this.add.text(240, 375, 'x' + this.hatCount, combo2Config);
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })
        this.time.addEvent({
            delay: 10700,
            callback: ()=>{
                this.thud2.play();
                this.NOfood = this.add.sprite(0, 15, 'NOfood').setOrigin(0, 0);
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.foodCount > 0){
                            this.thud.play();
                            this.add.text(425, 375, 'x' + this.foodCount, combo1Config);
                        }else{
                            this.thud.play();
                            this.add.text(425, 375, 'x' + this.foodCount, combo2Config);
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })
        this.time.addEvent({
            delay: 12100,
            callback: ()=>{
                this.thud2.play();
                this.NOweapons = this.add.sprite(0, 15, 'NOweapons').setOrigin(0, 0);
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.weaponCount > 0){
                            this.thud.play();
                            this.add.text(630, 375, 'x' + this.weaponCount, combo1Config);
                        }else{
                            this.thud.play();
                            this.add.text(630, 375, 'x' + this.weaponCount, combo2Config);
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })
        this.time.addEvent({
            delay: 13500,
            callback: ()=>{
                this.thud2.play();
                this.NOcriminals = this.add.sprite(0, 15, 'NOcriminals').setOrigin(0, 0);
                this.time.addEvent({
                    delay: 700,
                    callback: ()=>{
                        if(this.criminalCount > 0){
                            this.thud.play();
                            this.add.text(800, 375, 'x' + this.criminalCount, combo1Config);
                        }else{
                            this.thud.play();
                            this.add.text(800, 375, 'x' + this.criminalCount, combo2Config);
                        }
                    },
                    loop: false
                })
            },
            loop: false
        })
        // this.time.addEvent({
        //     delay: 13400,
        //     callback: ()=>{
        //         this.thud.play();
        //         this.add.text(140, 170, "TOTAL SCORE:", scoreConfig);
        //         this.add.text(320, 170, this.totalScore, scoreConfig);
        //     },
        //     loop: false
        // })


        

        this.percentage = 100 - this.totalScore;
        fired += this.percentage;
        //get grade from score
        // if(this.totalScore > 0){
        //     this.grade = "F"
        //     if(this.totalScore >= 10){
        //         this.grade = "F+"
        //         if(this.totalScore >= 20){
        //             this.grade = "D"
        //             if(this.totalScore >= 30){
        //                 this.grade = "C-"
        //                 if(this.totalScore >= 40){
        //                     this.grade = "C"
        //                     if(this.totalScore >= 50){
        //                         this.grade = "C+"
        //                         if(this.totalScore >= 60){
        //                             this.grade = "B-"
        //                             if(this.totalScore >= 70){
        //                                 this.grade = "B"
        //                                 if(this.totalScore >= 80){
        //                                     this.grade = "B+"
        //                                     if(this.totalScore >= 90){
        //                                         this.grade = "A"
        //                                         if(this.totalScore >= 90){
        //                                             this.grade = "A"
        //                                             if(this.totalScore >= 95){
        //                                                 this.grade = "A+"
        //                                             }
        //                                         }
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        // this.time.addEvent({
        //     delay: 14400,
        //     callback: ()=>{
        //         this.thud.play();
        //         this.add.text(450, 170, "GRADE: " + this.grade, scoreConfig);
        //     },
        //     loop: false
        // })
        this.time.addEvent({
            delay: 15400,
            callback: ()=>{
                this.thud.play();
                this.add.text(390, 30, "You are " + fired +"% fired", scoreConfig);
                if(fired >= 90){
                    this.boss.setFrame(6);
                    this.boss.setScale(0.5);
                    this.shake = true;
                }else if(fired >= 60){
                    this.boss.setFrame(5);
                }else if(fired >= 40){
                    this.boss.setFrame(4);
                }else if(fired >= 20){
                    this.boss.setFrame(3);
                }
            },
            loop: false
        })
        this.time.addEvent({
            delay: 16400,
            callback: ()=>{
                //next button
                this.pop.play();
                this.nextButton = this.add.sprite(720, 60, 'nextButton').setInteractive();
                this.nextButton.setScale(0.3);
                this.nextButtonHover = false;
                this.nextButton.on("pointerover", () => {
                    //will tell code in update to go to next scene
                    this.nextButton.setFrame(1);
                    this.nextButtonHover = true;
        
                });
                this.nextButton.on("pointerout", () => {
                    this.nextButton.setFrame(2);
                    this.nextButtonHover = false;
                });
            },
            loop: false
        })



         

    };
    update(){
        //make boss shake if youre fired
        function randomDecimil(mn,mx){
            return Math.random() * (mx - mn) + mn
        }
        if(fired >= 90 && this.shake == true){
            this.boss.x = this.boss.x + randomDecimil(-0.5, 0.5);
        }
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
                    this.buttonPress.play();
                }else if(day2Done == false){
                    this.scene.start('day2IntroScene');
                    this.buttonPress.play();
                }else if(day2Done == true && day3Done == false){
                    this.scene.start('day3IntroScene');
                    this.buttonPress.play();
                };
                //if you are done with day 3 and not fired!
                if(day3Done == true && fired < 100){
                    this.scene.start('winScene');
                    this.buttonPress.play();
                }
            }, this)
        }



    };
};