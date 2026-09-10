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
});
