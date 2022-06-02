class win extends Phaser.Scene{
    constructor(){
        super("winScene");
    }
    preload(){
        // this.load.spritesheet('koala', './assets/koala.png', {frameWidth: 1536, frameHeight: 2048, startFrame: 0, endFrame: 2})
        // this.load.image('present1', './assets/present1.png');
        // this.load.image('present2', './assets/present2.png');

        // this.load.image('body', './assets/speck.png');
        // this.load.image('glowing', './assets/glowing.png');
        // this.load.image('birthdayText', './assets/birthdayText.png');
        // this.load.image('broText', './assets/broText.png');
        // this.load.image('bdayBackground', './assets/bdayBackground.png');
        // this.load.image('downArrow', './assets/downArrow.png');
        

    }
    create(){
        winDone = true;
        master_array = []
        this.happyBirthdaySong = this.sound.add('happyBirthday');
        this.gasp = this.sound.add('gasp');
        this.glitter = this.sound.add('glitter');
        this.happyBirthdaySong.play();
        this.happyBirthdaySong.volume = 0.2;

        this.add.image(0,0, 'bdayBackground').setOrigin(0,0);
        this.pointer2 = this.input.activePointer;

        //this.pointerOver = false;
        this.menuPointer = false;

        this.presentOpen = false;

        this.bounce = this.sound.add('bounce');

        this.present1 = this.add.sprite(20, 50, 'present1').setOrigin(0,0);
        //this.presentBody = this.physics.add.sprite(270, 450, 'present2');
        //this.presentBody.setAlpha(1);
        //this.presentBody.body.allowGravity = false;
        //this.presentBody.body.setSize(350, 100); //0.1, 1500
        //this.presentBody.setInteractive();
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
        //this.present2 = this.add.follower(line3, -10, 50, 'present2').setOrigin(0,0);

        // this.presentBody.on("pointerover", () => {
        //     //will tell code in update to go to next scene
        //     this.pointerOver = true;
        //     console.log('pointerover')
        // });
        // this.presentBody.on("pointerout", () => {
        //     this.pointerOver = false;
        //     console.log('pointerout')
        // });
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

        // this.presentBody.on('pointerdown', function (pointer) {
        //     this.falsePresent.setAlpha(0);
        //     this.present2 = this.add.follower(this.line3, 20, 50, 'present2').setOrigin(0,0);
        //     this.present2.startFollow({
        //         duration: 700,
        //         yoyo: false,
        //         ease: 'Linear', //'Sine.easeInOut'
        //     });
        //     this.koala2.setAlpha(0);
        //     this.koala3.setAlpha(1);
        //     this.koala3.play('eyes');
        //     this.glowing.setAlpha(1);
        //     this.menuButton.setAlpha(1);
        //     this.broText.setAlpha(1);
        //     this.text1.setAlpha(0);
        //     this.downArrow.setAlpha(0)

        // });
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
        // graphics2.clear();
        // graphics2.lineStyle(2, 0xffffff, 1);
    
        // path2.draw(graphics2);
    
        // path2.getPoint(follower2.t, follower2.vec);
    
        // graphics2.fillStyle(0xff0000, 1);
        // graphics2.fillRect(follower2.vec.x - 8, follower2.vec.y - 8, 16, 16);


        // graphics3.clear();
        // graphics3.lineStyle(2, 0xffffff, 1);
    
        // path3.draw(graphics3);
    
        // path3.getPoint(follower3.t, follower3.vec);
    
        // graphics3.fillStyle(0xff0000, 1);
        // graphics3.fillRect(follower3.vec.x - 8, follower3.vec.y - 8, 16, 16);
    }
}