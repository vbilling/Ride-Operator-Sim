let config = {
    type: Phaser.CANVAS, 
    width: 960, 
    height: 720, 
    scene: [ menu, start, coaster, score], 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade", 
        arcade: {
            debug: false,
            gravity: {y: 400}, 
        }
    }
}

let game = new Phaser.Game(config);

//the scale of the characters and accessories
let scale = 0.5; 

//keeping track of how many customers you let on the ride
let customers = 0;

//array of accessories rider has 
let riderAccessories_array = [];
//array full of all customers allowed on ride (riderAccessories_array is nested in this one)
let allRiders_array = [];

//an array of the rider sprites on coaster scene so that accessories can track their movements in update
riderSprite_array = [];
accessorySprite_array = [];

//size array for coaster scene
riderSize_array = [];

//roller coaster velocity
let RC_Velocity = 800;
