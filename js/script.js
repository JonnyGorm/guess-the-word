const notRegistered = document.querySelector(".not-registered");
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanGuesses = document.querySelector(".remaining span");
const letterEntry = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];


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
    letterEntry.innerText = "";
    const guess = guessInput.value;
    //console.log(guess);
    guessInput.value = "";
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    guessInput.value = "";
});


const validateInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        letterEntry.innerText = "Enter a letter.";
    }
    else if (input.length > 1) {
        letterEntry.innerText = "Please enter one letter, thanks.";
    }
    else if (!input.match(acceptedLetter)) {
        letterEntry.innerText = "Only enter a letter from A-Z, please.";
    }
    else {
        return input;
    }
};
// Q&A question, How do i know that Guess is the correct parameter to pass through this function?
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        letterEntry.innerText = "You tried this letter before, remember?";
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};