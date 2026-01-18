function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getHumanChoice() {
  return prompt("Enter rock, paper, or scissors:");
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();

    if (humanChoice === computerChoice) {
      console.log("It's a tie!");
      return "tie";
    }

    const winningConditions = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper"
    };

    if (winningConditions[humanChoice] === computerChoice) {
      humanScore++;
      console.log(`You win! ${humanChoice} beats ${computerChoice}`);
      return "human";
    } else {
      computerScore++;
      console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
      return "computer";
    }
  }

  for (let round = 1; round <= 5; round++) {
    console.log(`--- Round ${round} ---`);
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }

  console.log("Final Score:");
  console.log(`Human: ${humanScore}`);
  console.log(`Computer: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("You won the game!");
  } else if (computerScore > humanScore) {
    console.log("The computer won the game!");
  } else {
    console.log("The game ended in a tie!");
  }
}

playGame();
