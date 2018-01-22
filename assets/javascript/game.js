	
// make vars first //
//helps us determine is the key entered was a hit or miss

var userGuess = false
//number of tries
var attempts = 10;
// create an array of words //
var words = ["ryu","ken","sagat","zangief","vega", "guile", "chun-li", "dhalsim"];
// make it "random" //
var randomWord = words[Math.floor(Math.random () *(words.length))];
	console.log(randomWord);

//create list of songs	
var songs = [];
songs[0] = "assets/images/Street_Fighter_II_SNES-Ken_Stage[Mp3Converter.net].mp3";
songs[1] = "assets/images/Street_Fighter_II_SNES-Ryu_Stage[Mp3Converter.net].mp3";

// create an array to hold _ _ _ _ _ values as long as the chosen word
var lettersInWord = [];
for(i = 0; i< randomWord.length; i++){
	//['_', '_', '_', '_', '_']
	lettersInWord[i] = "_";
}
// when letterMatching.lenght === randomWord.lenght => you win!
var lettersMatching = [];

// list of letters that were missed and not part of the word
var lettersMissed = [];

// list of all letters tried including misses and hits to avoid duplicates anywhere in the html
var lettersTried = []; 

//this will be used to display the _ _ _ _ values and changes in the html 
var wordToDisplay = ""
for(i =0; i< randomWord.length; i++){
	wordToDisplay += lettersInWord[i] + " ";
	// "_ _ _ _ _ _ _"
}

//when playAgain = true all values of the game are reset to start a new hangman game
var playAgain = false;

var gameSong = true;

var showRyu = true;

//To display attempts left
document.getElementById("attempts").innerHTML = "You have " + attempts + " tries left!";

//To display  "start game" or play again if game came to an end
document.getElementById("playAgain").innerHTML = "PRESS ANY KEY TO START GAME";

//hangman word to solve
document.getElementById("word").innerHTML = wordToDisplay;

//list of letters tried shown in html
document.getElementById("tried").innerHTML = lettersTried;


// ask for a letter //
document.onkeyup =   function playgame (event) {


	//resets the "YOU WIN" or "YOU LOSE" with empty ""
	document.getElementById("gameOver").innerHTML = "";
	//resets the "Start game" or "play gain" message with empty ""
	document.getElementById("playAgain").innerHTML = "";

	//music
	if(gameSong){
	var randomSong = songs[Math.floor(Math.random () *(songs.length))];
	var ply = document.getElementById('music');
	ply.src = randomSong;
	gameSong = false;
	}



	//if key event is not in the letters tried array, play round with letter
	//if platAgain = true = reset game variables to start a new game
	if(playAgain){
		//reset attempts to 10
		attempts = 10;
		//reset list to empty
	 	lettersMatching = [];
	 	//reset list to empty
	 	lettersTried = [];
	 	//reset list to empty
	 	lettersMissed = []
	 	//chose another random word
	 	randomWord = words[Math.floor(Math.random () *(words.length))];
	 	//reset lettersInWord to only contain ______ (underscores with no spaces) 
		for(i = 0; i< randomWord.length; i++){
			lettersInWord[i] = "_";
		}
		// reset wordToDisplay to contain spaces between underscores: _ _ _ _ (used in html)
		for(i =0; i< randomWord.length; i++){
			wordToDisplay += lettersInWord[i] + " ";
		}
		//reset playAgain to false
		playAgain = false;

		//reset music to intro
		var randomSong = songs[Math.floor(Math.random () *(songs.length))];
		var ply = document.getElementById('music');
		ply.src = randomSong;

	}else 

		//if letter entered is not part of the lettersTried (aka not a duplicate) run logic with letter
		if(lettersTried.indexOf(event.key) === -1){
		//add letter to list of tried letters to avoid duplicates next round (look above condition)
		lettersTried.push(event.key);

		//loop for every character in the random word
		for(i = 0; i< randomWord.length; i++){
			// if the letter at position i of random word === letter entered => HIT!
			if (randomWord[i]=== event.key ){
				//add letter entered to list of letters that help us determine the win based on the size
				lettersMatching.push(event.key)
				//assign the value of the letter at position i of random word to position i of lettersInWord  ['h', 'e', 'l', 'l', 'o'] -> ['h', '_', '_', '_', '_']
				lettersInWord[i] = randomWord[i]
				//we know that we have a hit so we set to userGuess to true
				userGuess = true
				console.log(lettersInWord);
		 	}
		}
		//if userGuess never changes to true we did not have a hit, we have a miss
		if(userGuess === false){
			//player loses a try so we subtract 1 to attempts variable
			attempts--;
			//we add the letter entered to the list of letters missed so we can display in html
			lettersMissed.push(event.key)
			console.log(lettersMissed)
		}
		//if userGuess is true we need to reset to false for next round
		else{
			userGuess = false;
		}
		//if attempts are 0 or the size of the list of letters matching is the same as the size of the word => the game is over
	 	if (attempts===0 || lettersMatching.length === randomWord.length){
	 		//music for winner or loser
			var ply = document.getElementById('music');
	 		//show in html to press any to play gain
	 		document.getElementById("playAgain").innerHTML = "PRESS ANY KEY TO PLAY AGAIN";
	 		//set the variable playAgain so we can reset all variables of the game when user presses any key
	 		playAgain = true;
	 		//if attempts are 0 player loses
	 		if(attempts === 0){
	 			//loser song
	 			ply.src = "assets/images/Street_Fighter_II_SNES-Winner[Mp3Converter.net].mp3"
	 			document.getElementById("gameOver").innerHTML = "GAME OVER, YOU LOSE";
	 		}
	 		// player wins
	 		else{
	 			//winner sound
	 			ply.src = "assets/images/Street_Fighter_II-You_Win_Perfect[Mp3Converter.net].mp3"
	 			document.getElementById("gameOver").innerHTML = "CONGRATS! YOU WIN!";
	 		}
	 	}

	}
	//the word to display in html after the logic and POSSIBLE changes to the lettersInWord list
     //['h', 'e', 'l', 'l', 'o'] -> ['h', '_', '_', '_', '_'] but puts it in a word with spaces like: "h _ _ _ _" in the html 
    wordToDisplay = ""
	for(i =0; i< randomWord.length; i++){
		wordToDisplay += lettersInWord[i] + " ";
	}
	var lettersToShow = ""
	for(i =0; i< lettersMissed.length; i++){
		lettersToShow += lettersMissed[i].toUpperCase() + " ";
	}
	// display in html the updates to the word we are playing 
	document.getElementById("word").innerHTML = wordToDisplay;
	// display the list of letters missed
	document.getElementById("tried").innerHTML = lettersToShow;
	//display the updated amount of tries left
	document.getElementById("attempts").innerHTML = "You have " + attempts + " tries left!";
// check if letter is on the word //
}

var ryu = [];
ryu[0] = "../images/ryu1.png"
ryu[1] = "../images/ryu2.png"
ryu[2] = "../images/ryu3.png"

var ply2 = document.getElementById('ryu');
for(i = 0; i< 250; i++){

	ply2.src = ryu[0];
	$(ply2).animate({ height: '400px', opacity: '1',}, "slow");


	ply2.src = ryu[1];
	$(ply2).animate({height: '250px', opacity: '1'}, "slow");

	ply2.src = ryu[2];
	$(ply2).animate({height: '400px', opacity: '1'}, "slow");

}

