class score extends Phaser.Scene{
    constructor(){
        super("scoreScene");
    }
    preload(){
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});


    };
    create(){
        this.add.text(100, 100, 'Score Scene');
        this.add.text(100, 130, 'Riders:');
        this.add.text(200, 130, customers);

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

        //make an array for all the score text that will print
        this.scoreText_array = [];
        riderSprite_array2 = [];

        
        //make variables for all the things that you could lose points on
        this.tooShort = 0;
        this.tooTall = 0;
        this.hatCount = 0;

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
                    first_array.push('cowhat1');
                    //point value
                    first_array.push(-25);
                    //phrase to say
                    first_array.push('No hats allowed');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'cowhat2'){
                    //name of accessory
                    first_array.push('cowhat2');
                    //point value
                    first_array.push(-25);
                    //phrase to say
                    first_array.push('No hats allowed');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'cowhat3'){
                    //name of accessory
                    first_array.push('cowhat3');
                    //point value
                    first_array.push(-25);
                    //phrase to say
                    first_array.push('No hats allowed');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
                if(allRiders_array[i][a] == 'partyhat'){
                    //name of accessory
                    first_array.push('partyhat');
                    //point value
                    first_array.push(-20);
                    //phrase to say
                    first_array.push('No hats allowed...even if its your birthday');
                    master_array.push(first_array);
                    first_array = [];
                    this.hatCount += 1;
                };
            };
      
            };
            //scoring for height with this.customerHeight
            if(this.customerHeight < 0.25){
                this.tooShort += 1; 
                first_array.push('Too short');
                first_array.push(-40);
                first_array.push('A rider was too short and fell out of the ride.');
                master_array.push(first_array);
                first_array = [];
            };
            //too tall
            if(this.customerHeight > 0.43){
                this.tooTall += 1;   
                first_array.push('Too tall');
                first_array.push(-60);
                first_array.push('A rider was too tall and flost their head');
                master_array.push(first_array);
                first_array = [];   
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

        console.log("master array", master_array);

        //printing out the scores
        for(let m = 0; m < master_array.length; m++){
            for(let s = 0; s < master_array[m].length; s++){
                console.log('look here', master_array[m][1]);
                this.currentScore = master_array[m][1];
            }
            this.totalScore += this.currentScore;
        }

        console.log("TOTAL SCORE", this.totalScore);
        this.add.text(200, 200, this.totalScore);

    };
    update(){



        this.delay += 1;
        if((this.delay/60) < 1.9){
            this.cart1.body.setVelocityX(500);
            this.cart2.body.setVelocityX(500);
            this.cart3.body.setVelocityX(500);
            this.cart4.body.setVelocityX(500);


            //set velocity of bodies
            for(let b = 0; b < (riderSprite_array2.length); b++){
                riderSprite_array2[b].body.setVelocityX(500);
                //and make them change to surprised face
                riderSprite_array2[b].setFrame(1);
            };
            //set velocity of the accessories
            for(let w = 0; w < (accessorySprite_array2.length); w++){
                accessorySprite_array2[w].body.setVelocityX(500);
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


    };
}