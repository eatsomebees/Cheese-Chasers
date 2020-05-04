class Play extends Phaser.Scene {

    constructor() {
        super("playScene")
    }

    preload() {
        this.load.image('player', './assets/player.png');
        this.load.image('runner', './assets/runner.png');
        this.load.image('over', './assets/gameoverscreen.png');
        this.load.image('playsky', './assets/playskybackground.png');
    
        this.load.audio('background', './assets/background.mp3');
        this.load.audio('jump','./assets/jump.mp3');
        this.load.audio('dash','./assets/dash.mp3');
        this.load.audio('die','./assets/explosion38.wav');

        //texture atlas's
        this.load.atlas('runnerA', './assets/runnerA.png', './assets/runnerA.json');
        this.load.atlas('playerA', './assets/playerA.png', './assets/playerA.json');

        //tilesprite scrolling bois
        this.load.image('grass1', './assets/grasslayer1.png')
        this.load.image('grass2', './assets/grasslayer2.png')
        this.load.image('grass3', './assets/grasslayer3.png')

    }

    create() {


        //loops background music until player restarts
        this.bgm = this.sound.add('background', {
            mute:false,
            volume:0.5,
            rate:1,
            loop:true
        });
        this.bgm.play();

        //animations
        this.anims.create({ 
            key: 'tumble', 
            frames: this.anims.generateFrameNames('runnerA', {prefix: 'runnerA', start: 0, end: 11, suffix: '', zeroPad: 4 }),
            framerate: 60,
            repeat: -1 
        });

        this.anims.create({ 
            key: 'run', 
            frames: this.anims.generateFrameNames('playerA', {prefix: 'playerA', start: 0, end: 3, suffix: '', zeroPad: 4 }),
            framerate: 5,
            repeat: -1 
        });
      
        
        game.settings.peoplePassed = 0;
        
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;

        this.gameOver = false;


        //background
        this.add.image(centerX, centerY, 'playsky');

        //placing scrolling tile sprites
        this.grass1 = this.add.tileSprite(0, 0, 960, 640, 'grass1').setOrigin(0, 0);
        this.grass2 = this.add.tileSprite(0, 0, 960, 640, 'grass2').setOrigin(0, 0);
        this.grass3 = this.add.tileSprite(0, 0, 960, 640, 'grass3').setOrigin(0, 0);

        //player
        this.p1= new Player(this, centerX/2, centerY+60, 'playerA').setOrigin(0, 0).play('run');

        //runner x3. base-> initial x axis spawn, spacer-> hoisontal distance between
        let runnerbase = 2000;
        let runnerspacer = 150;
        
        
        this.run1 = new Runner(this, runnerbase, 320, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run2 = new Runner(this, runnerbase-runnerspacer, 400, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run3 = new Runner(this, runnerbase-runnerspacer*2, 320, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run4 = new Runner(this, runnerbase-runnerspacer*3, 400, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run5 = new Runner(this, runnerbase-runnerspacer*4, 480, 'runnerA').setOrigin(0, 0).play('tumble');
        this.run6 = new Runner(this, runnerbase-runnerspacer*5, 560, 'runnerA').setOrigin(0, 0).play('tumble');


        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        //animations

        //score display
        let scoreConfig = {
            fontFamily: 'Roboto Condensed',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.score = this.add.text(69, 54, "People who've passed you: " + game.settings.peoplePassed, scoreConfig);
    }
    update() {

        //aduio for all player movements
        if(Phaser.Input.Keyboard.JustDown(keyUP)){
            this.sound.play('jump');
        }
        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            this.sound.play('jump');
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.sound.play('dash');
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.sound.play('dash');
        }
        // Players when player dies but plays nonstop:(
        //if(this.gameOver){
           // this.sound.play('die');
       // }
        
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            //might help with score later?
            //this.scene.restart(this.p1Score);
            this.scene.restart();
            this.bgm.stop();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start("menuScene");
            this.bgm.stop();
        }

        //tilesprite movement
        this.grass1.tilePositionX += 2;
        this.grass2.tilePositionX += 4;
        this.grass3.tilePositionX += 6;

        if(!this.gameOver)
        {
            this.p1.update();
            this.run1.update(this.score);
            this.run2.update(this.score);
            this.run3.update(this.score);
            this.run4.update(this.score);
            this.run5.update(this.score);
            this.run6.update(this.score);
        }

        //check collisions
        
        if(this.checkCollision(this.p1, this.run1)) {
            this.hit();
            
        }
        if(this.checkCollision(this.p1, this.run2)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run3)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run4)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run5)) {
            this.hit();
        }
        if(this.checkCollision(this.p1, this.run6)) {
            this.hit();
        }
        
    }

    hit() {
        let gameoverConfig = {
            fontFamily: 'Roboto Condensed',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.gameOver = true;


        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        this.add.image(centerX, centerY, 'over');
        this.add.text(game.config.width/2, game.config.height/2 - 64, ' GAME OVER ', gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, ' You were passed by ' + game.settings.peoplePassed +" people before succumbing to the cheese. ", gameoverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, ' R to Restart or M for Menu ', gameoverConfig).setOrigin(0.5);
    }

    checkCollision(player, runner) {
        
        //runner width and height being set to 0 on reset? hard code quick fix.
        this.width = 48;
        this.height = 48;
        // simple AABB checking
        if (player.x < runner.x + this.width && 
            player.x + player.width > runner.x && 
            player.y < runner.y + this.height &&
            player.height + player.y > runner.y) {
                return true;
        } else {
            
            return false;
            
        }
    }
}
