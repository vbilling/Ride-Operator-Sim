class coaster extends Phaser.Scene{
    constructor(){
        super("coasterScene");
    }
    preload(){
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});
        this.load.spritesheet('redButton', './assets/redButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 1});

        //backgroung
        this.load.image('blueBackground', './assets/blueBackground.png');

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
            this.customer = this.add.sprite(60, 350, allRiders_array[i][1]);
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


            //if more customers are let on than allowed



            //now add the accessories (start a at 2 because first two values are height and body)
            console.log('accessory ARRAY', allRiders_array[i]);
            console.log("allRiders_array[i].length", allRiders_array[i].length);
            for(let a = 2; a < (allRiders_array[i].length); a++){
                this.accessory = this.add.sprite(this.customer.x, this.customer.y, allRiders_array[i][a]);
                //add accessories to an array
                accessorySprite_array.push(this.accessory);
                this.accessory.setScale(this.customerNewHeight);
            }

            console.log('accessorySprite_array', accessorySprite_array);

        }

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

        




    };
    update(){
        //make sure that all riders and accessories move with the coaster
        for(let i = 0; i < (riderSprite_array.length); i++){
            //riderSprite_array[i]
            if(i == 0){ 
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart1.x + 49;
                    riderSprite_array[i].y = this.cart1.y - 30;
                };
                if(this.size == "medium"){ 
                    riderSprite_array[i].x = this.cart1.x + 43;
                    riderSprite_array[i].y = this.cart1.y - 45;
                }; 
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart1.x + 30;
                    riderSprite_array[i].y = this.cart1.y - 75;
                }; 
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart1.x + 27;
                    riderSprite_array[i].y = this.cart1.y - 90;
                };
            };
            if(i == 1){
                if(this.size == "small"){ //perfect
                    riderSprite_array[i].x = this.cart1.x - 30;
                    riderSprite_array[i].y = this.cart1.y - 30;
                };
                if(this.size == "medium"){ //perfect
                    riderSprite_array[i].x = this.cart1.x - 25;
                    riderSprite_array[i].y = this.cart1.y - 45;
                };
                if(this.size == 'large'){ //perfect
                    riderSprite_array[i].x = this.cart1.x - 4;
                    riderSprite_array[i].y = this.cart1.y - 75;
                };
                if(this.size == 'extra large'){ //perfect
                    riderSprite_array[i].x = this.cart1.x + 5;
                    riderSprite_array[i].y = this.cart1.y - 90;
                };
            };
            if(i == 2){
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart2.x + 49;
                    riderSprite_array[i].y = this.cart2.y - 30;
                };
                if(this.size == "medium"){
                    riderSprite_array[i].x = this.cart2.x + 43;
                    riderSprite_array[i].y = this.cart2.y - 45;
                };
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart2.x + 30;
                    riderSprite_array[i].y = this.cart2.y - 75;
                };
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart2.x + 27;
                    riderSprite_array[i].y = this.cart2.y - 90;
                };
            };
            if(i == 3){
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart2.x -30;
                    riderSprite_array[i].y = this.cart2.y - 30;
                };
                if(this.size == "medium"){
                    riderSprite_array[i].x = this.cart2.x - 25;
                    riderSprite_array[i].y = this.cart2.y - 45;
                };
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart2.x - 4;
                    riderSprite_array[i].y = this.cart2.y - 75;
                };
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart2.x + 5;
                    riderSprite_array[i].y = this.cart2.y - 90;
                };
            };
            if(i == 4){
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart3.x + 49;
                    riderSprite_array[i].y = this.cart3.y - 30;
                };
                if(this.size == "medium"){
                    riderSprite_array[i].x = this.cart3.x + 43;
                    riderSprite_array[i].y = this.cart3.y - 45;
                };
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart3.x + 30;
                    riderSprite_array[i].y = this.cart3.y - 75;
                };
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart3.x + 27;
                    riderSprite_array[i].y = this.cart3.y - 90;
                };
            };
            if(i == 5){
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart3.x -30;
                    riderSprite_array[i].y = this.cart3.y - 30;
                };
                if(this.size == "medium"){
                    riderSprite_array[i].x = this.cart3.x - 25;
                    riderSprite_array[i].y = this.cart3.y - 45;
                };
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart3.x - 4;
                    riderSprite_array[i].y = this.cart3.y - 75;
                };
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart3.x + 5;
                    riderSprite_array[i].y = this.cart3.y - 90;
                };
            };
            if(i == 6){
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart4.x + 49;
                    riderSprite_array[i].y = this.cart4.y - 30;
                };
                if(this.size == "medium"){
                    riderSprite_array[i].x = this.cart4.x + 43;
                    riderSprite_array[i].y = this.cart4.y - 45;
                };
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart4.x + 30;
                    riderSprite_array[i].y = this.cart4.y - 75;
                };
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart4.x + 27;
                    riderSprite_array[i].y = this.cart4.y - 90;
                };
            };
            if(i == 7){
                if(this.size == "small"){
                    riderSprite_array[i].x = this.cart4.x -30;
                    riderSprite_array[i].y = this.cart4.y - 30;
                };
                if(this.size == "medium"){
                    riderSprite_array[i].x = this.cart4.x - 25;
                    riderSprite_array[i].y = this.cart4.y - 45;
                };
                if(this.size == 'large'){
                    riderSprite_array[i].x = this.cart4.x - 4;
                    riderSprite_array[i].y = this.cart4.y - 75;
                };
                if(this.size == 'extra large'){
                    riderSprite_array[i].x = this.cart4.x + 5;
                    riderSprite_array[i].y = this.cart4.y - 90;
                };
            };


            //bounding accessories to riders
            //take allRiders_array iterate (done above) 
            //then count the length of each one minus the first two (size and body type) and iterate though those terms within each allRiders_array element
            // thats how many from the accessoriesSprite_array to attach to each element in riderSprite_array

            //for(let amount = 0; (allRiders_array[i].length - 2); amount++){

                //this.a_count is the amount of accessories a rider has
                //this.a_count = amount;
                //console.log('amount', amount);
            //};
            //console.log('this.a_count', this.a_count);
            //need to add a_count to a total count to get the correct start term for next time
            //this.total_count = 0

            //starting term should be past amount of accessories plus new amount
            //for(let startTerm = this.total_count; startTerm < (this.total_count + this.a_count); startTerm ++){
                //accessorySprite_array[startTerm].x = riderSprite_array[i].x;
                //accessorySprite_array[startTerm].y = riderSprite_array[i].y;

            };
            //add the a_count to total for net time
            //this.total_count = (this.total_count + this.a_count);
            //console.log('this.total_count:', this.total_count)
            




            //make sure accessories are bound
            //for(let a = 2; a < (allRiders_array[i].length); a++){
                //allRiders_array[i][a].x = riderSprite_array[i].x;
                //allRiders_array[i][a].y = riderSprite_array[i].y;
            //};

        };

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
            this.cart1.body.setVelocityX(100);
            this.cart2.body.setVelocityX(100);
            this.cart3.body.setVelocityX(100);
            this.cart4.body.setVelocityX(100);

        };


    };
}