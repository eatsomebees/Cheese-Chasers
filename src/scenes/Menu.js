class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.image('title', './assets/title.png');
        this.load.image('menusky', './assets/skybackground.png');

    }

    create() {
        //menu display
        let menuConfig = {
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
        
        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //assets
        this.add.image(centerX, centerY, 'menusky');
        this.add.image(centerX, centerY - textSpacer*2, 'title');

        //start button, instructions
        this.add.text(centerX, centerY, ' Press \'UP\' to Start ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, ' INSTRUCTIONS: ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer+35, ' Use the arrow keys to control your cheese chaser ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer+70, ' and dodge faster, more in shape competetors! ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2+70, ' Based on a real sport! ', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*3+70, ' Historical Context: https://www.youtube.com/watch?v=0-ai0GGeRjs', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*3+105, ' (or google \"cheese rolling\") ', menuConfig).setOrigin(0.5);

        //define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start("playScene");
        }

    }
}