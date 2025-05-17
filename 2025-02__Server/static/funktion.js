function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
  }
  return true;
}

function checkPrime() {
  let input = document.getElementById("numberInput").value;
  let resultText = document.getElementById("result");

  if (!/^\d+$/.test(input)) {
      resultText.style.color = "red";
      resultText.innerText = "Ungültiger Eintrag! Nur ganze Zahlen erlaubt.";
      return;
  }

  let num = parseInt(input, 10);

  if (isPrime(num)) {
      resultText.style.color = "green";
      resultText.innerText = `${num} ist eine Primzahl.`;
  } else {
      resultText.style.color = "red";
      resultText.innerText = `${num} ist keine Primzahl.`;
  }
}

// Event-Listener für "Enter"-Taste hinzufügen
document.getElementById("numberInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
      checkPrime();
  }
});
