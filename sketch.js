var playerCount = 0 
var thorimg
var narutoimg
var lightningimg
var rsimg
var backgroundImg
var backgroundimg
var thorindex = 0
var narutoindex = 0
var isThor=false;
var thorpunchimg
var narutopunchimg
var Thunder 
var energyball
var gameState=0;

var player,form,car1,car2,cars=[],allPlayers

function preload() {
  thorimg=loadImage("thornormal.png");
  narutoimg=loadImage("narutonormal.png");
  backgroundImg=loadImage("background.png");
  backgroundimg = loadImage("formpic.png")
  thorpunchimg = loadImage("thorattack.png")
  narutopunchimg = loadImage("narutoattack.png")
  lightningimg = loadImage("lightning.png")
  rsimg = loadImage("energyball.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  Thunder = createSprite(200, 200)
  Thunder.addImage(lightningimg)
  Thunder.visible = false
  Thunder.setCollider("circle", 0,0,40)
  energyball = createSprite(250, height / 2)
  energyball.addImage(rsimg)
  energyball.visible = false
  energyball.setCollider("circle", 0,0,40)
  energyball.rotationSpeed = 8
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundimg);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
    if (player.lightning()){
      Thunder.visible = true
      Thunder.velocity.y = 10
      if (Thunder.position.y >= height){
        Thunder.visible = false
        Thunder.velocity.y = 0
        Thunder.position.y = 200
        player.isthunder = false
        database.ref("players/player"+thorindex).update({
          isThunder:false
        })
      }
    }

    if (player.energy()){
      energyball.visible = true
      energyball.velocity.x = 10
      if (energyball.position.x >= width){
        energyball.visible = false
        energyball.velocity.x = 0
        energyball.position.x = 200
        player.ienergyball= false
        database.ref("players/player"+narutoindex).update({
          isEnergyBall:false
        })
      }
    }
  }

  if (gameState === 2) {
    //game.showLeaderboard();
    //game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
