// TO DO: 

// The 2 buttons are not working. We must make them work!

// We can add a Score counter somehere in the webpage. 
// It will keep score of how many games won by X and how many by O.

// There is more to think of, but for now this is it.





let tableSize = 4;
let box = '';
let boxes = [];
let turn = 'X';
let score;
let moves;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var identifier = 1;
  for (var i = 0; i < tableSize; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < tableSize; j++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 100);
      cell.setAttribute('width', 100);
      cell.setAttribute('align', 'center');
      cell.setAttribute('valign', 'center');
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == tableSize - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  document.getElementById('theBoard').appendChild(board);
  startNewGame();
}

/**
 * New game
 */


function startNewGame() {
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  boxes.forEach(function (square) {
    square.innerHTML = box;
  });
}

/**
 * Check if a win or not
 */
function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#theBoard ' + testClass, turn);
    if (items.length == tableSize) {
      return true;
    }
  }
  return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
  if (this.innerHTML !== box) {
    return;
  }
  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    let myWindow = window.open("", "MsgWindow", "width=200,height=200");
    myWindow.document.write("<p><link rel='stylesheet' type='text/css' href='main.css'>Winner: <br><br>Player</p>" + turn);
//    alert('Winner: Player ' + turn);
    startNewGame();
  } else if (moves === tableSize * tableSize) {
//    alert('Draw');
    let myWindow = window.open("", "MsgWindow", "width=200,height=200");
    myWindow.document.write("<p><link rel='stylesheet' type='text/css' href='main.css'>DRAW!</p>");
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn + ' Turn';
  }
}

init();