class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  create() {
    this.scene.start("SceneMain");
  }
}
class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  create() {}
}
class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  create() {}
}
