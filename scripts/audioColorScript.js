'use strict';
// ----------------- Game Buttons and Sounds ------------------------------//
const greenPad = document.getElementById('green');
const bluePad = document.getElementById('blue');
const redPad = document.getElementById('red');
const yellowPad = document.getElementById('yellow');
const playButton = document.getElementById('playButton');
const sound1 = new Audio('sounds/simonSound1.mp3');
const sound2 = new Audio('sounds/simonSound2.mp3');
const sound3 = new Audio('sounds/simonSound3.mp3');
const sound4 = new Audio('sounds/simonSound4.mp3');

// ----------------------Global Variables ----------------------------//
let timerId1;
let timerId2;
let timerId3;
//---------------------- Game Object --------------------------------//

const game = {
  isStarted: false,
  whoseTurn: 'computer',
  compDifficulty: 0,
  computerTurnResult: [],
  playerTurnCount: 0,
  playerTurnResult: [],
  computerPlay: function() {
    displayComputerDifficulty();
    displayComputerTaunt();
    game.computerTurnResult = [];
    this.isStarted = true;
    this.whoseTurn = 'computer';
    computerChoosesColors();
  },
  playerPlay: function() {
    game.playerTurnResult = [];
    this.whoseTurn = 'player';
    this.playerTurnCount = 0;
  },
  gameOver: function() {
    clearTimeout(timerId1);
    clearTimeout(timerId2);
    clearTimeout(timerId3);
    console.log('cleared timer');
    document.body.remove();
  }
};

game.computerTaunts = ["I'm trying to go easy on you", "What's the hold up", "Which part of 'click' didn't you understand?", "Do your parents know you're up this late", "Wake me up when you're done"];
// -----------------------Game Logic ----------------------------------//


function computerChoosesColors() {
  let moveHistory = [];
  //create random array of computer moves and store
  for (let i = 0; i < game.compDifficulty; i++) {
    let result = getRandomColor();
    moveHistory.push(result);
  }
  //copy move history to game object
  game.computerTurnResult = moveHistory;

  //delay computer manipulation of DOM using setTimeout
  //wrap setTimeout in IIFE to create a closure
  for (let i = 0; i < moveHistory.length; i++) {
    (function(i){
      timerId1 = setTimeout(function () {
        displayComputerChoice(moveHistory[i]);
      }, 1000*i);
    })(i);
  }

  //Wait until computer Turn is done making all its moves
  // and then start the player's turn
  timerId2 = setTimeout(function() {
    game.playerPlay();
  }, moveHistory.length*1000);
}

//Player chooses color:
//While it is the player's turn (playerMoves <= computerMoves) listen for listenForClicks
//Store clicks away in the game Object
//After each click check to see if the click matched with computer's click
//If it did, then keep listening for more clicks
  //If the playerMoves end up reaching computerMoves make it computer's
  //turn and increase computer Difficult by 1
//If it did not, break and delete DOM (for now)

function handlePlayerClick(e) {
  let playerChoice = e.target.id;
  game.playerTurnCount = game.playerTurnCount + 1;
  checkForMatch(playerChoice, game.playerTurnCount);
}

function checkForMatch(playerChoice, playerCounter) {
  if(playerCounter < game.compDifficulty) {
    if(playerChoice !== game.computerTurnResult[playerCounter - 1]){
      game.gameOver();
      return;
    }
    else if (playerChoice === game.computerTurnResult[playerCounter - 1]) {
      //player made the right selection so we exit out of this function and listen for more events
      console.log('you have a match!');
      return;
    }
  }
  game.whoseTurn = 'computer';
  timerId3 = setTimeout(function() {
    game.compDifficulty++;
    game.computerPlay();
  }, 3000);
}

function displayComputerChoice(choice) {
  switch(choice) {
    case 'yellow':
        sound4.currentTime = 0;
        sound4.play();
        yellowPad.classList.remove('activeYellow');
        yellowPad.classList.add('activeYellow');
        yellowPad.addEventListener('transitionend', removeActiveYellowClass);
      break;
    case 'green':
        sound1.currentTime = 0;
        sound1.play();
        greenPad.classList.remove('activeGreen');
        greenPad.classList.add('activeGreen');
        greenPad.addEventListener('transitionend', removeActiveGreenClass);
      break;
    case 'red':
        sound3.currentTime = 0;
        sound3.play();
        redPad.classList.remove('activeRed');
        redPad.classList.add('activeRed');
        redPad.addEventListener('transitionend', removeActiveRedClass);
      break;
    case 'blue':
        sound2.currentTime = 0;
        sound2.play();
        bluePad.classList.remove('activeBlue');
        bluePad.classList.add('activeBlue');
        bluePad.addEventListener('transitionend', removeActiveBlueClass);
      break;
  }
}

function getRandomColor() {
  const randomNum = Math.floor(Math.random()*4);
  const colors = ['red', 'yellow', 'green', 'blue'];
  return colors[randomNum];
}

playButton.addEventListener('click', function() {
  game.compDifficulty = 1;
  displayComputerDifficulty();
  displayComputerTaunt();
  game.computerPlay();
  this.remove();
});

function displayComputerDifficulty () {
  let difficulty = game.compDifficulty;
  const compLevel = document.getElementById('playerLevel');
  compLevel.innerHTML = difficulty;
}

function displayComputerTaunt() {
  const computerTaunts = game.computerTaunts;
  const randomNum = Math.floor(Math.random()*computerTaunts.length);
  const taunt = computerTaunts[randomNum];
  const div = document.querySelector('.taunt');
  div.innerHTML = taunt;
}
//---- Code for manipulating the DOM when it's player's turn --------------//

greenPad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
    handlePlayerClick(e);
    sound1.currentTime = 0;
    sound1.play();
    greenPad.classList.remove('activeGreen');
    greenPad.classList.add('activeGreen');
    greenPad.addEventListener('transitionend', removeActiveGreenClass);
  }
});

bluePad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
    handlePlayerClick(e);
    sound2.currentTime = 0;
    sound2.play();
    bluePad.classList.remove('activeBlue');
    bluePad.classList.add('activeBlue');
    bluePad.addEventListener('transitionend', removeActiveBlueClass);
  }
});

redPad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
    handlePlayerClick(e);
    sound3.currentTime = 0;
    sound3.play();
    redPad.classList.remove('activeRed');
    redPad.classList.add('activeRed');
    redPad.addEventListener('transitionend', removeActiveRedClass);
  }
});

yellowPad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
    handlePlayerClick(e);
    sound4.currentTime = 0;
    sound4.play();
    yellowPad.classList.remove('activeYellow');
    yellowPad.classList.add('activeYellow');
    yellowPad.addEventListener('transitionend', removeActiveYellowClass);
  }
});

function removeActiveGreenClass() {
  this.classList.remove('activeGreen');
}

function removeActiveYellowClass() {
  this.classList.remove('activeYellow');
}

function removeActiveRedClass() {
  this.classList.remove('activeRed');
}

function removeActiveBlueClass() {
  this.classList.remove('activeBlue');
}
