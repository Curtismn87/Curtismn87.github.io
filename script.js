$( document ).ready(function() {
// define variables

var guesses = 0;//Pick 2 cards per guess, keeps track of guesses
var gamesWon = 0;//counts how many games have been won
var gameCounter = 0;//counts correct guesses until win
var turn = 0;//keeps of how many cards have been picked per guess, limit 2
var checkOne;//saves value of first card picked to compare to second card
var checkTwo;//saves value of second card picked to compare to first
var images = {a:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK3330.jpg",
b:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK4124.jpg",
c:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK4470.jpg",
d:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK4477.jpg",
e:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK4938.jpg",
f:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK5532.jpg",
g:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK5555.jpg",
h:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK5566.jpg",
i:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK5640.jpg",
j:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK5703.jpg",
k:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK5708.jpg",
l:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_HNCK6001.jpg",
m:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_IMG_3535.jpg",
n:"/Users/curtismn87/WDI/projects/Concentration-Project-1-/images/picjumbo.com_foodiesfeed.com_DSC_0001-9.jpg"}; // src of pics

var mirrorImages = [images.a, images.a, images.b, images.b, images.c, images.c, images.d, images.d, images.e, images.e,
  images.f, images.f, images.g, images.g, images.h, images.h, images.i, images.i,
  images.j, images.j, images.k, images.k, images.l, images.l]; //matching values to be entered into card div
// reset gameboard upon load for play
reset();
//add events for buttons and cards
$("#new_game").on("click", newGame);// Start new game by clicking button
$("#reset_button").on("click", reset);//reset button shows all cards
$(".card").on("click", makeMoves);// Click on card to reveal

function cardsOff(){//turns ability to click on cards off
$('.card').off(); // ends click event
} //closes cardsOff function

function cardsOnInterval(){ // turns ability to click cards back on after 1 second
  setTimeout(cardsOn, 1000);
}//closes cardsOnInterval function

function cardsOn(){ // turns ability to click on cards
  $('.card').on("click", makeMoves); // click event for cards
}// closes cardsOn function

  //Makes moves for the game
  function makeMoves(){
    if (turn === 0){ // indictaes first card in the turn
      $('img', this).show(); // shows img of card
      checkOne = $("img", this).attr("src"); // saves value of first image to variable for conditional
      turn = 1; // updates counter to allow for second card to be choosen
      firstGuessImage = $('img', this); // saves first image DOM location in variable to be hidden after turn is over
    }  //closes If conditional
    else if (turn === 1){ // indictes second card in turn
      $('img', this).show(); //shows img of card
      checkTwo = $("img", this).attr("src"); // saves value of second images to variable for conditional
      secondGuessImage = $('img', this); //saves second image DOM location in variable to be hidden after turn is over
      turn = 0; // updates counter for first card again for next turn
      guesses = guesses + 1; // updates counter to indicate one series of gusses has been made
      $("#guessCount").text(guesses); // Visually shows number of guesses to user
    if (checkOne === checkTwo){ // compares values of first card and second card to evaluate if they are matching
      gameCounter = gameCounter + 1; // updates game counter to indicate a match has been made
      if (gameCounter === 12){ // evaluates game counter to see if total numbers of possible matches has been met
        alert("You win! Click reset to 'reset' the board and 'Start Game' to play"); // winning message
        gamesWon = gamesWon + 1; // updates counter to indicate how many games have been won
        $("#wonCount").text(gamesWon); // displays number of games won to user
      } // closes gamesCounter conditional
    } // closes match checking conditional
      else hideInterval(); // hides guesses at end of turn in no match
      cardsOff();  // prevents user from clicking while cards are visable
      cardsOnInterval(); // allows user to click on cards again after cards are hidden

  } //closes else if
} // closes makeMoves function

function hideInterval (){setTimeout(hideImages, 1000);} // hides the guesses after 1 second
function hideImages(){secondGuessImage.hide(); // hides the first and second guess again
firstGuessImage.hide();}


// Shuffle fuction taken from the internet.
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// resets the game gameboard
function reset(){
  $("#adrian").hide(); //hides easter egg
  shuffle(mirrorImages);//assign images to gameboard
  for (var i = 0; i < mirrorImages.length; i++){ // for loop to assign images
  $(".card").eq(i).children("img").attr("src", mirrorImages[i]);}  // assigns image for every div
  $('img').show();// shows the image so user can see
  $(".card").css("height", "6em");// sets height of image
  $(".card").css("background", "burlywood");// sets background so indicate cards being face down
  guesses = 0;   // resets counters
  gameCounter = 0;   // resets counters
  turn = 0;   // resets counters
  $("#guessCount").text(guesses);
}// closes reset function

function newGame(){ // hides cards
  $("img").hide();// Hides all cards, assigns value
  $(".card").css("width", "236.969"); // sets div width
  $(".card").css("length", "157.984"); // sets div height
  $("#adrian").show(); // makes easter egg visable
} // ends newGame function

// easter egg - I know what it does, you'll have to find out...
$("#adrian").on("click", function(){
  $(".card").css("background", "url(http://media.giphy.com/media/K5IEMtDZHxQZy/giphy-tumblr.gif)");
} // closes eastr egg function
); //closes easter egg click event
});// closes document ready
