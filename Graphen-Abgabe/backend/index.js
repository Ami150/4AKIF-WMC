const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// BMI
app.post('/api/bmi', (req, res) => {
  const { gewicht, groesse } = req.body;
  const bmi = gewicht / (groesse * groesse);
  let kategorie = 'Normalgewicht';
  if (bmi < 18.5) kategorie = 'Untergewicht';
  else if (bmi < 25) kategorie = 'Normalgewicht';
  else if (bmi < 30) kategorie = 'Übergewicht';
  else kategorie = 'Adipositas';
  res.json({ bmi: parseFloat(bmi.toFixed(2)), kategorie });
});

// Zinsen
app.post('/api/zinsen', (req, res) => {
  const { kapital, zinssatz, jahre } = req.body;
  const endkapital = kapital * Math.pow(1 + zinssatz / 100, jahre);
  res.json({ endkapital: parseFloat(endkapital.toFixed(2)) });
});

// CSV – robust gegen falsche Kommas etc.
app.post('/api/csv-eval', (req, res) => {
  const csv = req.body.csv;
  const lines = csv.split('\n');

  const werte = lines.map(line => {
    // Unerwartete Trennzeichen wie „，“ oder „؛“ ersetzen
    const cleanLine = line.trim().replace(/[，؛،]/g, ',');
    const [_, wert] = cleanLine.split(',');
    return parseFloat(wert);
  }).filter(w => !isNaN(w));

  const summe = werte.reduce((a, b) => a + b, 0);
  const durchschnitt = werte.length ? summe / werte.length : 0;
  const max = werte.length ? Math.max(...werte) : null;

  res.json({ summe, durchschnitt, max });
});

app.listen(port, () => {
  console.log(`Backend läuft unter http://localhost:${port}`);
});
