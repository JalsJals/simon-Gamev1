var userClickedPattern = [];

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  colorEffects(randomChosenColour);
  console.log("New random sequence detected color is: " + randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
  console.log("After Correction Checking, Contents of User Pattern are: " + userClickedPattern);
}

$(".btn").on("click", function(event) {
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  colorEffects(userChosenColor);
  console.log("THE BUTTON I CLICKED IS: " + this.id);
  if (userClickedPattern.length == gamePattern.length) {
    checkAnswer(userClickedPattern.length -1);
  } else {
    console.log("Continue Pressing");
  }
});

function colorEffects(kyaa) {
  switch (kyaa) {
    case "red":
      flashColor("red");
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      flashColor("blue");
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      flashColor("green");
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      flashColor("yellow");
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      console.log(randomChosenColour);
  }

  function flashColor(kulay) {
    $("." + kulay).addClass("pressed");
    setTimeout(function() {
      $("." + kulay).removeClass("pressed");
    }, 100);
  }
}

var gamestate = false;

$("body").on("keypress", function(event) {
  if (gamestate == false) {
    nextSequence();
    gamestate = true;
    $("h1").text("Level " + level);
    console.log("game start");
  } else if (gamestate == true) {
    console.log("game already started");
  } else {
    console.log(gamestate);
  }
});


function checkAnswer(currentLevel) {

    console.log("Legth of GamePattern: " + gamePattern.length);

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("Checking if " + userClickedPattern[currentLevel] + " and " + gamePattern[currentLevel] + " are the same");


  setTimeout(nextSequence, 1000);
  setTimeout(function() {
    console.log("The previous pattern number is: " + gamePattern[currentLevel]);
    colorEffects(gamePattern[currentLevel+1]);
    console.log("Contents of Game Pattern: " + gamePattern);
  }, 1000);

    } else {
      console.log("wrong");
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      answer = false;
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart!");
      gamestate = false;
      level = 0;
      gamePattern =[];
    }
    console.log("checking has end");



}
