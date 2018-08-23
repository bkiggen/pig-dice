//GLOBAL VARIABLES
firstPlayer = true;
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



//Hold function
Player.prototype.hold = function(){
  this.totalScore += this.runningScore;
  console.log(totalScore + "run");
  console.log(runningScore);
  playerSwitch();
}


//Turn prototype method
Player.prototype.takeTurn = function(roll) {
  console.log(firstPlayer);
  if (roll === 1) {
    alert("Bust!");
    playerSwitch();
    this.runningScore = 0;
  } else if (roll > 1) {
    this.runningScore += roll;
    //HOLD condition
    console.log(this.runningScore);
    //playerSwitch turn

  };
};


// // Win condition
//   if (player1.totalScore >= 100 || player2.totalScore >= 100) {
//     alert("game over!");
//     // break;
//     location.reload();
//   }


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
    hold();
  })
});

//hold function


  // if roll is pressed: run loop again
  // if hold is pressed: add runningscore to total score, clear running score, update total score, and next turn


//enable button
$(".roll").click(function() {
  player1.turn();
});

//hold button
$("#hold-button").click(function() {
  break turnloop;
});


// change arrow function
function changeArrow() {
  $("#arrow").toggleClass("flip-image");
};
