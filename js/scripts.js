//GLOBAL VARIABLES
firstPlayer = true;
//BACK END

//dice roll
function roll() {
//actual roll
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Player Object Constructor
function Player(name, runningScore, totalScore) {
  this.name = name;
  this.runningScore = runningScore;
  this.totalScore = totalScore;
  this.currentRoll;
};

//Players- need input in html for names
var player1 = new Player("Player 1", 0, 0);
var player2 = new Player("Player 2", 0, 0);

// playerSwitching Turns
function playerSwitch(){
  if (firstPlayer === true){
    firstPlayer = false;
    changeArrow();
  } else if (firstPlayer === false){
    firstPlayer = true;
    changeArrow();
  };
}

function chooser(newRoll){
  if (firstPlayer){
    player1.takeTurn(newRoll);
  } else if (!firstPlayer){
    player2.takeTurn(newRoll);
  }
}

function holdChooser(){
  if (firstPlayer){
    player1.hold();
  } else if (!firstPlayer){
    player2.hold();
  }
}

//Hold function
Player.prototype.hold = function(){
  this.totalScore = this.totalScore + this.runningScore;
  playerSwitch();
  this.runningScore = 0;
// Win condition
  if (this.totalScore >= 10 || this.totalScore >= 10){
    alert("game over!");
    location.reload();
  }
}


//Turn prototype method
Player.prototype.takeTurn = function(newRoll) {
  if (newRoll === 1) {
    alert("Bust!");
    playerSwitch();
    this.runningScore = 0;
  } else if (newRoll > 1) {
    this.runningScore = this.runningScore + newRoll;
  };
};





//FRONT END

//user click dice roll (works)
$(document).ready(function() {
  //roll button
  $(".roll").click(function() {
    var newRoll = roll();
    $("#temp-roll").text(newRoll);
    chooser(newRoll);
  });
  //hold button
  $("#hold-button").click(function(){
    holdChooser();
  });
});



// change arrow function
function changeArrow() {
  $("#arrow").toggleClass("flip-image");
};
