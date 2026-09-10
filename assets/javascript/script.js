// copyright

const copyrightYear = document.querySelector('#copyright-year');

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

//caesar

function caesarCipher(text, shift) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerText = text.toLowerCase();
  let result = '';

  for (let i = 0; i < lowerText.length; i++) {
    const char = lowerText[i];

    if (!alphabet.includes(char)) {
      result += char;
      continue;
    }

    const oldIndex = alphabet.indexOf(char);
    let newIndex = (oldIndex + shift) % 26;

    if (newIndex < 0) {
      newIndex += 26;
    }

    result += alphabet[newIndex];
  }

  return result;
}

document.getElementById('caesar_cipherBtn').addEventListener('click', () => {
  const text = document.getElementById('caesar_cipherInput').value;
  const shift = parseInt(document.getElementById('caesar_shiftInput').value);

  const encrypted = caesarCipher(text, shift);
  document.getElementById('caesar_cipherOutput').innerText = encrypted;
//pig latin

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

document.getElementById('convertBtn').addEventListener('click', () => {
  const input = document.getElementById('userInput').value;
  const result = convertSentence(input);
  document.getElementById('output').innerText = result;
// rock paper scissors

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

const playerScoreSpanElement = document.getElementById('player-score');
const computerScoreSpanElement = document.getElementById('computer-score');
const roundResultsMsg = document.getElementById('results-msg');
const winnerMsgElement = document.getElementById('winner-msg');
const optionsContainer = document.querySelector('.rps_options-container');
const resetGameBtn = document.getElementById('reset-game-btn');

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
  playerScore = '0';
  computerScore = '0';
  computerScoreSpanElement.innerText = playerScore;
  playerScoreSpanElement.innerText = computerScore;
  winnerMsgElement.innerText = '';
  roundResultsMsg.innerText = '';

  resetGameBtn.style.display = 'none';
  optionsContainer.style.display = 'block';
}

resetGameBtn.addEventListener('click', resetGame);

const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

rockBtn.addEventListener('click', function () {
  showResults('Rock');
});

paperBtn.addEventListener('click', function () {
  showResults('Paper');
});

scissorsBtn.addEventListener('click', function () {
  showResults('Scissors');
});
