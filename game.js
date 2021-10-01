// Simon game - how to play?
// Computer presses a light for the first time;
// You should remember that light and press same color;
// Now computer presses another light;
// You should press previous light and current light;
// Computer presses another light;
// You should all the 3 lights in order;

// Hosted version of game - "https://londonappbrewery.github.io/Simon-Game/"

gamePattern = [];
userClickedPattern = [];

buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;



$("h1").click(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    var randomChosenColour = buttonColours[nextSequence()];
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  console.log('randomChosenColour', randomChosenColour);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};


$(".btn").on("click", function(e) {
  // userChosenColor = e.target.id;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  console.log('userChosenColour', userChosenColour);
  animateClass(userChosenColour);
  checkAnswer((userClickedPattern.length) - 1);
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animateClass(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);

    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 300);
    $("h1").text("Game Over, Press here to restart");
    startOver();
  }

}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
