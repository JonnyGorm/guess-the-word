const notRegistered = document.querySelector(".not-registered");
const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuesses = document.querySelector(".remaining span");
const letterEntry = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";


const placeholder = function () {
    const dotArray = []
    const wordArray = word.split("");

    for (let letter of wordArray){
        dotArray.push("●");
    }
    wordInProgress.innerText = dotArray.join("");
};
placeholder(); 

//Guess button//
guessButton.addEventListener("click", function (e){
    e.preventDefault();
    message.innerText = "";
    const guess = guessInput.value;
    //console.log(guess);
    validateInput(guess);
    guessInput.value = "";
    
});


const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Enter a letter.";
    }
    else if (input.length > 1) {
        message.innerText = "Please enter one letter, thanks.";
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Only enter a letter from A-Z, please.";
    }
    else {
        return input;
    }
};