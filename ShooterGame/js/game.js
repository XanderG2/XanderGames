var config = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [],
  pixelArt: true,
  roundPixels: true
},
scene: [
  SceneMainMenu,
  SceneMain,
  SceneGameOver
],
pixelArt: true,
var game = new Phaser.Game(config);
// load asset files for our game
gameScene.preload = function() {
 
  // load images
  this.load.image('background', 'assets/background.png');
};
 
// executed once, after assets were loaded
gameScene.create = function() {
 
   // background
   this.add.sprite(0, 0, 'background');