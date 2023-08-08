var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var checker = 0;
var started = false;
function nextSequence() {
    started=true;
  setTimeout(function () {
    $("#level-title").text("Level " + level);
  }, 500);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function () {
    $("#" + randomChosenColour)
      .fadeOut(150)
      .fadeIn(10);
  }, 1000);
  level++;
  console.log(gamePattern);
}
$(document).one("keypress", function () {
  started = true;
  nextSequence();
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 80);
}
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
// playAudio(randomChosenColour);

$(".btn").on("click", function (event) {
  if (started === true) {
    var userChosenColour = $(this).attr("id");
    $("#" + userChosenColour)
      .fadeOut(150)
      .fadeIn(10);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);
    if (checker < level - 1) {
      if (userChosenColour != gamePattern[checker]) {
        // setTimeout(function () {
        started = false;
        gamePattern = [];
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        // }, 500);
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
        $(document).one("keypress", function () {
            level = 0;
            checker = 0;
            userClickedPattern = [];
            nextSequence();
        });
    }
    checker++;
} else {
      if (userChosenColour != gamePattern[checker]) {
        // setTimeout(function () {
            started = false;
            gamePattern = [];
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            // }, 500);
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
            $(document).one("keypress", function () {
                level = 0;
                checker = 0;
                userClickedPattern = [];
                nextSequence();
            });
        } else {
            checker = 0;
            nextSequence();
        }
}
}
else{
    playSound("wrong");
    console.log(userClickedPattern);
    console.log(gamePattern);
    // userClickedPattern=[];
    // gamePattern = [];
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
}});
