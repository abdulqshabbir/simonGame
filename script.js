const greenPad = document.getElementById('green');
const bluePad = document.getElementById('blue');
const redPad = document.getElementById('red');
const yellowPad = document.getElementById('yellow');

const sound1 = new Audio('sounds/simonSound1.mp3');
const sound2 = new Audio('sounds/simonSound2.mp3');
const sound3 = new Audio('sounds/simonSound3.mp3');
const sound4 = new Audio('sounds/simonSound4.mp3');




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
