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

guessButton.addEventListener("click", function (e){
    e.preventDefault();
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value = "";
});