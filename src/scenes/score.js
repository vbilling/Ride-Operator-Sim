class score extends Phaser.Scene{
    constructor(){
        super("scoreScene");
    }
    preload(){


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

        //the scale for the coaster carts (will also be used to calculate character heights)
        this.coasterscale = 0.18;

        //distance between text
        this.textDistance = 0;
        for(let i = 0; i < (customers); i++){
            console.log('i:', i);
            
            this.info = this.add.text(100 + this.textDistance, 200, allRiders_array[i]);
            this.textDistance += 150;
            this.customerHeight = roundTo(allRiders_array[i][0], 1);
            console.log('OLD HEIGHT', this.customerHeight);
            this.customer = this.add.sprite(this.info.x + 60, this.info.y + 350, allRiders_array[i][1]);
            //setting the height based on what the height was before with this.customerNewHeight
            if(this.customerHeight == 0.2){
                console.log('extra small');
                this.customerNewHeight = (this.coasterscale - 0.04);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.3){
                console.log('small');
                this.customerNewHeight = this.coasterscale;
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.4){
                console.log('large');
                this.customerNewHeight = (this.coasterscale + 0.05);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);
            }else if(this.customerHeight == 0.5){
                console.log('extra large');
                this.customerNewHeight = (this.coasterscale + 0.07);
                console.log('customer NEW HEIGHT', this.customerNewHeight);
                this.customer.setScale(this.customerNewHeight);

            }

            
            //now add the accessories
            for(let a = 0; a < allRiders_array[i].length; a++){
                this.accessory = this.add.sprite(this.customer.x, this.customer.y, allRiders_array[i][a]);
                this.accessory.setScale(this.customerNewHeight);
            }
        }



    };
    update(){

    };
}