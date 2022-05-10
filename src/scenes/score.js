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
            
            this.add.text(100 + this.textDistance, 200, allRiders_array[i]);
            this.textDistance += 150;
        }



    };
    update(){

    };
}