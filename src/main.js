/*
William Gadd
Kenice Washington

Title: Cheese Chasers

Date Completed: 5/4/2020

Creative tilts:
visual style: Handcrafted, animated sprites create an atmosphere that evokes
some of the real life thrill of the chase. (Used aseprite)
technically interesting aspect:  learned how to create animations w/ aseprite. 



*/
let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scale: {
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ Menu, Play ] 
  }

let game = new Phaser.Game(config);

// define game settings
game.settings = {
  runnerSpeed: 6,
  peoplePassed: 0
}

// reserve keyboard vars
let keyDOWN, keyUP, keyLEFT, keyRIGHT, keyR, keyM;