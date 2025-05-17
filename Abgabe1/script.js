function startFizzBuzz() {
  const outputDiv = document.getElementById("output");
  outputDiv.innerText = ""; 
  let i = 1;

  while (true) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    if (i % 7 === 0) output += "Whizz";
    if (i % 11 === 0) output += "Bang";

    if (output === "") {
      outputDiv.innerText += i + "\n";
    } else {
      outputDiv.innerText += output + "\n";
      if (output === "FizzBuzzWhizzBang") {
        break;
      }
    }

    i++;
  }
}
