document.getElementById("calculateBtn").addEventListener("click", calculate);

document.getElementById("csvUpload").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    const lines = text.trim().split("\n").map(l => l.split(",").map(Number).join(" ")).join("\n");
    document.getElementById("matrixInput").value = lines;
  };
  reader.readAsText(file);
});

function parseMatrix(text) {
  return text.trim().split("\n").map(line => line.trim().split(/\s+/).map(Number));
}

function matrixMult(a, b) {
  const n = a.length;
  const res = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < n; k++)
        res[i][j] += a[i][k] * b[k][j];
  return res;
}

function potenz(matrix, k) {
  let result = matrix.map(row => [...row]);
  for (let i = 1; i < k; i++)
    result = matrixMult(result, matrix);
  return result;
}

function berechneDistanzen(matrix) {
  const n = matrix.length;
  const dists = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 0 : matrix[i][j] ? 1 : -1))
  );
  let power = matrix.map(row => [...row]);
  let stufe = 2;
  while (dists.flat().includes(-1)) {
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

function berechneExzentrizitaeten(dists) {
  const exz = dists.map(row => Math.max(...row));
  const radius = Math.min(...exz);
  const durchmesser = Math.max(...exz);
  const zentrum = exz.map((e, i) => e === radius ? i : -1).filter(i => i !== -1);
  return { exz, radius, durchmesser, zentrum };
}

function printMatrix(title, matrix) {
  let output = `${title}:\n`;
  matrix.forEach(row => {
    output += row.map(v => v.toString().padStart(2)).join(" ") + "\n";
  });
  return output + "\n";
}

function calculate() {
  const output = document.getElementById("output");
  output.textContent = "";
  try {
    const matrix = parseMatrix(document.getElementById("matrixInput").value);
    const k = parseInt(document.getElementById("powerInput").value);

    const potenzMatrix = potenz(matrix, k);
    const dists = berechneDistanzen(matrix);
    const { exz, radius, durchmesser, zentrum } = berechneExzentrizitaeten(dists);

    output.textContent += printMatrix(`Potenzmatrix A^${k}`, potenzMatrix);
    output.textContent += printMatrix("Distanzmatrix", dists);
    output.textContent += "Exzentrizitäten:\n";
    exz.forEach((e, i) => output.textContent += `Knoten ${i}: Exzentrizität = ${e}\n`);
    output.textContent += `\nRadius = ${radius}\nDurchmesser = ${durchmesser}\nZentrum = [${zentrum.join(", ")}]\n`;
  } catch (err) {
    output.textContent = "Fehler bei der Berechnung: " + err.message;
  }
}
