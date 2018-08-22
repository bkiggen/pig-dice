//GLOBAL VARIABLES

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


//Turn prototype method
Player.prototype.takeTurn = function(roll) {
  console.log('works!');
  if (roll === 1) {
    alert("Bust!");
    //next turn
  } else if (roll > 1) {
    this.runningScore += roll;
    $("#running-score-p1")
    //HOLD condition
    console.log(this.runningScore);
  }
}


// Win condition
  if (player1.totalScore >= 100 || player2.totalScore >= 100) {
    alert("game over!");
    // break;
    location.reload();
  }


//FRONT END

//user click dice roll (works)
$(document).ready(function() {
  $(".roll").click(function() {
    var newRoll = roll();
    $("#temp-roll").text(newRoll);
    player1.takeTurn(newRoll);
  });
});

//hold function
function hold() {
  $("roll-button").click(function(){
    //return to loop
  })
  $("hold-button").click(function(){

  })
  // if roll is pressed: run loop again
  // if hold is pressed: add runningscore to total score, clear running score, update total score, and next turn

}

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
