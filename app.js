/*
GAME FUNCTION:
- Player must guess a number between the min and max.
- Player gets a certian number of guesses
- Notify player of remaining guesses
- Notify player of the correct answer if they lose
- Let player choose to play again
*/

// game values
let min = 1;
let max = 10
let winningNum = getRandomNumber(min, max);
let guessesLeft = 3;

// UI elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
    }

    // check if won
    if(guess === winningNum){

        gameOver(true, `You guessed ${guess}, you win!`);

    } else {
        // subtract 1 from guesses left
        guessesLeft -= 1
        if(guessesLeft === 0) {
            // game over

            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);

        } else {
            // game continues

            // change border color
            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = '';

            // tell user that they are wrong
            setMessage(`Guess is not correct. Guesses left: ${guessesLeft}.`)

        }
    }
});

// game over
function gameOver(won, msg){

    let color;
    won === true ? color = 'green' : 'red';

    // disable input
    guessInput.disabled = true;

    // change border color
    guessInput.style.borderColor = color;

    // change text color
    message.style.color = color;

    // tell user that they are wrong
    setMessage(msg);

    // play again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

// set message
function setMessage(msg, color) {
    message.textContent = msg;
    message.style.color = color;
}

// get winning number
function getRandomNumber() {
    return Math.floor(Math.random() * (max - min + 1) + min);
}