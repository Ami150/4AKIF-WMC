const baseUrl = 'http://localhost:3000/api';

async function berechneBMI() {
  const gewicht = parseFloat(document.getElementById("gewicht").value);
  const groesse = parseFloat(document.getElementById("groesse").value);

  const res = await fetch(`${baseUrl}/bmi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gewicht, groesse })
  });

  const data = await res.json();
  document.getElementById("bmiErgebnis").innerText = `BMI: ${data.bmi} (${data.kategorie})`;
}

async function berechneZinsen() {
  const kapital = parseFloat(document.getElementById("kapital").value);
  const zinssatz = parseFloat(document.getElementById("zinssatz").value);
  const jahre = parseInt(document.getElementById("jahre").value);

  const res = await fetch(`${baseUrl}/zinsen`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ kapital, zinssatz, jahre })
  });

  const data = await res.json();
  document.getElementById("zinsErgebnis").innerText = `Endkapital: €${data.endkapital}`;
}

function cToF() {
  const c = parseFloat(document.getElementById("temperatur").value);
  const f = (c * 9/5) + 32;
  document.getElementById("umrechnerErgebnis").innerText = `${c} °C = ${f.toFixed(2)} °F`;
}

function fToC() {
  const f = parseFloat(document.getElementById("temperatur").value);
  const c = (f - 32) * 5/9;
  document.getElementById("umrechnerErgebnis").innerText = `${f} °F = ${c.toFixed(2)} °C`;
}

async function sendeCSV() {
  const csv = document.getElementById("csvInput").value;

  const res = await fetch(`${baseUrl}/csv-eval`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ csv })
  });

  const data = await res.json();
  document.getElementById("csvErgebnis").innerText =
    `Summe: ${data.summe}, Durchschnitt: ${data.durchschnitt}, Max: ${data.max}`;
}

async function holeKurs() {
  const betrag = parseFloat(document.getElementById("eurBetrag").value);
  if (isNaN(betrag)) {
    document.getElementById("wechselkursErgebnis").innerText = "Bitte gültigen Betrag eingeben.";
    return;
  }

  try {
    const res = await fetch("https://api.frankfurter.app/latest?amount=" + betrag + "&from=EUR&to=USD");
    const data = await res.json();
    const umgerechnet = data.rates.USD;

    document.getElementById("wechselkursErgebnis").innerText =
      `${betrag} EUR = ${umgerechnet.toFixed(2)} USD`;
  } catch (error) {
    document.getElementById("wechselkursErgebnis").innerText = "Fehler bei der Umrechnung.";
    console.error(error);
  }
}



