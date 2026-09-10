// -------------------- copyright --------------------
const copyrightYear = document.querySelector('#copyright-year');
if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

// -------------------- rock paper scissors --------------------
function getRandomComputerResult() {
  const options = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function hasPlayerWonTheRound(player, computer) {
  return (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Scissors' && computer === 'Paper') ||
    (player === 'Paper' && computer === 'Rock')
  );
}

let playerScore = 0;
let computerScore = 0;

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult();

  if (hasPlayerWonTheRound(userOption, computerResult)) {
    playerScore++;
    return `Player wins! ${userOption} beats ${computerResult}`;
  } else if (computerResult === userOption) {
    return `It's a tie! Both chose ${userOption}`;
  } else {
    computerScore++;
    return `Computer wins! ${computerResult} beats ${userOption}`;
  }
}

const playerScoreSpanElement = document.querySelector('#player-score');
const computerScoreSpanElement = document.querySelector('#computer-score');
const roundResultsMsg = document.querySelector('#results-msg');
const winnerMsgElement = document.querySelector('#winner-msg');
const optionsContainer = document.querySelector('.rps_options-container');
const resetGameBtn = document.querySelector('#reset-game-btn');

function showResults(userOption) {
  roundResultsMsg.innerText = getRoundResults(userOption);
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;

  if (playerScore === 3 || computerScore === 3) {
    winnerMsgElement.innerText = `${
      playerScore === 3 ? 'Player' : 'Computer'
    } has won the game!`;

    resetGameBtn.style.display = 'block';
    optionsContainer.style.display = 'none';
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  computerScoreSpanElement.innerText = computerScore;
  playerScoreSpanElement.innerText = playerScore;
  winnerMsgElement.innerText = '';
  roundResultsMsg.innerText = '';

  resetGameBtn.style.display = 'none';
  optionsContainer.style.display = 'block';
}

resetGameBtn.addEventListener('click', resetGame);

document.querySelector('#rock-btn').addEventListener('click', () => {
  showResults('Rock');
});

document.querySelector('#paper-btn').addEventListener('click', () => {
  showResults('Paper');
});

document.querySelector('#scissors-btn').addEventListener('click', () => {
  showResults('Scissors');
});

// -------------------- pig latin --------------------

function toPigLatin(word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const punctuationMatch = word.match(/[.!?]+$/);
  const punctuation = punctuationMatch ? punctuationMatch[0] : '';
  const core = punctuation ? word.slice(0, -punctuation.length) : word;
  const lower = core.toLowerCase();

  if (vowels.includes(lower[0])) {
    return core + 'way' + punctuation;
  }

  let consonantClusterEnd = 0;
  while (
    consonantClusterEnd < core.length &&
    !vowels.includes(lower[consonantClusterEnd])
  ) {
    consonantClusterEnd++;
  }

  return (
    core.slice(consonantClusterEnd) +
    core.slice(0, consonantClusterEnd) +
    'ay' +
    punctuation
  );
}

function convertSentence(sentence) {
  return sentence.split(' ').map(toPigLatin).join(' ');
}

document.querySelector('#convertBtn').addEventListener('click', () => {
  const input = document.querySelector('#userInput').value;
  const result = convertSentence(input);
  document.querySelector('#output').innerText = result;
});

// -------------------- caesar --------------------
function caesarCipher(text, shift) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerText = text.toLowerCase();
  let result = '';

  for (let index = 0; index < lowerText.length; index++) {
    const character = lowerText[index];
    if (!alphabet.includes(character)) {
      result += character;
      continue;
    }

    let newIndex = (alphabet.indexOf(character) + shift) % 26;
    if (newIndex < 0) newIndex += 26;
    result += alphabet[newIndex];
  }

  return result;
}

document.querySelector('#caesar_cipherBtn').addEventListener('click', () => {
  const text = document.querySelector('#caesar_cipherInput').value;
  const shift = parseInt(
    document.querySelector('#caesar_shiftInput').value,
    10,
  );

  document.querySelector('#caesar_cipherOutput').innerText = caesarCipher(
    text,
    shift,
  );
});
