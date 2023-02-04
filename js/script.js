const notRegistered = document.querySelector(".not-registered");
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const guessInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const spanGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;


const getWord = async function () {
    const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await request.text();
    const wordArray = data.split("\n");
    //console.log(wordArray);
    const randomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomWord].trim();
    placeholder(word);
};

getWord();

const placeholder = function () {
    const dotArray = []
    const wordArray = word.split("");

    for (let letter of wordArray){
        dotArray.push("●");
    }
    wordInProgress.innerText = dotArray.join("");
};


//Guess button//
guessButton.addEventListener("click", function (e){
    e.preventDefault();
    message.innerText = "";
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


const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)){
        message.innerText = "You tried this letter before, remember?";
    }
    else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        refreshGuessesLeft(guess);
        showLetters();
        wip(guessedLetters);
    }
};


const showLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const wip = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        }
        else{
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    youWin();
};

const refreshGuessesLeft = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Wrong Answer! There is no ${guess} in this word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Go you! The Letter ${guess} is in there!`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `GAME OVER! The word was... <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        spanGuesses.innerText = `${remainingGuesses} guess`;
    } else {
        spanGuesses.innerText = `${remainingGuesses} guesses`
    }
};

const youWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! GO YOU!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
};

//Play again button
playAgain.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    spanGuesses.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord();
    guessButton.classList.remove("hide");
    playAgain.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    
});