import express from 'express';
const app = express();
const port = 3000;

app.get('/fizzbuzz', (req, res) => {
  const results = [];

  for (let i = 1; i <= 100; i++) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    if (i % 7 === 0) output += "Whizz";
    if (i % 11 === 0) output += "Bang";

    results.push(output || i);
  }

  res.json(results);
});

app.listen(port, () => {
  console.log(`FizzBuzz backend läuft auf http://localhost:${port}`);
});
