//GLOBAL VARIABLES
var firstPlayer = true;
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
    pulse2();
  } else if (firstPlayer === false){
    firstPlayer = true;
    pulse1();
    changeArrow();
  };
}

function chooser(newRoll){
  if (firstPlayer){
    player1.takeTurn(newRoll);
  } else if (!firstPlayer){
    console.log("player2");

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
  var player1Name = "";
  var player2Name = "";
  var opponentType = "";
  pulse1();

  $(".nameform").submit(function(event){
    event.preventDefault();
    player1Name = $('#player-name-1').val();
    console.log(player1Name);
    player2Name = $('#player-name-2').val();
    opponentType = $(".p2name input[name='opponent']:checked").val();
    $(".user-prompt").fadeOut(1500, "linear");
    $("#name-span1").text(player1Name);
    $("#name-span2").text(player2Name);
  });


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
  $("#arrow").toggleClass("flip-image", 1000, "easeOutSine");
  $("#temp-roll").text("");
  $("#temp-roll").toggleClass("float-dice");
  $("#temp-roll").toggleClass("temp-roll");
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
  $(".arrow").addClass("winner");
}

function pulse1(){
  $("#p2-score").removeClass("pulse");
  $("#p1-score").addClass("pulse");
}

function pulse2(){
  $("#p1-score").removeClass("pulse");
  $("#p2-score").addClass("pulse");
}
