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
  whoseTurn: '',
  compDifficulty: 1,
  computerTurnResult: [],
  playerTurnResult: [],
  computerPlay: function() {
    this.isStarted = true;
    this.whoseTurn = 'computer';
    computerChoosesColors();
  },
  playerPlay: function() {

  }
};

// -----------------------Game Logic ----------------------------------//

let intervalID;

function computerChoosesColors() {

  function delayDisplayOfComputerChoices(moves) {
    setTimeout(function() {
      for (let i = 0; i < moves.length; i++) {
        setTimeout(function() {
          displayComputerChoice(moves[i]);
        }, 1000);
      }
    }, 0);
  }
  let moveHistory = [];
  for (var i = 0; i < game.compDifficulty; i++) {
    let result = getRandomColor();
    moveHistory.push(result);
  }
  delayDisplayOfComputerChoices(moveHistory);

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

//------------ Code for manipulating the DOM --------------------------//





greenPad.addEventListener('click', function(e) {
  e.preventDefault();
  sound1.currentTime = 0;
  sound1.play();
  greenPad.classList.remove('activeGreen');
  greenPad.classList.add('activeGreen');
  greenPad.addEventListener('transitionend', removeActiveGreenClass);
});

bluePad.addEventListener('click', function(e) {
  e.preventDefault();
  sound2.currentTime = 0;
  sound2.play();
  greenPad.classList.remove('activeBlue');
  bluePad.classList.add('activeBlue');
  bluePad.addEventListener('transitionend', removeActiveBlueClass);
});

redPad.addEventListener('click', function(e) {
  e.preventDefault();
  sound3.currentTime = 0;
  sound3.play();
  greenPad.classList.remove('activeRed');
  redPad.classList.add('activeRed');
  redPad.addEventListener('transitionend', removeActiveRedClass);
});

yellowPad.addEventListener('click', function(e) {
  e.preventDefault();
  sound4.currentTime = 0;
  sound4.play();
  greenPad.classList.remove('activeYellow');
  yellowPad.classList.add('activeYellow');
  yellowPad.addEventListener('transitionend', removeActiveYellowClass);
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
