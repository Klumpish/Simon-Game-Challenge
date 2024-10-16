// color buttons selectors
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const gameOverbg = document.querySelector("body");

// array
buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
playerChoice = [];
nextGame = true;
let currentLevel = 1;

// function
function nextSequence() {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColors[randomNumber];
	return gamePattern.push(randomChosenColour);
}

addEventListener("keydown", () => {
	if (nextGame) {
		// document.querySelector(
		// 	"#level-title"
		// ).innerHTML = `Current lvl ${currentLevel}, Press the right colors to advance.`;
		nextSequence();
		startGame();
		nextGame = false;
	}
});

// players choice
for (let i = 0; i < document.querySelectorAll(".btn").length; i++) {
	document.querySelectorAll(".btn")[i].addEventListener("click", function () {
		let choice = this.id;
		playerChoice.push(choice);
		soundGame(choice);
		checkAnswer(playerChoice.length - 1);
	});
}

async function startGame() {
	for (let i = 0; i < gamePattern.length; i++) {
		const selector = document.querySelector(`#${gamePattern[i]}`);
		selector.classList.add("pressed");
		// wait
		soundGame(gamePattern[i]);
		await delay(500);
		selector.classList.remove("pressed");

		await delay(1100);
	}
}

// delay function for the For loop
function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// sound/music
async function soundGame(color) {
	switch (color) {
		case "red":
			const audioRed = new Audio("./sounds/red.mp3");
			audioRed.play();

			break;
		case "blue":
			const audioBlue = new Audio("./sounds/blue.mp3");
			audioBlue.play();

			break;
		case "green":
			const audioGreen = new Audio("./sounds/green.mp3");
			audioGreen.play();

			break;
		case "yellow":
			const audioYellow = new Audio("./sounds/yellow.mp3");
			audioYellow.play();

			break;

		default:
			break;
	}
	await delay(500);
}

async function checkAnswer(currentLevel) {
	if (playerChoice.length === gamePattern.length) {
		if (playerChoice.every((color, index) => color === gamePattern[index])) {
			console.log("you win");
			playerChoice = [];
			await delay(1000);
			nextSequence();
			currentLevel++;
			document.querySelector(
				"#level-title"
			).innerHTML = `Current lvl ${currentLevel}, Press the right colors to advance.`;
			startGame();
		} else {
			gameOver();
		}
	} else {
		if (playerChoice[currentLevel] === gamePattern[currentLevel]) {
			console.log("Success");
		} else {
			gameOver();
		}
	}
}

function gameOver() {
	console.log("wrong - reset");
	gamePattern = [];
	playerChoice = [];
	currentLevel = 1;
	nextGame = true;
	document.querySelector("#level-title").innerHTML = "Game Over,Press Any key to Restart";
	gameOverbg.classList.add("game-over");
	setTimeout(() => {
		gameOverbg.classList.remove("game-over");
	}, 200);
}
