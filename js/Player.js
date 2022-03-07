class Player {
  constructor() {
    this.name = null;
    this.index = 0;
    this.positionX = 0;
    this.positionY = height/2;
   // this.rank = 0;
    //this.fuel = 185;
    this.life = 185;
    this.isthunder = false
    this.isenergyball = false
    this.ispunch = false
   // this.score = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = 150;
    } else {
      this.positionX = width-150;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      isThor:isThor,
      isEnergyBall:false,
      isPunch:false,
      isThunder:false,
      life:185
    });
  }

  getDistance() {
    var playerDistanceRef = database.ref("players/player" + this.index);
    playerDistanceRef.on("value", data => {
      var data = data.val();
      this.positionX = data.positionX;
      this.positionY = data.positionY;
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  update() {
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      positionX: this.positionX,
      positionY: this.positionY,
      life: this.life
    });
  }
   
  lightning(){
   var value
   var thunder = database.ref("players/player" + this.index+"/isThunder")
   thunder.on("value", data =>{
     value = data.val()
   })
   return value
     
  }

  energy(){
    var value
    var thunder = database.ref("players/player" + this.index+"/isEnergyBall")
    thunder.on("value", data =>{
      value = data.val()
    })
    return value
      
   }
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  getCarsAtEnd() {
    database.ref("carsAtEnd").on("value", data => {
      this.rank = data.val();
    });
  }

  static updateCarsAtEnd(rank) {
    database.ref("/").update({
      carsAtEnd: rank
    });
  }
}
