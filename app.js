var pattern = [];
var colorSelector = ["blue", "green", "red", "yellow"];
var playerPattern = [];
var level = 1;
var motivation = ["Nice!", "Keep it up!", "Wow, so smart!", "Big brain!"];

$(document).keydown(function(){
  startGame();
  $(document).unbind();
});

$(document).click(function(){
  startGame();
  $(document).unbind();
});


function startGame(){
  $("#game-title").text("level " + level);
  playerPattern = [];
  gameSequence(numberGenerator());
}

function gameSequence(randomNumber){
var gameColorChosen = colorSelector[randomNumber];
  animationAndSound(gameColorChosen);
  pattern.push(gameColorChosen);
  var motivationPicker = motivation[motivationNumberGen()];
  if (pattern.length >= 3){
    $("#motivationTextLine").text(motivationPicker).fadeIn("slow");
    $("#motivationTextLine").fadeOut("slow");
  }
}

function motivationNumberGen(){
  var randomNum = Math.floor(Math.random() * 3);
  return randomNum;
}


$(".btn").click(function(){
  var buttonClicked = this.id;
  animationAndSound(buttonClicked);
  playerPattern.push(buttonClicked);
  answerCheck(playerPattern.length - 1);
})

function answerCheck(currentLevel){
  if (playerPattern[currentLevel] === pattern[currentLevel]){
   if (playerPattern.length === pattern.length){
    setTimeout(function () {
      level++;
      startGame();
    }, 800);
  }
} else {
  // sound
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  // animation
  $("body").css("background-color", "red");
  $("#game-title").text("Game over, press any key to replay.");
  $(document).keydown(function(){
    $("body").css("background-color", "#396EB0");
    pattern = [];
    level = 1;
    $(document).unbind();
    startGame();
  });
}
}


function numberGenerator(){
  var randomNum = Math.floor(Math.random() * 4);
  return randomNum;
}

function animationAndSound(color){
  // Sound
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  // Animation
  $("#" + color).addClass("animation");
  setTimeout(function () {
  $("#" + color).removeClass("animation")
}, 400);
}
