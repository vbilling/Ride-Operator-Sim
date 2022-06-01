class load extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }
    preload(){
        this.load.image('ground', './assets/ground.png');
        this.load.image('heightPole', './assets/height_pole.png');
        this.load.image('exitSign', './assets/exit_sign.png');
        this.load.spritesheet('rulesSign', './assets/rulesSign.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.image('enterSign', './assets/enter_sign.png');
        this.load.spritesheet('readyButton', './assets/readyButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});
        this.load.spritesheet('header', './assets/header.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 8});
        this.load.image('day1Header', './assets/day1Header.png');
        this.load.image('day2Header', './assets/day2Header.png');
        this.load.image('day3Header', './assets/day3Header.png');
        this.load.spritesheet('menuButton', './assets/menuButton.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});

        this.load.image('glow2', './assets/glow2.png');

        this.load.spritesheet('timerClock', './assets/timerClock.png', {frameWidth: 404, frameHeight: 304, startFrame: 0, endFrame: 8});

        this.load.image('day1Background', './assets/background_day1.png');
        this.load.image('day2Background', './assets/background_day2.png');
        this.load.image('day2Title', './assets/day2Title.png');
        this.load.image('player', './assets/player.png');
        this.load.image('day1Title', './assets/day1Title.png');
        this.load.image('day3Background', './assets/background_day3.png');
        this.load.image('day3Title', './assets/day3Title.png');

        //menu
        this.load.spritesheet('startButton', './assets/startButton.png', {frameWidth: 384, frameHeight: 512, startFrame: 0, endFrame: 1});
        this.load.image('titleText', './assets/titleText.png');
        this.load.image('boardwalkTitle', './assets/boardwalkTitle.png');
        this.load.image('background', './assets/rollercoaster_background_day1.png');
        this.load.image('menuPanel', './assets/menuPanel.png');
        this.load.image('startText', './assets/startText.png');
        this.load.spritesheet('chaosText', './assets/chaos.png', {frameWidth: 300, frameHeight: 200, startFrame: 0, endFrame: 1});
        this.load.spritesheet('endlessText', './assets/endless.png', {frameWidth: 300, frameHeight: 200, startFrame: 0, endFrame: 1});
        this.load.image('happyBoss', './assets/happyBoss.png');
        this.load.image('rainbow', './assets/rainbow.png');
        this.load.image('sparkle', './assets/sparkle.png');
        this.load.spritesheet('redButton', './assets/redButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 3});
        this.load.spritesheet('blueButton', './assets/blueButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 2});
        this.load.spritesheet('greenButton', './assets/greenButton.png', {frameWidth: 768, frameHeight: 1024, startFrame: 0, endFrame: 3});
 
        //bodies
        this.load.spritesheet('cat1', './assets/cat1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2}); 
        this.load.spritesheet('cat2', './assets/cat2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('cat3', './assets/cat3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('duck1', './assets/duck1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('duck2', './assets/duck2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('duck3', './assets/duck3.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('bear1', './assets/bear1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('bear2', './assets/bear2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('dog1', './assets/dog1.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('dog2', './assets/dog2.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('fox', './assets/fox.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});
        this.load.spritesheet('blankBody', './assets/blankBody.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2});

        //loading all the audio
        this.load.audio('whoosh', './assets/whoosh.wav');
        this.load.audio('thud', './assets/thud.wav');
        this.load.audio('thud2', './assets/thud2.wav');
        this.load.audio('buttonPress', './assets/buttonPress.wav');
        this.load.audio('correct', './assets/correct.wav');
        this.load.audio('oceanWaves', './assets/oceanWaves.wav');
        this.load.audio('redButton1', './assets/redButton1.wav');
        this.load.audio('redButton2', './assets/redButton2.wav');
        this.load.audio('pop', './assets/pop.wav');
        this.load.audio('deathmetal', './assets/deathmetal.wav');
        this.load.audio('tick1', './assets/tick1.wav');
        this.load.audio('tick2', './assets/tick2.wav');
        this.load.audio('trumpet', './assets/trumpet.wav');
        this.load.audio('rollerCoasterAudio', './assets/rollerCoaster.wav');
        this.load.audio('scream', './assets/scream.wav');
        this.load.audio('lightbulb', './assets/lightbulb.mp3');
        this.load.audio('scribble', './assets/scribble.wav');
        this.load.audio('bounce', './assets/bounce.wav');
        this.load.audio('happyBirthday', './assets/happyBirthday.wav');
        this.load.audio('gasp', './assets/gasp.wav');
        this.load.audio('glitter', './assets/glitter.wav');

        //Accessories (organized so that certain accessories don't overlap)
        //head accessories
        this.load.image('cowhat1', './assets/cowhat1.png');
        this.load.image('cowhat2', './assets/cowhat2.png');
        this.load.image('cowhat3', './assets/cowhat3.png');
        this.load.image('partyhat', './assets/partyhat.png');
        this.load.image('tiara', './assets/tiara.png');

        //held accessories
        this.load.image('soda1', './assets/soda1.png');
        this.load.image('soda2', './assets/soda2.png');
        this.load.image('knife', './assets/knife.png');
        this.load.image('corndog', './assets/corndog.png');
        this.load.image('donut', './assets/donut.png');
        this.load.image('scissors', './assets/scissors.png');
        this.load.image('spatula', './assets/spatula.png');

        //left wrist accessories
        this.load.image('wristband1', './assets/wristband1.png');
        this.load.image('wristband2', './assets/wristband2.png');
        this.load.image('wristband3', './assets/wristband3.png');
        this.load.image('watch', './assets/watch.png');

        //face accessories
        this.load.image('moustache', './assets/moustache.png');
        this.load.image('scar', './assets/scar.png');
        this.load.image('bandaid', './assets/bandaid.png');
        this.load.image('clownNose', './assets/clownNose.png');
        this.load.image('mask', './assets/mask.png');
        this.load.image('glasses1', './assets/glasses1.png');
        this.load.image('glasses2', './assets/glasses2.png');
        this.load.image('pacifier1', './assets/pacifier1.png');
        this.load.image('pacifier2', './assets/pacifier2.png');
        
        //waist accessories
        this.load.image('phanny1', './assets/phanny1.png');
        this.load.image('phanny2', './assets/phanny2.png');
        this.load.image('gucciBelt', './assets/gucciBelt.png');
        this.load.image('tutu', './assets/tutu.png');
        this.load.image('bikini1', './assets/bikini1.png');
        this.load.image('bikini2', './assets/bikini2.png');
        this.load.image('bikini3', './assets/bikini3.png');
        this.load.image('bikini4', './assets/bikini4.png');
        this.load.image('bikini5', './assets/bikini5.png');
        this.load.image('swimTrunks1', './assets/swimTrunks1.png');
        this.load.image('swimTrunks2', './assets/swimTrunks2.png');
        this.load.image('swimTrunks3', './assets/swimTrunks3.png');
        this.load.image('swimTrunks4', './assets/swimTrunks4.png');


        //left leg accessories
        this.load.image('ankleMoniter', './assets/ankleMoniter.png');

        //wrist accessories 2
        this.load.image('handcuffs', './assets/handcuffs.png')

        //neck accessories
        this.load.image('chain', './assets/chain.png');
        this.load.image('shellNecklace', './assets/shellNecklace.png');
        this.load.image('bowtie', './assets/bowtie.png');


        //coaster scene
        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});
        this.load.image('coasterBackgroundDay1', './assets/rollercoaster_background_day1.png');
        this.load.image('coasterBackgroundDay2', './assets/rollercoaster_background_day2.png');
        this.load.image('coasterBackgroundDay3', './assets/rollercoaster_background_day3.png');
        this.load.image('loopOverlap', './assets/loopOverlap.png')
        this.load.image('controlPanel', './assets/controlpanel.png');
        this.load.image('bottomTrack', './assets/bottomTrack.png');

        //score scene
        //progress bar, temp stand in 
        this.load.image('progressBar', './assets/platform.png');
        this.load.image('firedMeter', './assets/firedMeter.png');

        this.load.spritesheet('coasterCart', './assets/coaster.png', {frameWidth: 2048, frameHeight: 1536, startFrame: 0, endFrame: 1});
        this.load.spritesheet('nextButton', './assets/nextButton.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 1});
        this.load.spritesheet('capacityMeter', './assets/capacityMeter.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 8});
        this.load.image('blood', './assets/blood.png');


        //for score board
        this.load.image('scoreBoard', './assets/scoreBoard.png');
        this.load.image('NOhats', './assets/NOhats.png');
        this.load.image('NOfood', './assets/NOfood.png');
        this.load.image('NOweapons', './assets/NOweapons.png');
        this.load.image('NOcriminals', './assets/NOcriminals.png');
        this.load.image('incorrectWristbandText', './assets/incorrectWristbandText.png');
        this.load.image('missingWristbandText', './assets/missingWristbandText.png');
        this.load.image('TOOshortText', './assets/TOOshortText.png');
        this.load.image('TOOtallText', './assets/TOOtallText.png');

        //win scene
        this.load.spritesheet('koala', './assets/koala.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2})
        this.load.image('present1', './assets/present1.png');
        this.load.image('present2', './assets/present2.png');

        this.load.image('body', './assets/speck.png');
        this.load.image('glowing', './assets/glowing.png');
        this.load.image('birthdayText', './assets/birthdayText.png');
        this.load.image('broText', './assets/broText.png');
        this.load.image('bdayBackground', './assets/bdayBackground.png');
        this.load.image('downArrow', './assets/downArrow.png');

        //lose scene 
        this.load.image('redBackground3', './assets/redBackground2.png');
        this.load.image('firedText', './assets/firedText.png');
        //this.load.spritesheet('startoverButton', './assets/startoverButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});
        this.load.image('firedBoss', './assets/firedBoss.png');

        //training day
        this.load.image('day1Background', './assets/background_day1.png');
        //this.load.image('ground', './assets/ground.png');
        //this.load.image('heightPole', './assets/height_pole.png');
        //this.load.image('exitSign', './assets/exit_sign.png');
        //this.load.image('enterSign', './assets/enter_sign.png');
        this.load.spritesheet('duckyellow', './assets/duckyellow.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duckpink', './assets/duckpink.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.spritesheet('duckblue', './assets/duckblue.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 1});
        this.load.image('threeDays', './assets/threeDays.png');

        this.load.spritesheet('boss', './assets/boss.png', {frameWidth: 480, frameHeight: 360, startFrame: 0, endFrame: 6});
        this.load.spritesheet('contract', './assets/contract.png', {frameWidth: 960, frameHeight: 720, startFrame: 0, endFrame: 2});

        this.load.audio('hmm', './assets/hmm.wav');
        this.load.audio('hmm2', './assets/hmm2.wav');
        this.load.audio('ugh1', './assets/ugh1.wav');
        this.load.audio('oh1', './assets/oh1.wav');
        this.load.audio('oh2', './assets/oh2.wav');
        this.load.audio('sigh1', './assets/sigh1.wav');
        this.load.audio('huh', './assets/huh.wav');
        this.load.audio('correct2', './assets/correct2.wav');
        this.load.audio('incorrect', './assets/incorrect.wav');


        this.load.spritesheet('directions', './assets/directions2.png', {frameWidth: 920, frameHeight: 760, startFrame: 0, endFrame: 12});
        this.load.image('textBubble', './assets/textBubble.png');
        this.load.image('boardwalkLogo', './assets/boardwalkLogo.png');
        //this.load.spritesheet('readyButton', './assets/readyButton.png', {frameWidth: 500, frameHeight: 375, startFrame: 0, endFrame: 1});
        this.load.spritesheet('bouncingArrow', './assets/bouncingArrow.png', {frameWidth: 612, frameHeight: 612, startFrame: 0, endFrame: 7});
        this.load.image('rulesSign2', './assets/rulesSign.png');
        this.load.spritesheet('allowArrow', './assets/allowArrow.png', {frameWidth: 712, frameHeight: 712, startFrame: 0, endFrame: 6});
        this.load.spritesheet('denyArrow', './assets/denyArrow.png', {frameWidth: 712, frameHeight: 712, startFrame: 0, endFrame: 6});

        //training intro
        this.load.image('trainingIntroText', './assets/trainingIntroText.png');
        this.load.image('background1', './assets/abstract_4.png');

        //day 1 intro
        this.load.image('day1IntroText', './assets/day1IntroText.png');
        this.load.image('day2IntroText', './assets/day2IntroText.png');
        this.load.image('day3IntroText', './assets/day3IntroText.png');
        this.load.image('abstract_1', './assets/abstract_1.png');
        this.load.image('abstract_2', './assets/abstract_2.png');
        this.load.image('abstract_3', './assets/abstract_3.png');

        //particle
        this.load.image('glow', './assets/glow.png');

        //win intro
        this.load.image('winText', './assets/winText.png');
        this.load.image('greenBackground', './assets/greenBackground.png');

        //chaos mode
        this.load.image('comingSoon', './assets/comingSoon.png');

        //endless mode
        this.load.image('comingSoon2', './assets/comingSoon2.png');


    
    }
    create(){
        this.scene.start("day2Scene");
    }


}