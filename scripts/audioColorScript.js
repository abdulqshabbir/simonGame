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

//---------------------- Game Object --------------------------------//

const game = {
  isStarted: false,
  whoseTurn: 'computer',
  compDifficulty: 1,
  computerTurnResult: [],
  playerTurnResult: [],
  computerPlay: function() {
    game.computerTurnResult = [];
    this.isStarted = true;
    this.whoseTurn = 'computer';
    computerChoosesColors();
  },
  playerPlay: function() {
    game.playerTurnResult = [];
    this.whoseTurn = 'player';
    playerChoosesColors();
  }
};

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
      setTimeout(function () {
        displayComputerChoice(moveHistory[i]);
      }, 1200*i);
    })(i);
  }

  //Wait until computer Turn is done making all its moves
  // and then start the player's turn
  setTimeout(function() {
    game.playerPlay();
  }, moveHistory.length*1000);
}

//-------------Testing out Promises -------------------------------


// ---------------------------------------------------------------------

function checkForMatch(array1, array2) {
  if(array1.length !== array2.length) {
    document.body.remove();
    console.log('remove body!');
    return false;
  }
  else {
    for (var i = 0; i < array1.length; i++) {
      if(array1[i] === array2[i]) {
        i++;
      }
      else {
        document.body.remove();
        console.log('remove body!');
        return false;
      }
    }
  }
  game.compDifficulty++;
  game.computerPlay();
  return true;
}

//Player chooses color:
//While it is the player's turn (playerMoves <= computerMoves) listen for listenForClicks
//Store clicks away in the game Object
//After each click check to see if the click matched with computer's click
//If it did, then keep listening for more clicks
  //If the playerMoves end up reaching computerMoves
//If it did not, break and delete DOM (for now)


function playerChoosesColors() {
  const pads = Array.from(document.querySelectorAll('.pad'));
  let playerMoves = 0;
  let computerMoves = game.compDifficulty;

  pads.forEach(function(pad){//listen for clicks and store result in player object
    pad.addEventListener('click', function listenForClicks(e) {
      playerMoves++;
      game.playerTurnResult.push(e.target.id);

      if(playerMoves >= computerMoves) {//check for when player turn is over
        checkForMatch(game.computerTurnResult, game.playerTurnResult);
        pads.forEach(function(pad) {// Remove listening for clicks
          pad.removeEventListener('click', listenForClicks, true);
          console.log('remove listener');
        });
        return;
      }

    }, true);
  });
}

function displayComputerChoice(choice) {
  switch(choice) {
    case 'yellow':
        sound4.currentTime = 0;
        sound4.play();
        greenPad.classList.remove('activeYellow');
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
        greenPad.classList.remove('activeRed');
        redPad.classList.add('activeRed');
        redPad.addEventListener('transitionend', removeActiveRedClass);
      break;
    case 'blue':
        sound2.currentTime = 0;
        sound2.play();
        greenPad.classList.remove('activeBlue');
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
  game.computerPlay();
  this.remove();
});

//---- Code for manipulating the DOM when it's player's turn --------------//

greenPad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
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
    sound2.currentTime = 0;
    sound2.play();
    greenPad.classList.remove('activeBlue');
    bluePad.classList.add('activeBlue');
    bluePad.addEventListener('transitionend', removeActiveBlueClass);
  }
});

redPad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
    sound3.currentTime = 0;
    sound3.play();
    greenPad.classList.remove('activeRed');
    redPad.classList.add('activeRed');
    redPad.addEventListener('transitionend', removeActiveRedClass);
  }
});

yellowPad.addEventListener('click', function(e) {
  if(game.whoseTurn === 'player') {
    e.preventDefault();
    sound4.currentTime = 0;
    sound4.play();
    greenPad.classList.remove('activeYellow');
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
