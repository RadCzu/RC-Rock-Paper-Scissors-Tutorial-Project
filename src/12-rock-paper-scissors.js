
const rockButton = document.querySelector(".js-rock-button");
rockButton.addEventListener("click", () => AIPlay(new Rock("rock")));

const paperButton = document.querySelector(".js-paper-button");
paperButton.addEventListener("click", () => AIPlay(new Paper("paper")));

const scissorsButton = document.querySelector(".js-scissors-button");
scissorsButton.addEventListener("click", () => AIPlay(new Scissors("scissors")));

const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", () => reset());

const autoplayButton = document.querySelector(".autoplay-button");
autoplayButton.addEventListener("click", () => autoplay());

document.body.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    case "r":
      AIPlay(new Rock("rock"));
      break;
    case "p":
      AIPlay(new Paper("paper"));
      break;
    case "s":
      AIPlay(new Scissors("scissors"));
      break;
    case "q":
      reset();
      break;
    case "a":
      autoplay();
      break;
    default:
      break;
  }
})

let score = JSON.parse(localStorage.getItem('score'))
|| {
    wins: 0,
    losses:0,
    draws: 0
  };

const choices = {
  aiChoice: 'rock',
  playerChoice: 'rock'
};

const product = {
  name: 'sock',
  price: 1090

};

function reset() {
  score.draws = 0;
  score.wins = 0;
  score.losses = 0;
  localStorage.removeItem('score');
  const summary = document.querySelector(".js-Summary-Text");
  summary.textContent = `Draws: ${score.draws} Losses: ${score.losses} Wins:${score.wins}`
}

class Hand {
  constructor(name) {
    this.name = name;
  }

  fight(other) {
      console.log(typeof(other));
      if(typeof(other) === 'Rock') {
        return 'draw';
      } else if(typeof(other) === 'Paper') {
        return 'draw';
      } else if(typeof(other) === 'Scissors') {
        return 'draw';
      }
      return 'draw';
  }
}

class Rock extends Hand {
  constructor(name) {
    super(name);
  }
  
  fight(other) {
    console.log(other);
    if(other instanceof(Rock)) {
      return 'draw';
    } else if(other instanceof(Paper)) {
      return 'win';
    } else if(other instanceof(Scissors)) {
      return 'loss';
    }
    return 'draw';
  }
}

class Paper extends Hand {
  constructor(name) {
    super(name);
  }
  
  fight(other) {
    console.log(other);
    if(other instanceof(Rock)) {
      return 'loss';
    } else if(other instanceof(Paper)) {
      return 'draw';
    } else if(other instanceof(Scissors)) {
      return 'win';
    }
    return 'draw';
  }
}

class Scissors extends Hand {
  constructor(name) {
    super(name);
  }
  
  fight(other) {
    console.log(other);
    if(other instanceof(Rock)) {
      return 'win';
    } else if(other instanceof(Paper)) {
      return 'loss';
    } else if(other instanceof(Scissors)) {
      return 'draw';
    }
    return 'draw';
  }
}

function AIPlay(playerInput) {

  choices.playerChoice = playerInput.name
  const choice = pickRandomMove();
  console.log('AI choice ' + choice.name);
  let result = choice.fight(playerInput);
  console.log('result ' + result);
  
  switch (result) {
    case 'draw':
    score.draws++;
    break;
    
    case 'loss':
    score.losses++;
    break;

    case 'win':
    score.wins++;
    break;
  }
  Update(result, playerInput.name, choice.name);
}

function pickRandomMove() {
  const ai = Math.random();
  console.log(ai);
  let choice = new Rock("rock");
  
  if (ai > (2/3)) {
    choice = new Paper("paper");
  } else if (ai > (1/3)) {
    choice = new Scissors("scissors");
  }
  return choice;
}

function Update(matchResult, playerChoice, aiChoice) {
  //save score
  localStorage.setItem('score', JSON.stringify(score));
  //result
  const result = document.querySelector(".js-Result-Text");
  result.textContent = matchResult;
  //Moves
  const moves = document.querySelector(".js-Moves-Text");
  moves.innerHTML = `You <img src = "images/${playerChoice}-emoji.png" class = "move-icon"> <img src = "images/${aiChoice}-emoji.png" class = "move-icon"> AI`
  //Summary
  const summary = document.querySelector(".js-Summary-Text");
  summary.textContent = `Draws: ${score.draws} Losses: ${score.losses} Wins:${score.wins}`
}

let isautoplaying = false;
let intervalID;

function autoplay() {
  if(!isautoplaying) {
    intervalID = setInterval(function() {
    AIPlay(pickRandomMove());
    }, 1000);
    isautoplaying = true;
    const button = document.querySelector(".autoplay-button");
    button.innerHTML = `stop autoplay`;
  } else {
    clearInterval(intervalID);
    isautoplaying = false;
    const button = document.querySelector(".autoplay-button");
    button.innerHTML = `autoplay`;
  }
  

}

