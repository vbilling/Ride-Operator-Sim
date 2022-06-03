class credits extends Phaser.Scene{
    constructor(){
        super("creditsScene");
    }
    create(){
        this.add.tileSprite(0, 0, 960, 720, 'day1Background', ).setOrigin(0,0);
        
        this.william = this.add.sprite(145, 340, 'fox', 0).setScale(.25);
        
        this.victoria = this.add.sprite(460, 340, 'cat3', 0).setScale(.25);

        this.karoline = this.add.sprite(800, 340, 'dog1', 0).setScale(.25);

        this.add.sprite(halfscreenwidth, 100, 'credits');

        this.add.sprite(450, 525, 'creditVictoria').setScale(.25);

        this.add.sprite(790, 525, 'creditKaroline').setScale(.25);

        this.add.sprite(135, 525, 'creditWilliam').setScale(.25);

        let creditsConfig = {
            fontFamily: 'Arial',
            fontSize: '10px',
            color: 'white',
            align: 'left',
            padding: {
                top: 5,
                bottom: 4
            }
        };

        //menu button
        this.pointer2 = this.input.activePointer;
        this.menuPointer = false;
        this.menuButton = this.physics.add.sprite(870, 50, 'menuButton');
        this.menuButton.body.allowGravity = false;
        this.menuButton.setScale(0.15);
        this.menuButton.body.setSize(870, 300);
        this.menuButton.setInteractive();
        this.menuButton.on("pointerover", () => {
            this.menuPointer = true;
            this.menuButton.setFrame(1);
        });
        this.menuButton.on("pointerout", () => {
            this.menuPointer = false;
            this.menuButton.setFrame(0);
        });
        this.buttonPress = this.sound.add('buttonPress');

        //sound asset credits
        this.soundCreditText1 = this.add.text(30, 560, 'Sounds that were used and modified: \n1. Incorrect - https://freesound.org/people/rhodesmas/sounds/342756/2. \n2. Correct2 - https://freesound.org/people/unadamlar/sounds/476178/' +
        '\n3. Huh, oh, sigh1, oh, ugh1, - https://freesound.org/people/Iceofdoom/sounds/575815/' +
        "\n4. Hmm - https://freesound.org/people/LasciviousGork/sounds/168132/" +
        '\n5. Hmm2 - https://freesound.org/people/esperar/sounds/170776/' +
        '\n6. Deathmetal - https://freesound.org/people/podenecromaniac/sounds/335532/' +
        '\n7. Pop - https://freesound.org/people/greenvwbeetle/sounds/244654/' +
        '\n8. Red button 1, red button 2 - https://freesound.org/people/cmartins10/sounds/611962/' +
        '\n9. Ocean waves - https://freesound.org/people/InspectorJ/sounds/400632/' +
        '\n10. Correct - https://freesound.org/people/twiggles/sounds/94670/' +
        '\n11. Button press - https://freesound.org/people/renatalmar/sounds/264981/'
        , creditsConfig)
        this.soundCreditText2 = this.add.text(450, 545, '\n12. Thud 2 - https://freesound.org/people/kyles/sounds/452504/' +
        '\n13. Thud - https://freesound.org/people/Bird_man/sounds/275160/' +
        '\n14. Whoosh - https://freesound.org/people/EminYILDIRIM/sounds/539172/' +
        '\n15. Tick1, tick2 - https://freesound.org/people/abyeditsound/sounds/450509/' +
        '\n16. Trumpet - https://freesound.org/people/LittleRobotSoundFactory/sounds/270528/'+
        '\n17. Coaster wheels - https://freesound.org/people/arnaud%20coutancier/sounds/560610/' +
        '\n18. Scream - https://freesound.org/people/sed4906/sounds/548217/' +
        '\n19. Lightbulb - https://freesound.org/people/MATRIXXX_/sounds/459694/' +
        '\n20. Scribble - https://freesound.org/people/InspectorJ/sounds/398271/' +
        '\n21. Bounce - https://freesound.org/people/Jofae/sounds/383240/' +
        '\n22. Happy birthday - https://freesound.org/people/SergeQuadrado/sounds/541176/' +
        '\n23. Gasp - https://freesound.org/people/jsburgh/sounds/267427/' +
        '\n24. Glitter - https://freesound.org/people/opticaillusions/sounds/614867/', creditsConfig)
    }
    advanceScene(){
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                //this.buttonPress.play();
            },
            loop: false
        }) 
        this.time.addEvent({
            delay: 500,
            callback: ()=>{
                //this.buttonPress.play();
                this.scene.start("menuScene");
            },
            loop: false
        }) 
    }
    update(){
        if(this.pointer2.isDown && this.menuPointer == true){
            this.advanceScene();
        }; 


    }
}