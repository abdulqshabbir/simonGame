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
});

bluePad.addEventListener('click', function(e) {
  e.preventDefault();
  sound2.currentTime = 0;
  sound2.play();
});
redPad.addEventListener('click', function(e) {
  e.preventDefault();
  sound3.currentTime = 0;
  sound3.play();
});
yellowPad.addEventListener('click', function(e) {
  e.preventDefault();
  sound4.currentTime = 0;
  sound4.play();
});
