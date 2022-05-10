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

        //distance between text
        this.textDistance = 0;
        for(let i = 0; i < (customers); i++){
            console.log('i:', i);
            
            this.info = this.add.text(100 + this.textDistance, 200, allRiders_array[i]);
            this.textDistance += 150;
            this.customer = this.add.sprite(this.info.x + 60, this.info.y + 350, allRiders_array[i][0]);
            this.customer.setScale(0.2);
            //now add the accessories
            for(let a = 0; a < allRiders_array[i].length; a++){
                this.accessory = this.add.sprite(this.customer.x, this.customer.y, allRiders_array[i][a]);
                this.accessory.setScale(0.2);
            }
        }



    };
    update(){

    };
}