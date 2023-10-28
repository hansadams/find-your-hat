const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// Field class declared
class Field {
  constructor(field){
    this._field = field
  }

  // create .print method
  print() {
    const arr = this._field

    console.log ('You(*) have to find your way to find your hat(^). Avoid the holes(O)!')
    console.log ('=====================================================================')

    arr.forEach((element) => 
    console.log (element.join('')))
  }

}  

// myField instance of Field class
const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░']
]);

// JavaScript RegExp to validate user input: (u)p, (d)own, (l)eft, (r)ight
const validMoves = ['u', 'd', 'l', 'r', 'q'];
// Initialize user input
let direction = null;
// Find initial position of player in field
let position = myField._field.findIndex(element => element.indexOf('*') > -1);
position = [position, myField._field[position].indexOf('*')];

// initialise Game
function intro() {

  var answer = prompt('Do you have what it takes to find your missing hat? Y/N: ') 
  answer = answer.toLowerCase()

  if (answer == "y") {
    console.clear();
    myField.print() 
  }
  else if (answer == "n") {
    console.log("Come back when you're ready.")
    process.exit()
  }
  else {
    console.log("Invalid response. Please try again.") 
    intro()
  }

}


// Game Start
console.clear();
console.log ('WELCOME TO FIND YOUR HAT')
console.log ('========================')
startGame()
while (!direction) {
  console.log('(u)p, (d)own, (l)eft, (r)ight, (q)uit')
  direction = prompt('Which way? ');
  // Validate the input
  direction = validMoves.find(element => element === direction.toLowerCase());
}  

