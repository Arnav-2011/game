class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.playButton = createButton("Play");
    this.titleImg = createImg("title.png", "game title");
    this.greeting = createElement("h2");
    this.Button1 = createButton("Thor");
    this.Button2 = createButton("Naruto");
    this.message = createElement("h2");
  }

  setElementsPosition() {
    this.titleImg.position(120, 50);
    this.input.position(width / 2 - 110, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 300, height / 2 - 100);
  
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.greeting.class("greeting");
  }

  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
  }

  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Hello ${this.input.value()}
      </br>wait for another player to join...`;
      this.greeting.html(message);
      playerCount += 1;
   
      player.name = this.input.value();
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
     // player.getDistance();
     if(playerCount==1){
      this.message.html("Choose your character");
      this.message.position(width / 2 - 300, height / 2 + 100)
      this.message.class("greeting");

      this.Button1.position(width / 2 - 100, height / 2 + 200);
      this.Button1.class("customButton");

      this.Button2.position(width / 2 + 100, height / 2 + 200);
      this.Button2.class("customButton");

      this.Button1.mousePressed(()=>{
      isThor=true;
      this.Button1.hide();
      this.Button2.hide();
      this.message.hide();
      })
      this.Button2.mousePressed(()=>{
        isThor=false;
        this.Button1.hide();
        this.Button2.hide();
        this.message.hide();
        })
    }
    });
  }

  display() {
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
