export class Frage{

  constructor(frage, optionen, antwort){
    if(arguments.length !== 3) throw new Error('3 Argumente benötigt');
    if(typeof frage !== 'string') throw new Error ('Frage muss String sein');
    if(!Array.isArray(optionen) || optionen.length === 0) 
      throw new Error ('Optionen müssen ein nicht leeres Array sein');
    if(typeof antwort != 'string') throw new Error('Antwort muss String sein');
    if(!optionen.includes(antwort))
      throw new Error('Antwort muss teil der Option sein'); 
  

  this.frage = frage;
  this.optionen = optionen;
  this.antwort = antwort;

}
}

export class Quiz{

constructor (fragenListe){
  if(arguments.length !== 1) throw new Error('Genau 1 Error erwartet');

  this.fragen = fragenListe.map((obj) => new Frage(obj.frage, obj.optionen, obj.antwort
  ));
}
  getFragenByLength(minLen) {
    return this.fragen.filter((f) => f.frage.length >= minLen);
}

getFragenSortedByLength() {
    return [...this.fragen].sort((a, b) => a.frage.length - b.frage.length);
}

getFragenWithOption(option) {
    return this.fragen.filter((f) => f.optionen.includes(option));
}

getAverageOptions() {
    const sum = this.fragen.reduce((acc, f) => acc + f.optionen.length, 0);
    return sum / this.fragen.length;
}

getAllOptions() {
    const all = this.fragen.flatMap(f => f.optionen);
    return [...new Set(all)];
}


}
