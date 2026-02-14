class RockPaperScissors {
  constructor() {
    this.humanScore = 0;
    this.computerScore = 0;
    this.winningScore = 5;
    this.state = "playing"; // playing | finished

    this.buttons = document.querySelectorAll("[data-choice]");
    this.resultDisplay = document.getElementById("result");
    this.scoreDisplay = document.getElementById("score");
    this.statusDisplay = document.getElementById("game-status");
    this.restartBtn = document.getElementById("restart");

    this.init();
  }

  // Initialize event listeners
  init() {
    this.buttons.forEach(button => {
      button.addEventListener("click", () => {
        this.handleMove(button.dataset.choice);
      });
    });

    this.restartBtn.addEventListener("click", () => this.restart());
  }

  // Game controller
  handleMove(humanChoice) {
    if (this.state !== "playing") return;

    const computerChoice = this.getComputerChoice();
    const result = this.playRound(humanChoice, computerChoice);

    this.updateUI(result.message, result.type);
    this.updateScore();
    this.checkWinner();
  }

  // Random computer move
  getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Game rules
  playRound(humanChoice, computerChoice) {
    if (!["rock", "paper", "scissors"].includes(humanChoice)) {
      return { message: "Invalid move", type: "tie" };
    }

    if (humanChoice === computerChoice) {
      return {
        message: `Tie! Both chose ${humanChoice}`,
        type: "tie"
      };
    }

    const winsAgainst = {
      rock: "scissors",
      paper: "rock",
      scissors: "paper"
    };

    if (winsAgainst[humanChoice] === computerChoice) {
      this.humanScore++;
      return {
        message: `You win! ${humanChoice} beats ${computerChoice}`,
        type: "win"
      };
    }

    this.computerScore++;
    return {
      message: `You lose! ${computerChoice} beats ${humanChoice}`,
      type: "lose"
    };
  }

  // Update UI message + style
  updateUI(message, type) {
    this.resultDisplay.textContent = message;
    this.resultDisplay.className = type;
  }

  // Update score display
  updateScore() {
    this.scoreDisplay.textContent =
      `Human: ${this.humanScore} | Computer: ${this.computerScore}`;
  }

  // State machine winner check
  checkWinner() {
    if (this.humanScore >= this.winningScore) {
      this.endGame("🎉 You won the game!");
    }

    if (this.computerScore >= this.winningScore) {
      this.endGame("Computer wins the game!");
    }
  }

  // End game state
  endGame(message) {
    this.state = "finished";
    this.statusDisplay.textContent = message;
    this.toggleButtons(true);
  }

  // Enable/disable controls
  toggleButtons(disabled) {
    this.buttons.forEach(btn => btn.disabled = disabled);
  }

  // Restart game
  restart() {
    this.humanScore = 0;
    this.computerScore = 0;
    this.state = "playing";

    this.updateScore();
    this.resultDisplay.textContent = "Choose your move";
    this.resultDisplay.className = "";
    this.statusDisplay.textContent = "First to 5 points wins";

    this.toggleButtons(false);
  }
}

// Start game
new RockPaperScissors();
