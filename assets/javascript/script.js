// copyright

const copyrightYear = document.querySelector('#copyright-year');

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

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
});
