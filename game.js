const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let start = false;
let gameOver = false;
let level = 0;
let levelUp = 0;
let userClick = 0;
let USER_LEVEL = 2;

if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("topLevel") !== null){
    $("#topLevel").text("השיא כרגע הוא: "+ localStorage.getItem("topLevel")); 
}else{
    localStorage.setItem("topLevel", "0");
    $("#topLevel").text("השיא כרגע הוא: "+ localStorage.getItem("topLevel")); 
}
}

// for start game:

runGame();
    
$(".btnG").click(function(){
   let userChosenColour = this.id;
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClick);
   userClick++;

if(userClick===gamePattern.length){
    level++
        if(level % USER_LEVEL == 0){
            levelUp++;
        $("#level-title").text("שלב "+ levelUp); 
        playSound("applause");

  //update in localStorage:      
if (typeof(Storage) !== "undefined") {
    if(localStorage.getItem("topLevel") < levelUp){
localStorage.setItem("topLevel", levelUp);
$("#topLevel").text("השיא כרגע הוא: "+ localStorage.getItem("topLevel")); 

}
}   
    }

    userClick = 0;
    
    if(gameOver===false){    
    setTimeout(function(){
        previousSequence(gamePattern);    
    },(1000));

    setTimeout(function(){
    nextSequence();    
    },(1000*gamePattern.length+1000)); //the 1000 in end for wait until the previousSequence end.
}
}
   })

function nextSequence(){
   let randomNumber = Math.floor(Math.random() * 4);
   let randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
    
   $("#"+ randomChosenColour).fadeIn(300).fadeOut(200).fadeIn(300);
   playSound(randomChosenColour);
   //
   userClickedPattern.length = 0;
}

function previousSequence(arr){
for(let i=0; i<arr.length; i++){    
    setTimeout(function(){
    $("#"+ arr[i]).fadeIn(300).fadeOut(200).fadeIn(300);
    playSound(arr[i]);    
},(1000*i))
}
}

function playSound(name){
    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    let currentPress = $("#"+ currentColour);
    currentPress.addClass("pressed");
setTimeout(function(){
    currentPress.removeClass("pressed");
},100);

}

function checkAnswer(click){
    if(gamePattern[click] != userClickedPattern[click]){
            gameOver = true;
            $("body").addClass("game-over");
            $(".btnG").attr("hidden", "hidden");
            playSound("wrong");
            $("#level-title").text("המשחק נגמר, נסה שוב"); 
            $("#playAgain").removeAttr("hidden");
            $(".nav").removeAttr("hidden");

         }
}

function chooseLevelClick(ChooseLevel){
    USER_LEVEL = ChooseLevel;
}

function runGame(){
$("#playAgain").attr("hidden", "hidden");
$("#level-title").text("הקש על אחד המקשים כדי להתחיל"); 
$("body").removeClass("game-over");
$(".btnG").removeAttr("hidden");


 gamePattern.length=0;
 userClickedPattern.length =0;
 gameOver = false;
 level = 0;
 levelUp = 0;
 userClick = 0;
 start= false;

$(document).keypress(function() {
    if(!start){ //run only one time:
    console.log( "Handler for .keypress() called." );
    start = true;
    $("#level-title").text("שלב "+ levelUp);
    $(".nav").attr("hidden", "hidden"); 
        nextSequence();
    }
    });
}   


