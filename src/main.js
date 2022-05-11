let config = {
    type: Phaser.CANVAS, 
    width: 960, 
    height: 720, 
    scene: [ menu, day1, coaster, score], 
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
let riderSprite_array = [];
//another one for the score scene
let riderSprite_array2 = [];
let accessorySprite_array = [];
//another one for the score scene
let accessorySprite_array2 = [];

//size array for coaster scene
let riderSize_array = [];
//roller coaster velocity
let RC_Velocity = 900;

//initilizing variables for the path
var path;
var curve;
var points;
var graphics;
var followers;
var size = 32;

//did you go thought the coaster scene?
let coasterScene = false;


//will be used in score array to make a nested array for accessories and their point values
first_array = [];
master_array = [];
//make an array for each accessory and where they go
head_array = ['cowhat1', 'cowhat2', 'cowhat3', 'partyhat'];
hold_array = ['soda1', 'soda2', 'knife'];
wrist_array = ['watch', 'wristband1', 'wristband2', 'wristband3', 'wristband1', 'wristband2', 'wristband3', 'wristband1', 'wristband2', 'wristband3'];
face_array = ['moustache', 'bandaid'];
waist_array = ['phanny1', 'phanny2'];
leg_array = ['ankleMoniter'];


