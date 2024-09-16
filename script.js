'use strict';

/**
 * Remake the game
 * Theme : Blind  Slot Machine
 *
 * need to generate 3 random number
 * need 3 inputs from user
 * the current feature will still be used
 * the input must be match with the random generated number in order to win the game
 *
 * how will I generated the random numbers? must create an array and each of the value will be assigned automatically
 * design of input fields? add 2 more input box and name it related to each other
 * how to calculate the winnings?
 * => the game will run as long as the inputs is not equal to the random numbers || the score hits 0
 * => same criteria of score will be applied from the guide project
 *
 * bonus features::count(1)
 * the game can run continuesly, and will end either the inputs match with the random numbers or the score drop to 1
 * wait every 2 seconds before the next roll occur
 */

// Event
// what will happen, event handler

let score = 20;
let highscore = 0;
let randomNumbers = [];

const guessBox = document.querySelector('.guess-box');
const guessInputs = guessBox.querySelectorAll('input');

const slots = document.querySelector('.slots');
const secretNumbers = slots.querySelectorAll('.number');

// random numbers done
const generateRandomNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const setRandomNumbers = function (count) {
  let arr = new Array(count);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = generateRandomNumber();
  }
  return arr;
};

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const isGuessBoxesValid = function () {
  for (let input of guessInputs) {
    if (!input.value) {
      // If any input is empty, return false immediately
      return false;
    }
  }

  return true; // If none of the inputs are empty, return true
};

const isInputMatch = function (inputs, secretNums) {
  for (let i = 0; i < inputs.length; i++) {
    const inputVal = Number(inputs[i].value);
    const sercretNumVal = Number(secretNums[i]);
    if (inputVal !== sercretNumVal) return false;
  }

  return true;
};

// resetting the game
document.querySelector('.again').addEventListener('click', function () {
  score = 20;

  document.querySelector('body').style.backgroundColor = '#222';

  for (let i = 0; i < secretNumbers.length; i++) {
    const secretNumber = secretNumbers[i];
    randomNumbers[i] = generateRandomNumber();
    secretNumber.style.width = '15rem';
    secretNumber.textContent = '?';
  }

  // document.querySelector('.guess').value = null;
  for (let i = 0; i < guessInputs.length; i++) {
    const secretNumber = guessInputs[i];
    secretNumber.value = '';
  }

  document.querySelector('.score').textContent = score;

  //   document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');
});

document.querySelector('.check').addEventListener('click', function () {
  const isMatch = isInputMatch(guessInputs, randomNumbers);
  // game logic

  // when there is no input
  if (!isGuessBoxesValid()) {
    displayMessage('No number');

    // when player wins
  } else if (isMatch) {
    displayMessage('Corrent Number!');

    // document.querySelector('.number').textContent = secretNumber;
    // document.querySelector('.number').style.width = '30rem';

    for (let i = 0; i < secretNumbers.length; i++) {
      const secretNumber = secretNumbers[i];
      secretNumber.textContent = randomNumbers[i];
      secretNumber.style.width = '30rem';
    }

    document.querySelector('body').style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    // When the guess is too high
  } else if (!isMatch) {
    if (score > 1) {
      // using ternary operator
      displayMessage('Try Again!');
      score--;
      displayScore(score);
    } else {
      displayMessage('You lost the game!');
    }
  }
});

function run() {
  const randomNumbersArr = setRandomNumbers(3);

  for (let i = 0; i < randomNumbersArr.length; i++) {
    randomNumbersArr[i] = generateRandomNumber();
    randomNumbers.push(randomNumbersArr[i]);
  }

  console.log(randomNumbersArr);
}

// run the game
run();
