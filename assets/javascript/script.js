// copyright

const copyrightYear = document.querySelector('#copyright-year');

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

document.getElementById('cipherBtn').addEventListener('click', () => {
  const text = document.getElementById('cipherInput').value;
  const shift = parseInt(document.getElementById('shiftInput').value);

  const encrypted = caesarCipher(text, shift);
  document.getElementById('cipherOutput').innerText = encrypted;
});
