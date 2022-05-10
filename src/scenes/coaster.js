class coaster extends Phaser.Scene{
    constructor(){
        super("coasterScene");
    }
    preload(){
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});
        this.load.spritesheet('redButton', './assets/redButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 1});

        //background
        this.load.image('blueBackground', './assets/blueBackground.png');
        //Character Bodies
        this.load.spritesheet('cat1', './assets/cat1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1}); 
        this.load.spritesheet('cat2', './assets/cat2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duck1', './assets/duck1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duck2', './assets/duck2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duck3', './assets/duck3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});

    };
    create(){
        //background
        this.background = this.add.tileSprite(0, 0, 960, 720, 'blueBackground').setOrigin(0, 0);
        this.add.text(100, 100, 'Coaster Scene');
        this.add.text(100, 130, 'Riders:');
        this.add.text(200, 130, customers);

        //if the mouse is hovering over the red button
        this.redButtonHover = false;

        //will activate coaster to move after button is pressed
        this.coasterstart = false;

        //make an array for the customer sprites so that accessories can track them
        riderSprite_array = [];

        //button
        this.redButton = this.add.sprite(470, 650, 'redButton').setInteractive();
        //initilizing mouse
        this.pointer = this.input.activePointer;
        this.redButton.setScale(0.2);
        this.redButton.on("pointerover", () => {
            //will tell code in update to go to next scene
            this.redButtonHover = true;

        });
        this.redButton.on("pointerout", () => {
            this.redButtonHover = false;
        });

        //coaster wheel animation
        this.anims.create({
            key: 'wheels',
            frames: this.anims.generateFrameNumbers('coasterCart', {start: 0, end: 1, first: 0}),
            frameRate: 10,
            repeat: -1,
        }); 






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
            riderSprite_array.push(this.customer);
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
                    this.customer.x = 820 + 49;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){ 
                    this.customer.x = 820 + 43;
                    this.customer.y = 520 - 45;
                }; 
                if(this.size == 'large'){
                    this.customer.x = 820 + 30;
                    this.customer.y = 520 - 75;
                }; 
                if(this.size == 'extra large'){
                    this.customer.x = 820 + 27;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 1){
                if(this.size == "small"){ //perfect
                    this.customer.x = 820 - 30;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){ //perfect
                    this.customer.x = 820 - 25;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){ //perfect
                    this.customer.x = 820 - 4;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){ //perfect
                    this.customer.x = 820 + 5;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 2){
                if(this.size == "small"){
                    this.customer.x = 587 + 49;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = 587 + 43;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = 587 + 30;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = 587 + 27;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 3){
                if(this.size == "small"){
                    this.customer.x = 587 -30;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = 587 - 25;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = 587 - 4;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = 587 + 5;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 4){
                if(this.size == "small"){
                    this.customer.x = 354 + 49;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = 354 + 43;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = 354 + 30;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = 354 + 27;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 5){
                if(this.size == "small"){
                    this.customer.x = 354 -30;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = 354 - 25;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = 354 - 4;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = 354 + 5;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 6){
                if(this.size == "small"){
                    this.customer.x = 121 + 49;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = 121 + 43;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = 121 + 30;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = 121 + 27;
                    this.customer.y = 520 - 90;
                };
            };
            if(i == 7){
                if(this.size == "small"){
                    this.customer.x = 121 -30;
                    this.customer.y = 520 - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = 121 - 25;
                    this.customer.y = 520 - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = 121 - 4;
                    this.customer.y = 520 - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = 121 + 5;
                    this.customer.y = 520 - 90;
                };
            };


            //if more customers are let on than allowed



            //now add the accessories (start a at 2 because first two values are height and body)
            console.log('accessory ARRAY', allRiders_array[i]);
            console.log("allRiders_array[i].length", allRiders_array[i].length);
            for(let a = 2; a < (allRiders_array[i].length); a++){
                this.accessory = this.physics.add.sprite(this.customer.x, this.customer.y, allRiders_array[i][a]);
                this.accessory.body.allowGravity = false;
                //add accessories to an array
                accessorySprite_array.push(this.accessory);
                this.accessory.setScale(this.customerNewHeight);
            }
   

        };
        //add coaster carts again so they are on top
        this.cart1 = this.physics.add.sprite(820, 520, 'coasterCart', 0)
        this.cart1.setScale(this.coasterscale);
        this.cart1.body.allowGravity = false;
        this.cart2 = this.physics.add.sprite(587, 520, 'coasterCart', 0)
        this.cart2.setScale(this.coasterscale);
        this.cart2.body.allowGravity = false;
        this.cart3 = this.physics.add.sprite(354, 520, 'coasterCart', 0)
        this.cart3.setScale(this.coasterscale);
        this.cart3.body.allowGravity = false;
        this.cart4 = this.physics.add.sprite(121, 520, 'coasterCart', 0)
        this.cart4.setScale(this.coasterscale);
        this.cart4.body.allowGravity = false;

        console.log('rider sprite array!!!:', riderSprite_array);
        console.log('accessorySprite_array!!!', accessorySprite_array);


    };
    update(){


        //will make rollercoaster move if pressed
        if(this.pointer.isDown && this.redButtonHover == true){
            //button moves down then up with delay
            this.redButton.setFrame(1);
            //will make coaster move
            this.coasterstart = true;
            //keeps track of if the button is pressed so it can start delay timer
            this.buttonpressed = true;

        }else{
            this.buttonpressed = false;
        }

        if(this.buttonpressed == false){
            this.redButton.setFrame(0);
        };

        //will make coaster move when button is pressed
        if(this.coasterstart == true){
            //this.cart1.anims.play('wheels');
            this.cart1.body.setVelocityX(RC_Velocity);
            this.cart2.body.setVelocityX(RC_Velocity);
            this.cart3.body.setVelocityX(RC_Velocity);
            this.cart4.body.setVelocityX(RC_Velocity);

            //set velocity of bodies
            for(let b = 0; b < (riderSprite_array.length); b++){
                riderSprite_array[b].body.setVelocityX(RC_Velocity);
                //and make them change to surprised face
                riderSprite_array[b].setFrame(1);
            };

            //set velocity of the accessories
            for(let w = 0; w < (accessorySprite_array.length); w++){
                accessorySprite_array[w].body.setVelocityX(RC_Velocity);
            };

        };


    };
}