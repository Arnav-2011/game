class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.Button = createButton("Attack");
    this.punchButton = createButton("Punch");

  //  this.leadeboardTitle = createElement("h2");

   // this.leader1 = createElement("h2");
   // this.leader2 = createElement("h2");
   // this.playerMoving = false;
   // this.leftKeyActive = false;
   // this.blast = false
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();
    
    

    form = new Form();
    form.display();

    car1 = createSprite(150, height/2);
  
    //car1.addImage("blast", blastimg)
    
    //car1.scale = 0.07;

    car2 = createSprite(width-150, height/2);
   
   // car2.scale = 0.07;
   if(isThor)
   {
     car1.addImage("Tnormal" , thorimg);
     car2.addImage("Nnormal" , narutoimg);
     car1.addImage("Tattack" , thorimg);
     car2.addImage("Natttack" , narutoimg);
     thorindex = 1
     narutoindex = 2
   }
   else{
    {
      car2.addImage("Tnormal" ,thorimg);
      car1.addImage("Nnormal", narutoimg);
      car2.addImage("Tattack" , thorimg);
      car1.addImage("Natttack" , narutoimg);
      thorindex = 2
      narutoindex = 1
    }
   }
   
    cars = [car1, car2];


  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    //C39
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 200, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 230, 100);

   /* this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.class("resetText");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);

    this.leader2.class("leadersText");
    this.leader2.position(width / 3 - 50, 130);
  */
  }

  play() {
    this.handleElements();
    this.handleResetButton();

    Player.getPlayersInfo();
   // player.getCarsAtEnd();
    
    if (allPlayers !== undefined) {
      image(backgroundImg, 0,0, width, height);
      textSize(35)
      fill("blue")
      text("Rules- Press different buttons to use attack and to punch", 10,40)
    
     // this.showFuelBar()
     this.showLife();
      //this.showLeaderboard();

      //index of the array
      var index = 0;
      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;
        var life = allPlayers[plr].life
        if (life <= 0){
         // cars[index-1].changeImage("blast")
          //cars[index-1].scale = 0.5
        }
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;

        if (index === player.index) {
          stroke(10);
          fill("Cyan");
          textSize(30)
          text(allPlayers[plr].name,x-50,y+130)
           if (player.isthunder == true){
            this.setthundervalue(index,true)
           }
           if (player.isenergyball == true){
            this.setenergyballvalue(index,true)
           }
           this.handlepunch(index)
          //this.handleFuel(index);
          //this.handlePowerCoins(index);
          //this.handleObstacleCollision(index);
          //this.handlecarcollision(index);
          if(player.life<= 0){
            this.blast = true
            //this.playerMoving = false
          }
          // Changing camera position in y direction
        //  camera.position.y = cars[index - 1].position.y;
        }
      }

      /*if (this.playerMoving) {
        player.positionY += 5;
        player.update();
      }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      const finshLine = height * 6 - 100;

      if (player.positionY > finshLine) {
        gameState = 2;
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
        player.update();
        this.showRank();
      }
*/
      drawSprites();
      this.Button.position(width / 2 - 90, height - 100);
      this.Button.class("customButton")
      this.punchButton.position(width / 2 + 190, height - 100);
      this.punchButton.class("customButton")
      this.punchButton.mousePressed(()=>{
        if (isThor){
         cars[thorindex - 1].changeImage("Tattack")
         player.ispunch = true
         database.ref("players/player/"+narutoindex).update({
          isPunch:true
        })
        }
        else{
          cars[narutoindex - 1].changeImage("Nattack")
          player.ispunch = true
          database.ref("players/player/"+thorindex).update({
            isPunch:true
          })
        }
      })
      this.Button.mousePressed(()=>{
        if(isThor){
          player.isthunder = true
        }
        else{
          player.isenergyball = true
        }
      })
    }
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},
        carsAtEnd: 0
      });
      window.location.reload();
    });
  }
    setthundervalue(index,B){
      if(index == 1){
        if(isThor==true){
          database.ref("players/player2").update({
            isThunder:B
          })
        }
      }
      else
      if(index == 2){
        if(isThor==true){
          database.ref("players/player1").update({
            isThunder:B
          })
        }
      }
    }

    setenergyballvalue(index,B){
      if(index == 1){
        if(isThor==false){
          database.ref("players/player2").update({
            isEnergyBall:B

          })
        }
      }
      else
      if(index == 2){
        if(isThor==false){
          database.ref("players/player1").update({
            isEnergyBall:B
          })
        }
      }
    }
    
  showLife() {
    push();
    fill("white");
    rect(width / 2 - 100, 200, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, 200, player.life, 20);
    noStroke();
    pop();
  }

/*  showFuelBar() {
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 250, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 250, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 250, player.fuel, 20);
    noStroke();
    pop();
  }*/

  /*showLeaderboard() {
    var leader1, leader2;
    var players = Object.values(allPlayers);
    if (
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1
    ) {
      // &emsp;    This tag is used for displaying four spaces.
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }

    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }

    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }

  handlePlayerControls() {
    if(!this.blast){
    if (keyIsDown(UP_ARROW)) {
      this.playerMoving = true;
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      this.leftKeyActive = true;
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      this.leftKeyActive = false;
      player.positionX += 5;
      player.update();
    }
  }
  }

  handleFuel(index) {
    // Adding fuel
    cars[index - 1].overlap(fuels, function(collector, collected) {
      player.fuel = 185;
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });

    // Reducing Player car fuel
    if (player.fuel > 0 && this.playerMoving) {
      player.fuel -= 0.3;
    }

    if (player.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    cars[index - 1].overlap(powerCoins, function(collector, collected) {
      player.score += 21;
      player.update();
      //collected is the sprite in the group collectibles that triggered
      //the event
      collected.remove();
    });
  }

  handleObstacleCollision(index) {
    if (cars[index - 1].collide(obstacles)) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      } else {
        player.positionX -= 100;
      }

      //Reducing Player Life
      if (player.life > 0) {
        player.life -= 185 / 4;
      }

      player.update();
    }
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
*/
  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  handlepunch(index){
    var p
    database.ref("player/player"+index+"/isPunch").on("value",data=>{
    p=data.val()
    })
    if(p){
      if(player.life>0){
        player.life -= 185/4
      }
    }
  }
/*  handlecarcollision(index) {
    if (index==1){
      
    
    if (cars[index - 1].collide(cars[1])) {
      if (this.leftKeyActive) {
        player.positionX += 100;
      } else {
        player.positionX -= 100;
      }

      //Reducing Player Life
      if (player.life > 0) {
        player.life -= 185 / 4;
      }

      player.update();
    }
  }

if (index==2){
      
    
  if (cars[index - 1].collide(cars[1])) {
    if (this.leftKeyActive) {
      player.positionX += 100;
    } else {
      player.positionX -= 100;
    }

    //Reducing Player Life
    if (player.life > 0) {
      player.life -= 185 / 4;
    }

    player.update();
  }
}
}
*/
}





