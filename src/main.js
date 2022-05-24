let config = {
    type: Phaser.CANVAS, 
    width: 960, 
    height: 720, 
    scene: [menu, trainingday, trainingIntro, day1Intro, day1, coaster, day2Intro, day2, day3Intro, day3, lose, score, win], 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade", 
        arcade: {
            debug: false,
            gravity: {y: 800}, 
        }
    }
}

let game = new Phaser.Game(config);

let keySpace;

//for dialogue in training scene
let bossText = [];
let currentText;
let delayNow = false;
let textNum = 0;

//for training characters
let testRider;


//half the width of the screen, to note the middle

let halfscreenwidth = game.config.width /2;

//the scale of the characters and accessories
let scale = 0.5; 

//how close you are to getting fired
let fired = 0;

//keeping track of how many customers you let on the ride
let ridingCustomers = 0;

//keeping track of how many customers you do not let on the ride 
let nonridingCustomers = 0;

//array of accessories rider has 
let riderAccessories_array = [];
//array full of all customers allowed on ride (riderAccessories_array is nested in this one)
let allRiders_array = [];

//array for customers who were not allowed to ride 
let nonRiders_array = [];

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

//keeping track of what day it is
let menuDone = false;
let trainingDone = false;
let day1Done = false;
let day2Done = false;
let day3Done = false;


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
wrist2_array = [];
neck_array = [];


