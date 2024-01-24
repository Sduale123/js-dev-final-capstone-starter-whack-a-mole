const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const backgrounds = document.querySelector('.background')
const startButton = document.querySelector('#start');
// Select the missing query selectors:
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timer'); // Use querySelector() to get the timer element
const song = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/molesong.mp3?raw=true");
const cursors = document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});


let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";



// Function to generate a random integer within a range
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to set time delay based on difficulty level
function setDelay(difficulty) {
  const easyDelay = 1500;
  const normalDelay = 1000;

  if (difficulty === "easy") {
    return easyDelay;
  } else if (difficulty === "normal") {
    return normalDelay;
  } else if (difficulty === "hard") {
    const randomDelay = Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
    return randomDelay;
  } else {
    console.warn("Invalid difficulty level. Defaulting to normal difficulty.");
    return normalDelay;
  }
}
setDelay("easy") //> Returns 1500
setDelay("normal") //> Returns 1000
setDelay("hard") //> Returns 856 (returns a random number between 600 and 1200)

// Function to choose a random hole from a list
function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];

  if (hole === lastHole) {
    return chooseHole(holes);
  }

  lastHole = hole;
  return hole;
}

// Function to show and hide the mole with a delay
function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole
    gameOver();
  }, delay, 1000);
  

  return timeoutID;
}
// Function sets delay and choose which holes the mole shows up
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}


// Function to toggle visibility by adding or removing the 'show' class
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}
// Function updates score
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

// Function to clear the player's score
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}
// Function to set the game duration
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
}

// Function to update the timer and end the game if time is up
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

// Function starts timer
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

 //Function to handle when a mole is clicked
function whack(event) {
  updateScore();
  playAudio(audioHit);
  return points
}

// Function to set up click events for moles
function setEventListeners() {
  moles.forEach(mole => mole.addEventListener('click', whack));
  return moles;
}

function playAudio(audioObject) {
  audioObject.play();
}

function playSong() {
  playAudio(song);
}

let isSongPlaying = false;

 //Function to play or stop the song
function toggleSong() {
  if (isSongPlaying) {
    stopAudio(song);
    isSongPlaying = false;
  } else {
    playAudio(song);
    song.loop = true; // Set the loop property to true for continuous playback
    isSongPlaying = true;
  }}

// function to stop
function stopGame(){
  clearInterval(timer); // resets timer
  return "game stopped";
}

 //Function to start the game when the button is clicked
function startGame() {
  clearScore();
  setDuration(10);
  // Check if the timer is already running, and clear it if it is
  if (timer) {
    stopGame();
  }
  startTimer();
  setEventListeners(); 
  let moleVisible = false;
    //Only call showUp() if a mole is not currently visible
    if (!moleVisible) {
      moleVisible = true;
      showUp();
     }
     return "game started";
    }

//Function to handle when the game is over
function gameOver() {
  if (time > 0) {
    const timeoutID = showUp();
    return timeoutID;
  } else {
    const gameStopped = stopGame();
    return gameStopped;
  }
}

startButton.addEventListener("click", startGame);


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
