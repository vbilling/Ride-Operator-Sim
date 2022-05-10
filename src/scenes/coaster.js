class coaster extends Phaser.Scene{
    constructor(){
        super("coasterScene");
    }
    preload(){
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});

        //backgroung
        this.load.image('blueBackground', './assets/blueBackground.png');

    };
    create(){
        //background
        this.background = this.add.tileSprite(0, 0, 960, 720, 'blueBackground').setOrigin(0, 0);
        this.add.text(100, 100, 'Coaster Scene');
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

        //the scale for the coaster carts (will also be used to calculate character heights)
        this.coasterscale = 0.18;
        //add coaster carts
        this.cart1 = this.add.sprite(820, 520, 'coasterCart', 0)
        this.cart1.setScale(this.coasterscale);
        this.cart2 = this.add.sprite(587, 520, 'coasterCart', 0)
        this.cart2.setScale(this.coasterscale);
        this.cart3 = this.add.sprite(354, 520, 'coasterCart', 0)
        this.cart3.setScale(this.coasterscale);
        this.cart4 = this.add.sprite(121, 520, 'coasterCart', 0)
        this.cart4.setScale(this.coasterscale);

  
        for(let i = 0; i < (customers); i++){
            console.log('i:', i);
            
            this.customerHeight = roundTo(allRiders_array[i][0], 1);
            console.log('OLD HEIGHT', this.customerHeight);
            this.customer = this.add.sprite(60, 350, allRiders_array[i][1]);
            //setting the height based on what the height was before with this.customerNewHeight
            if(this.customerHeight == 0.2){
                console.log('small');
                //will help place character coordinates correctly in coaster seat
                this.size = 'small';
                this.customerNewHeight = (this.coasterscale - 0.08);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.3){
                console.log('medium');
                this.size = 'medium';
                this.customerNewHeight = (this.coasterscale - 0.05);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.4){
                console.log('large');
                this.size = 'large';
                this.customerNewHeight = (this.coasterscale + 0.02);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.5){
                console.log('extra large');
                this.size = 'extra large';
                this.customerNewHeight = (this.coasterscale + 0.05);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);

            }
            //put the customers in the correct seats starting from from seats
            //the first rider
            if(i == 0){ //perfect
                if(this.size == "small"){
                    this.customer.x = this.cart1.x + 49;
                    this.customer.y = this.cart1.y - 30;
                };
                if(this.size == "medium"){ //perfect
                    this.customer.x = this.cart1.x + 43;
                    this.customer.y = this.cart1.y - 45;
                }; //perfect
                if(this.size == 'large'){
                    this.customer.x = this.cart1.x + 30;
                    this.customer.y = this.cart1.y - 75;
                }; //perfect
                if(this.size == 'extra large'){
                    this.customer.x = this.cart1.x + 27;
                    this.customer.y = this.cart1.y - 90;
                };
            };
            if(i == 1){
                if(this.size == "small"){ //perfect
                    this.customer.x = this.cart1.x - 30;
                    this.customer.y = this.cart1.y - 30;
                };
                if(this.size == "medium"){ //perfect
                    this.customer.x = this.cart1.x - 25;
                    this.customer.y = this.cart1.y - 45;
                };
                if(this.size == 'large'){ //perfect
                    this.customer.x = this.cart1.x - 4;
                    this.customer.y = this.cart1.y - 75;
                };
                if(this.size == 'extra large'){ //perfect
                    this.customer.x = this.cart1.x + 5;
                    this.customer.y = this.cart1.y - 90;
                };
            };
            if(i == 2){
                if(this.size == "small"){
                    this.customer.x = this.cart2.x + 49;
                    this.customer.y = this.cart2.y - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = this.cart2.x + 43;
                    this.customer.y = this.cart2.y - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = this.cart2.x + 30;
                    this.customer.y = this.cart2.y - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = this.cart2.x + 27;
                    this.customer.y = this.cart2.y - 90;
                };
            };
            if(i == 3){
                if(this.size == "small"){
                    this.customer.x = this.cart2.x -30;
                    this.customer.y = this.cart2.y - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = this.cart2.x - 25;
                    this.customer.y = this.cart2.y - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = this.cart2.x - 4;
                    this.customer.y = this.cart2.y - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = this.cart2.x + 5;
                    this.customer.y = this.cart2.y - 90;
                };
            };
            if(i == 4){
                if(this.size == "small"){
                    this.customer.x = this.cart3.x + 49;
                    this.customer.y = this.cart3.y - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = this.cart3.x + 43;
                    this.customer.y = this.cart3.y - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = this.cart3.x + 30;
                    this.customer.y = this.cart3.y - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = this.cart3.x + 27;
                    this.customer.y = this.cart3.y - 90;
                };
            };
            if(i == 5){
                if(this.size == "small"){
                    this.customer.x = this.cart3.x -30;
                    this.customer.y = this.cart3.y - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = this.cart3.x - 25;
                    this.customer.y = this.cart3.y - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = this.cart3.x - 4;
                    this.customer.y = this.cart3.y - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = this.cart3.x + 5;
                    this.customer.y = this.cart3.y - 90;
                };
            };
            if(i == 6){
                if(this.size == "small"){
                    this.customer.x = this.cart4.x + 49;
                    this.customer.y = this.cart4.y - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = this.cart4.x + 43;
                    this.customer.y = this.cart4.y - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = this.cart4.x + 30;
                    this.customer.y = this.cart4.y - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = this.cart4.x + 27;
                    this.customer.y = this.cart4.y - 90;
                };
            };
            if(i == 7){
                if(this.size == "small"){
                    this.customer.x = this.cart4.x -30;
                    this.customer.y = this.cart4.y - 30;
                };
                if(this.size == "medium"){
                    this.customer.x = this.cart4.x - 25;
                    this.customer.y = this.cart4.y - 45;
                };
                if(this.size == 'large'){
                    this.customer.x = this.cart4.x - 4;
                    this.customer.y = this.cart4.y - 75;
                };
                if(this.size == 'extra large'){
                    this.customer.x = this.cart4.x + 5;
                    this.customer.y = this.cart4.y - 90;
                };
            };
            //if more customers are let on than allowed
            

            
            //now add the accessories (start a at 2 because first two values are height and body)
            console.log('accessory ARRAY', allRiders_array[i]);
            console.log("allRiders_array[i].length", allRiders_array[i].length);
            for(let a = 2; a < (allRiders_array[i].length); a++){
                console.log('a:', a);
                this.accessory = this.add.sprite(this.customer.x, this.customer.y, allRiders_array[i][a]);
                this.accessory.setScale(this.customerNewHeight);
            }
        }

        //add coaster carts again so they are on top
        this.cart1 = this.add.sprite(820, 520, 'coasterCart', 0)
        this.cart1.setScale(this.coasterscale);
        this.cart2 = this.add.sprite(587, 520, 'coasterCart', 0)
        this.cart2.setScale(this.coasterscale);
        this.cart3 = this.add.sprite(354, 520, 'coasterCart', 0)
        this.cart3.setScale(this.coasterscale);
        this.cart4 = this.add.sprite(121, 520, 'coasterCart', 0)
        this.cart4.setScale(this.coasterscale);

        




    };
    update(){

    };
}