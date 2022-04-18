//Global variables
let door1 = document.getElementById('door1');
let door2 = document.getElementById('door2');
let door3 = document.getElementById('door3');
let startButton = document.getElementById('start');

let botDoorPath = "https://content.codecademy.com/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://content.codecademy.com/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://content.codecademy.com/projects/chore-door/images/space.svg";
let closedDoorPath = "https://content.codecademy.com/projects/chore-door/images/closed_door.svg"

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let score = 0;
let highScore = 0;
let currentStreak = document.getElementById('score-number');
let bestStreak = document.getElementById('high-score-number');
currentStreak.innerHTML = score;
bestStreak.innerHTML = highScore;

//isClicked() function
//Make each door clickable only once
//If they share the same value, then the door hasn’t been opened yet (meaning it has not been clicked) and you should return false.
//Otherwise, the door must be open already (meaning it has been clicked) so the function should instead return true.

const isClicked = (door) => {
  if (door.src == closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

//isBot() function
// if the door.src value is equivalent to the botDoorPath. If they share the same value, that means that particular door has the ChoreBot and should return true. Otherwise, the isBot() function should return false.

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

//playDoor() function
//Decreases the numClosedDoors variable.Each time u click a door, the number of available doors goes down by one.
//It checks if the game-winning condition (numClosedDoors === 0) has been met and if so, calls a gameOver() function.

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver('lose');
  }
}

// MVP - If/Else Generator (3 possible combinations)
 const randomChoreDoorGenerator = () => {
   const choreDoor = Math.floor(Math.random() * numClosedDoors);
   if (choreDoor === 0) {
     openDoor1 = botDoorPath;
     openDoor2 = beachDoorPath;
     openDoor3 = spaceDoorPath;
   } else if (choreDoor === 1) {
     openDoor2 = botDoorPath;
     openDoor1 = beachDoorPath;
     openDoor3 = spaceDoorPath;
   } else {
     openDoor3 = botDoorPath;
     openDoor1 = beachDoorPath;
     openDoor2 = spaceDoorPath;
   }
 }

//door1,2,3.onclick() functions

door1.onclick = () => {
  if(currentlyPlaying && !isClicked(door1)) {
    door1.src = openDoor1;
    playDoor(door1);
  }
}

door2.onclick = () => {
  if(currentlyPlaying && !isClicked(door2)) {
    door2.src = openDoor2;
    playDoor(door2);
  }
}

door3.onclick = () => {
  if(currentlyPlaying && !isClicked(door3)) {
    door3.src = openDoor3;
    playDoor(door3);
  }
}

startButton.onclick = () => {
    startRound();
}

//startRound() function
//The startRound() function not only has to start a new game; it also has to reset the values from the previous game.

const startRound = () => {
  // Reset all the doors to be closed
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good luck!';
  randomChoreDoorGenerator();
}

const gameOver = (str) => {
  if(str === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    getYourScore();
  } else {
    startButton.innerHTML = "Game over! Play again?"
    score = 0;
    currentStreak.innerHTML = score;
  }
  currentlyPlaying = false; //You’ll use this value to make sure that additional doors can’t be clicked after the ChoreBot door is clicked.
}

const getYourScore = () => {
  score++;
  currentStreak.innerHTML = score;
  if (score > highScore) {
    highScore = score;
    bestStreak.innerHTML = highScore;
  }
}


startRound();