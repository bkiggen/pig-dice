//BACK END

//dice roll
function roll() {
  min = Math.ceil(1);
  max = Math.floor(6);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Player Object Constructor
function Player(name, runningScore, totalScore) {
  this.name = name;
  this.runningScore = runningScore;
  this.totalScore = totalScore;
}

//Players
var player1 = new Player("Player 1", 0, 0);
var player2 = new Player("Player 2", 0, 0);

//Turn prototype method
Player.prototype.turn = function() {
  while(player1.totalScore < 100){
    var newRoll = roll();
    //NEEDdisplay rolls
    if (newRoll === 1) {
      console.log("number 1");
    } else if (newRoll > 1) {
      console.log("number 2-6")
      this.totalScore += newRoll;
      //NEED prompt user for choice
      break;
          }
  }
}

//Player Turns (works)
for (var i = 0; i > -1; i++) {
  if (player1.totalScore < 100 || player2.totalScore < 100) {
    player1.turn();
    // changeArrow();
    player2.turn();
    // changeArrow();
  }
  if (player1.totalScore >= 100 || player2.totalScore >= 100) {
    alert("game over!");
    break;
    // $(location).reload();
  }
}




//FRONT END

//user click dice roll (works)
$(document).ready(function() {
  $("#roll").click(function() {
    var userRoll = roll();
    $("#temp-roll").text(userRoll); //to be replaced with images
  });
});

//hold function
function hold() {
  alert("HOLD")
}

// change arrow function
function changeArrow() {
  $("#arrow").toggleClass("flip-image");
}
