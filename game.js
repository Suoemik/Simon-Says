var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var first = false;
var level = 0;
document.addEventListener("keypress", function(event){
  if (!first) {
      $("#level-title").html("Level " + level);
      nextSequence();
      first = true;
  }

});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {

    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function() {
        nextSequence();
      } , 1000);
    }
  }
  else {


    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout( function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  first = false;
  gamePattern = [];

}
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed");
  } , 100);
}
