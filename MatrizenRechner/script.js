document.getElementById("calculateBtn").addEventListener("click", calculate); //1

document.getElementById("csvUpload").addEventListener("change", function(event) { //2
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const text = e.target.result;
      const lines = text.trim().split("\n").map(l => l.split(",").map(Number).join(" ")).join("\n");
      document.getElementById("matrixInput").value = lines;
    } catch (err) {
      alert("Datei konnte nicht verarbeitet werden.");
    }
  };
  reader.readAsText(file);
});

function parseMatrix(text) { //3
  return text.trim().split("\n").map(line => line.trim().split(/\s+/).map(Number));
}

function matrixMult(a, b) { //4
  const n = a.length;
  const res = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++)
        res[i][j] += a[i][k] * b[k][j];
  return res;
}

function potenz(matrix, k) { //5
  let result = matrix.map(row => [...row]);
  for (let i = 1; i < k; i++)
    result = matrixMult(result, matrix);
  return result;
}

function berechneDistanzen(matrix) {//6
  const n = matrix.length;
  const dists = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 0 : matrix[i][j] ? 1 : -1))
  );
  let power = matrix.map(row => [...row]);
  let stufe = 2;
  const maxStufen = n * n;
  while (dists.flat().includes(-1) && stufe <= maxStufen) {
    power = matrixMult(power, matrix);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (power[i][j] !== 0 && dists[i][j] === -1) dists[i][j] = stufe;
      }
    }
    stufe++;
  }
  return dists;
}

function berechneExzentrizitaeten(dists) {  //7
  const exz = dists.map(row => Math.max(...row));
  const radius = Math.min(...exz);
  const durchmesser = Math.max(...exz);
  const zentrum = exz.map((e, i) => e === radius ? i : -1).filter(i => i !== -1);
  return { exz, radius, durchmesser, zentrum };
}

function printMatrix(title, matrix) { //8
  let output = `${title}:\n`;
  matrix.forEach(row => {
    output += row.map(v => v.toString().padStart(2)).join(" ") + "\n";
  });
  return output + "\n";
}

function calculate() { //9
  const output = document.getElementById("output");
  output.textContent = "";

  try {
    const matrix = parseMatrix(document.getElementById("matrixInput").value);
    const n = matrix.length;
    const k = parseInt(document.getElementById("powerInput").value);

    if (!isNaN(k)) {
      const potenzMatrix = potenz(matrix, k);
      output.textContent += printMatrix(`Potenzmatrix A^${k}:`, potenzMatrix);
    } else {
      output.textContent += "Hinweis: Keine Potenz angegeben – nur Distanzanalyse wird durchgeführt.\n\n";
    }

    const dists = berechneDistanzen(matrix);
    const { exz, radius, durchmesser, zentrum } = berechneExzentrizitaeten(dists);

    output.textContent += printMatrix("Distanzmatrix:", dists);
    output.textContent += "Exzentrizitäten:\n";
    exz.forEach((e, i) => output.textContent += `Knoten ${i}: Exzentrizität = ${e}\n`);
    output.textContent += `\nRadius = ${radius}\nDurchmesser = ${durchmesser}\nZentrum = [${zentrum.join(", ")}]\n`;

    if (dists.flat().includes(-1)) { //10
      output.textContent += `\n⚠️ Hinweis: Der Graph ist nicht zusammenhängend. Einige Knoten sind nicht erreichbar.\n`;

    if (!matrix.every(row => row.length === matrix.length)) {
      output.textContent = "❌ Fehler: Die Matrix muss quadratisch sein.\nBitte gib z. B. eine 3x3 oder 4x4 Matrix ein.";
      return;
}
  
}
  } catch (err) {
    output.textContent = "Fehler bei der Berechnung: " + err.message;
  }
}

