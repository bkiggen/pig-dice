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
function Player(name, runningScore, totalScore, runningScoreDisplay, totalScoreDisplay) {
  this.name = name;
  this.runningScore = runningScore;
  this.totalScore = totalScore;
};

//Players- need input in html for names
var player1 = new Player("Player 1", 0, 0);
var player2 = new Player("Player 2", 0, 0);

// playerSwitching Turns
function playerSwitch(){
    updateScore();
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
  updateScore();
// Win condition
  var winner = "";

  if (this.totalScore >= 100 || this.totalScore >= 100){
    if (player1.totalScore >= 100) {
    winner = "Player 1!";
  } else if (player2.totalScore >= 100) {
    winner = "player 2!";
  }
  displayWinner(winner);
  }
}


//Turn prototype method
Player.prototype.takeTurn = function(newRoll) {
  if (newRoll === 1) {
    alert("BUST!");
    playerSwitch();
    this.runningScore = 0;
  } else if (newRoll > 1) {
    this.runningScore = this.runningScore + newRoll;
    updateScore();
  };
};

//FRONT END

//user click dice roll (works)
$(document).ready(function() {
  //roll button
  $("#roll-button").click(function() {
    var newRoll = roll();
    var rollDisplay;
    switch (newRoll) {
      case 1:
        rollDisplay = "img/Alea_1.png";
        break;
      case 2:
        rollDisplay = "img/Alea_2.png";
        break;
      case 3:
        rollDisplay = "img/Alea_3.png";
        break;
      case 4:
        rollDisplay = "img/Alea_4.png";
        break;
      case 5:
        rollDisplay = "img/Alea_5.png";
        break;
      case 6:
        rollDisplay = "img/Alea_6.png";
        break;
      };
    $("#temp-roll").html("<img src='" + rollDisplay + "'</img>");
    chooser(newRoll);
  });
  //hold button
  $("#hold-button").click(function(){
    holdChooser();
  });
  $("#reload-button").click(function(){
    location.reload();
  })
});

// change arrow function
function changeArrow() {
  $("#arrow").toggleClass("flip-image");
  $("#temp-roll").text("");
  $("#temp-roll").toggleClass("float-dice");
};

function updateScore(runningScore, totalScore) {
  $("#p1-running-score").text(player1.runningScore);
  $("#p2-running-score").text(player2.runningScore);
  $("#p1-total-score").text(player1.totalScore);
  $("#p2-total-score").text(player2.totalScore);
}

function displayWinner(winner) {
  $("#hooray").html(winner);
  $(".winner").toggleClass("winner");
}
