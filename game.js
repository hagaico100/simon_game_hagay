const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
let start = false;
let gameOver = false;
let level = 0;
let userClick = 0;
// for start game:
runGame();
    
$(".btn").click(function(){
   let userChosenColour = this.id;
   userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);
   console.log(gamePattern);


   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClick);
   userClick++;

    //console.log("userClick:",userClick);
   // console.log("game gamePattern.length:",gamePattern.length);


if(userClick===gamePattern.length){
    console.log("in if");
userClick = 0;
if(gameOver===false){

    previousSequence(gamePattern);    
    
    setTimeout(function(){
    nextSequence();    
    },(1000*gamePattern.length));
}
}
   })

function nextSequence(){
   let randomNumber = Math.floor(Math.random() * 4);
   let randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
    
   $("#"+ randomChosenColour).fadeIn(300).fadeOut(200).fadeIn(300);
   playSound(randomChosenColour);
   level++
   $("#level-title").text("שלב "+ level); 

   userClickedPattern.length = 0;
}

function previousSequence(arr){
for(let i=0; i<arr.length; i++){    
    setTimeout(function(){
    $("#"+ arr[i]).fadeIn(300).fadeOut(200).fadeIn(300);    
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
            playSound("wrong");
            $("#level-title").text("המשחק נגמר, נסה שוב"); 
            $("#playAgain").removeAttr("hidden");
         }else{
            
         }
}
function runGame(){
$("#playAgain").attr("hidden", "hidden");
$("#level-title").text("הקש על אחד המקשים כדי להתחיל"); 
$("body").removeClass("game-over");

 gamePattern.length=0;
 userClickedPattern.length =0;
 gameOver = false;
 level = 0;
 userClick = 0;
 start= false;

$(document).keypress(function() {
    if(!start){ //run only one time:
    console.log( "Handler for .keypress() called." );
    start = true;
    $("#level-title").text("שלב "+ level); 
        nextSequence();
    }
    });
}
