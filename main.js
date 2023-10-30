const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field {
  constructor(field) {
    this._field = field;
    this._field[0][0] = pathCharacter
  }

  print() {
    const arr = this._field

    console.log ('You(*) have to find your way to find your hat(^). Avoid the holes(O)!')
    console.log ('=====================================================================')

    arr.forEach((element) => 
    console.log (element.join('')))
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map(el => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    // Set the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    // Make sure the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }

}

const myField = new Field(Field.generateField(10, 10, 0.2));
console.log(myField)

// intro before game start
console.log ('WELCOME TO FIND YOUR HAT')
console.log ('========================')
intro()

function intro() {

  var answer = prompt('Do you have what it takes to find your missing hat? Y/N: ') 
  answer = answer.toLowerCase()

  if (answer == "y") {
    console.clear();
    startGame() 
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

function startGame() {
// Initialize new game  
let gameStart = true;

// To validate moves
const validMoves = ['u', 'd', 'l', 'r', 'q'];

// Initialize user input
let direction = null;

// Find initial position of player in field
let position = myField._field.findIndex(element => element.indexOf('*') > -1);
position = [position, myField._field[position].indexOf('*')];

while (gameStart) {
  
  switch (direction) {
    case 'u':
      position[0] = position[0] - 1;
      break;
    case 'd':
      position[0] = position[0] + 1;
      break;
    case 'l':
      position[1] = position[1] - 1;
      break;
    case 'r':    
      position[1] = position[1] + 1;
      break;
    case 'q':    
      position[1] = position[1] + 1;
      console.log('Try again another time!');
      process.exit();
  }
 
  if (position[0] < 0 || position[1] < 0) {
    console.log('You knocked into the wall and died. Try again.');
    process.exit();
    
  }   

  // Validate new position
  const newPosition = myField._field[position[0]][position[1]];

  switch (newPosition) {
    case '░':
      myField._field[position[0]][position[1]] = '*';
      break;
    case 'O':
      console.log('You took a step and fell down a hole. Try again!');
      process.exit();
    case '^':
      console.log('You have found your hat! Congrats!');
      process.exit();   
  }    

  // Clear screen
  console.clear();
  // display updated field
  myField.print();
  // Reset user input
  direction = null;
  // Keep prompting user for direction until a valid input is received
  while (!direction) {
    console.log('(u)p, (d)own, (l)eft, (r)ight, (q)uit')
    direction = prompt('Which way do you want to go? ');
    // Validate the input
    direction = validMoves.find(element => element === direction.toLowerCase());
  }  
}
}
