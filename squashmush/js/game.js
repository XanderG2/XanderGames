var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var wasd;

var game = new Phaser.Game(config);
const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.spritesheet("dudeTwo", "assets/dudeTwo.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  //  A simple background for our game
  this.add.image(400, 300, "sky");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  Here we create the ground.
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  //  Now let's create some ledges
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "dude");
  playerTwo = this.physics.add.sprite(700, 450, "dudeTwo");

  //  Player physics properties. Give the little guy a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  playerTwo.setBounce(0.2);
  playerTwo.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "leftTwo",
    frames: this.anims.generateFrameNumbers("dudeTwo", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
  //playerTwo
  this.anims.create({
    key: "leftTwo",
    frames: this.anims.generateFrameNumbers("dudeTwo", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turnTwo",
    frames: [{ key: "dudeTwo", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "rightTwo",
    frames: this.anims.generateFrameNumbers("dudeTwo", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
  wasd = this.input.keyboard.addKeys({
    upTwo: KeyCodes.W,
    downTwo: KeyCodes.S,
    leftTwo: KeyCodes.A,
    rightTwo: KeyCodes.D,
  });
  //  The score
  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000",
  });

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(playerTwo, platforms);
  this.physics.add.collider(playerTwo, player);
  //this.physics.add.collider(player, playerTwo);
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
}

function update() {
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
  //playerTwo
  if (wasd.leftTwo.isDown) {
    playerTwo.setVelocityX(-160);

    playerTwo.anims.play("leftTwo", true);
  } else if (wasd.rightTwo.isDown) {
    playerTwo.setVelocityX(160);

    playerTwo.anims.play("rightTwo", true);
  } else {
    playerTwo.setVelocityX(0);

    playerTwo.anims.play("turnTwo");
  }

  if (wasd.upTwo.isDown && playerTwo.body.touching.down) {
    playerTwo.setVelocityY(-330);
  }
}
