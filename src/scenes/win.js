class win extends Phaser.Scene{
    constructor(){
        super("winScene");
    }
    preload(){

    }
    create(){
        winDone = true;
        master_array = []
        fired = 0;
        this.happyBirthdaySong = this.sound.add('happyBirthday');
        this.gasp = this.sound.add('gasp');
        this.glitter = this.sound.add('glitter');
        this.happyBirthdaySong.play();
        this.happyBirthdaySong.volume = 0.2;

        this.add.image(0,0, 'bdayBackground').setOrigin(0,0);
        this.pointer2 = this.input.activePointer;

        this.menuPointer = false;

        this.presentOpen = false;

        this.bounce = this.sound.add('bounce');

        this.present1 = this.add.sprite(20, 50, 'present1').setOrigin(0,0);
        this.falsePresent = this.add.sprite(20, 50, 'present2').setOrigin(0,0);

        this.birthdayText = this.add.sprite(0, 0, 'birthdayText').setOrigin(0,0);

        this.koala3 = this.add.sprite(650, 450, 'koala').setScale(0.3);
        this.koala3.setFrame(1);
        this.koala3.setAlpha(0);

        this.glowing = this.add.sprite(30, 220, 'glowing').setOrigin(0,0);
        this.glowing.setAlpha(0);

        this.menuButton = this.physics.add.sprite(850, 650, 'menuButton');
        this.menuButton.body.allowGravity = false;
        this.menuButton.setScale(0.2);
        this.menuButton.body.setSize(870, 300);
        this.menuButton.setInteractive();
        this.menuButton.setAlpha(0);

        this.broText = this.add.sprite(710, 370, 'broText');
        this.broText.setAlpha(0);

        let textConfig = {
            fontFamily: 'Avenir',
            fontSize: '30px',
            color: 'white',
            align: 'center',
            stroke: 'black', //#526aba
            strokeThickness: 3,
            padding: {
                top: 5,
                bottom: 4
            },
            //fixedWidth: 100
        };

        this.text1 = this.add.text(180, 220, 'Click to open', textConfig);
        this.downArrow = this.add.sprite(270, 330, 'downArrow');
        this.downArrow.setScale(0.5);
        this.downArrow.setAngle(180);


        //koala jumping up and down path
        graphics2 = this.add.graphics();

        follower2 = { t: 0, vec: new Phaser.Math.Vector2() };

        //  The curves do not have to be joined
        var line1 = new Phaser.Curves.Line([ 600, 380, 600, 300 ]);
        var line2 = new Phaser.Curves.Line([ 600, 400, 600, 380 ]);
        path2 = this.add.path();
        path2.add(line1);
        path2.add(line2);

        this.koala2 = this.add.follower(line1, 650, 450, 'koala').setScale(0.3);
        this.koalaBounce = true;
        this.koala2.startFollow({
            duration: 1000,
            yoyo: true,
            ease: 'Linear', //'Sine.easeInOut'
            repeat: -1,
        });


        graphics3 = this.add.graphics();

        follower3 = { t: 0, vec: new Phaser.Math.Vector2() };

        //  The curves do not have to be joined
        this.line3 = new Phaser.Curves.Line([ 230, 500, 230, 350 ]);
        path3 = this.add.path();
        path3.add(this.line3);
        this.menuButton.on("pointerover", () => {
            this.menuPointer = true;
            this.menuButton.setFrame(1);
        });
        this.menuButton.on("pointerout", () => {
            this.menuPointer = false;
            this.menuButton.setFrame(0);
        });
        this.buttonPress = this.sound.add('buttonPress');

        this.anims.create({
            key: 'eyes',
            frames: this.anims.generateFrameNames('koala', {
                start: 1, 
                end: 2, 
                first: 0}),
                frameRate: 8,
                repeat: -1,
                yoyo: false
        });
        this.koalaBouncey();


    }
    koalaBouncey(){
            this.time.addEvent({
                delay: 2000,
                callback: ()=>{
                    if(this.koalaBounce == true){
                    this.bounce.play();
                    }
                },
                loop: true
            }) 
 
    }
    advanceScene(){
        this.time.addEvent({
            delay: 1,
            callback: ()=>{
                this.buttonPress.play();
            },
            loop: false
        }) 
        this.time.addEvent({
            delay: 600,
            callback: ()=>{
                //this.buttonPress.play();
                this.scene.start("menuScene");
            },
            loop: false
        }) 
    }
    update(){

        if(this.pointer2.isDown && this.presentOpen == false){ //&& this.pointerOver == true\
            this.gasp.play();
            this.falsePresent.setAlpha(0);
            this.present2 = this.add.follower(this.line3, 20, 50, 'present2').setOrigin(0,0);
            this.present2.startFollow({
                duration: 700,
                yoyo: false,
                ease: 'Linear', //'Sine.easeInOut'
            });
            this.koalaBounce = false;
            this.koala2.setAlpha(0);
            this.koala3.setAlpha(1);
            this.koala3.play('eyes');
            this.glowing.setAlpha(1);
            this.menuButton.setAlpha(1);
            this.broText.setAlpha(1);
            this.text1.setAlpha(0);
            this.downArrow.setAlpha(0)
            this.presentOpen = true;
            this.glitter.play()

            this.particles = this.add.particles('glow2');
            this.emitter = this.particles.createEmitter({
                //frame: 'yellow',
                x: 270, y: 450,
                lifespan: { min: 900, max: 2100 },
                angle: { start: 0, end: 360, steps: 64 },
                speed: 60,
                quantity: 20,//64 
                scale: { start: 0.2, end: 0.1 },
                frequency: 10, //32
                blendMode: 'ADD'
            });
            this.particles2 = this.add.particles('glow');
            this.emitter2 = this.particles2.createEmitter({
                //frame: 'yellow',
                x: 270, y: 450,
                lifespan: { min: 900, max: 2100 },
                angle: { start: 0, end: 360, steps: 64 },
                speed: 60,
                quantity: 20,//64 
                scale: { start: 0.1, end: 0.1 },
                frequency: 10, //32
                //blendMode: 'ADD'
            });
        }; 
        if(this.pointer2.isDown && this.menuPointer == true){
            this.advanceScene();
        }; 
    
    }
}