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
        this.add.text(200, 130, ridingCustomers);

        //sounds
        //this.game.sound.stopAll();
        this.redButton1 = this.sound.add('redButton1');
        this.redButton2 = this.sound.add('redButton2');
        

        //if the mouse is hovering over the red button
        this.redButtonHover = false;
        //will activate coaster to move after button is pressed
        this.coasterstart = false;
        //make an array for the customer sprites so that accessories can track them
        riderSprite_array = [];
        //reset
        accessorySprite_array = [];
        //roller coaster button has not been pressed yet
        this.buttonpressed = false;
        //initilizing the delay timer for the score scene to start after the button is pressed
        this.delay = 0;
        //button
        this.redButton = this.add.sprite(470, 650, 'redButton').setInteractive();
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

        //making a path for the loopty loop
        graphics = this.add.graphics();
        curve = new Phaser.Curves.Spline([
            -150, 150,
            350, 350,
            560, 380,
            670, 280,
            670, 160,
            550, 80,
            420, 110,
            360, 210,
            390, 320,
            540, 400,
            800, 390,
            1300, 350
        ]);
        points = curve.getDistancePoints(size);
    
        curve = new Phaser.Curves.Spline(points);

        graphics = this.add.graphics();
        graphics.lineStyle(1, 0xffffff, 1);
        curve.draw(graphics, 64);
        graphics.fillStyle(0x00ff00, 1);

        //will help me round to one or two digits
        function roundTo(n, digits) {
            if (digits === undefined) {
              digits = 0;
            };
            var multiplicator = Math.pow(10, digits);
            n = parseFloat((n * multiplicator).toFixed(11));
            var test =(Math.round(n) / multiplicator);
            return +(test.toFixed(digits));
        };
        //the scale for the coaster carts (will also be used to calculate character heights)
        this.coasterscale = 0.18;

        for(let i = 0; i < (ridingCustomers); i++){
            //all riders array relies on number of customers
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
            };
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
            //console.log('accessory ARRAY', allRiders_array[i]);
            //console.log("allRiders_array[i].length", allRiders_array[i].length);
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

        //console.log('rider sprite array!!!:', riderSprite_array);
        //console.log('accessorySprite_array!!!', accessorySprite_array);

    };
    //adding all the rollar coaster cars that go around the loop
    //put it into a function to call later
    pathStart(){
        //putting riders and accessories on the loopty loop
        // for(let i = 0; i < (riderSprite_array.length); i++){
        //     this.rider = this.add.follower(curve, -180, 140, allRiders_array[i][1]);
        //     this.rider.setScale(0.06);
        //     this.rider.setFrame(1);
        //     for(let a = 2; a < (allRiders_array[i].length); a++){
        //         this.accessory2 = this.add.follower(curve, -180, 140, allRiders_array[i][a]);
        //         this.accessory2.setScale(0.06);
        //         this.accessory2.startFollow({
        //             duration: 6000,
        //             positionOnPath: false,
        //             ease: 'Sine.easeInOut',
        //             delay: i * 160,
        //             rotateToPath: true,
        //         });
        //     };
        //     this.rider.startFollow({
        //         duration: 6000,
        //         positionOnPath: false,
        //         ease: 'Sine.easeInOut',
        //         delay: i * 160,
        //         rotateToPath: true,
        //     });
        // };
        //separate out carts

        //check if there is one rider
        if(riderSprite_array.length > 0){
            //create a new follower
            this.rider01 = this.add.follower(curve, -160, 140, allRiders_array[0][1]);
            this.rider01.setScale(0.06);
            this.rider01.setFrame(1);
            this.rider01.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 0 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[0].length); a++){
                this.accessory2 = this.add.follower(curve, -160, 140, allRiders_array[0][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 0 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 1){
            //create a new follower
            this.rider02 = this.add.follower(curve, -180, 140, allRiders_array[1][1]);
            this.rider02.setScale(0.06);
            this.rider02.setFrame(1);
            this.rider02.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 0 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[1].length); a++){
                this.accessory2 = this.add.follower(curve, -180, 140, allRiders_array[1][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 0 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 2){
            //create a new follower
            this.rider03 = this.add.follower(curve, -160, 140, allRiders_array[2][1]);
            this.rider03.setScale(0.06);
            this.rider03.setFrame(1);
            this.rider03.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 1 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[2].length); a++){
                this.accessory2 = this.add.follower(curve, -160, 140, allRiders_array[2][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 1 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 3){
            //create a new follower
            this.rider04 = this.add.follower(curve, -180, 140, allRiders_array[3][1]);
            this.rider04.setScale(0.06);
            this.rider04.setFrame(1);
            this.rider04.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 1 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[3].length); a++){
                this.accessory2 = this.add.follower(curve, -180, 140, allRiders_array[3][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 1 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 4){
            //create a new follower
            this.rider05 = this.add.follower(curve, -160, 140, allRiders_array[4][1]);
            this.rider05.setScale(0.06);
            this.rider05.setFrame(1);
            this.rider05.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 2 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[3].length); a++){
                this.accessory2 = this.add.follower(curve, -160, 140, allRiders_array[3][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 2 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 5){
            //create a new follower
            this.rider06 = this.add.follower(curve, -180, 140, allRiders_array[5][1]);
            this.rider06.setScale(0.06);
            this.rider06.setFrame(1);
            this.rider06.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 2 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[4].length); a++){
                this.accessory2 = this.add.follower(curve, -180, 140, allRiders_array[4][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 2 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 6){
            //create a new follower
            this.rider07 = this.add.follower(curve, -160, 140, allRiders_array[6][1]);
            this.rider07.setScale(0.06);
            this.rider07.setFrame(1);
            this.rider07.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 3 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[5].length); a++){
                this.accessory2 = this.add.follower(curve, -160, 140, allRiders_array[5][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 3 * 160,
                    rotateToPath: true,
                });
            };
        }
        if(riderSprite_array.length > 7){
            //create a new follower
            this.rider08 = this.add.follower(curve, -180, 140, allRiders_array[7][1]);
            this.rider08.setScale(0.06);
            this.rider08.setFrame(1);
            this.rider08.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 3 * 160,
                rotateToPath: true,
            });
            for(let a = 2; a < (allRiders_array[6].length); a++){
                this.accessory2 = this.add.follower(curve, -180, 140, allRiders_array[6][a]);
                this.accessory2.setScale(0.06);
                this.accessory2.startFollow({
                    duration: 6000,
                    positionOnPath: false,
                    ease: 'Sine.easeInOut',
                    delay: 3 * 160,
                    rotateToPath: true,
                });
            };
        }
        // for more than 8 riders

        this.roller1 = this.add.follower(curve, -180, 150, 'coasterCart');
        this.roller1.setScale(0.07);
        this.roller1.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 0 * 160,
                rotateToPath: true,
        });

        this.roller2 = this.add.follower(curve, -180, 150, 'coasterCart');
        this.roller2.setScale(0.07);
        this.roller2.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 1 * 160,
                rotateToPath: true,
        });
        this.roller3 = this.add.follower(curve, -180, 150, 'coasterCart');
        this.roller3.setScale(0.07);
        this.roller3.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 2 * 160,
                rotateToPath: true,
        });
        this.roller4 = this.add.follower(curve, -180, 150, 'coasterCart');
        this.roller4.setScale(0.07);
        this.roller4.startFollow({
                duration: 6000,
                positionOnPath: false,
                ease: 'Sine.easeInOut',
                delay: 3 * 160,
                rotateToPath: true,
        });



        //must have 2 riders per cart
        // for (var i = 0; i < 4; i++)
        // {
        //     this.follower = this.add.follower(curve, -180, 150, 'coasterCart'); //100+(30 * i)
        //     this.follower.setScale(0.07);
 
        //     this.follower.startFollow({
        //         duration: 6000,
        //         positionOnPath: false,
        //         ease: 'Sine.easeInOut',
        //         delay: i * 160,
        //         rotateToPath: true,
        //     });

        // };

    };
    update(){
        

        //press red button to make coasters start
        if(this.redButtonHover == true){
            this.input.on('pointerdown', function (pointer) {
                //button moves down then up with delay
                this.redButton.setFrame(1);
                this.redButton1.play();
            }, this)
            this.input.on('pointerup', function (pointer) {
                //button can only be pressed once
                if(this.buttonpressed == false){
                    this.pathStart();

                }
                //button moves down then up with delay
                this.redButton.setFrame(0);
                this.redButton2.play();
                //start background coaster
                //will make coaster move
                this.coasterstart = true;
                //keeps track of if the button is pressed so it can't be pressed agian
                this.buttonpressed = true;
            }, this)
        };

        //will make coaster move when button is pressed
        if(this.coasterstart == true){
            //this.cart1.anims.play('wheels');
            //set a timer and then have scene change to score
            this.delay += 1;
            if(Math.round(this.delay/60) > 5.9){
                this.scene.start('scoreScene');
            };
            
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
};