
// Values that will be used to determine moves and create listeners to them
let crushBtn = document.getElementById("crush");
let upBtn = document.getElementById("up");
let downBtn = document.getElementById("down");
let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");
let entry = document.getElementById("userInput");
let myTable = document.getElementById("myTable");
var letterArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
var moveArray = ['up', 'down', 'left', 'right'];
var wrongInput = Boolean(false);


// Get input move from user and do move. 
// Here, move is already validated to be a correct formatted entry.
function prepareMove(direction) {
  var placementMove = document.getElementById("userInput").value;
  var letter = placementMove[0];
  letter = letter.toLowerCase();
  var x_val = letter.codePointAt(0) - 97;
  var y_val = placementMove[1] - 1;
  doMove(x_val, y_val, direction);
}

// Used multiple times throughout. disabled activateButtons.
function disableAll() {
  document.getElementById("up").disabled = true;
  document.getElementById("down").disabled = true;
  document.getElementById("left").disabled = true;
  document.getElementById("right").disabled = true;
  document.getElementById("up").style.backgroundColor = "silver";
  document.getElementById("down").style.backgroundColor = "silver";
  document.getElementById("left").style.backgroundColor = "silver";
  document.getElementById("right").style.backgroundColor = "silver";
}


// Depending on the move, activate the necessary button 
function activateButtons(candy, move) {

  if (move == 'up') {
    if (rules.isMoveTypeValid(candy, 'up')) {

      upBtn.disabled = false;
      upBtn.style.backgroundColor = "DodgerBlue";
    }

  }



  if (move == 'down') {
    if (rules.isMoveTypeValid(candy, 'down')) {
      downBtn.disabled = false;
      downBtn.style.backgroundColor = "DodgerBlue";

    }

  }
  if (move == 'left') {
    if (rules.isMoveTypeValid(candy, 'left')) {
      leftBtn.disabled = false;
      leftBtn.style.backgroundColor = "DodgerBlue";

    }

  }
  if (move == 'right') {
    if (rules.isMoveTypeValid(candy, 'right')) {
      rightBtn.disabled = false;
      rightBtn.style.backgroundColor = "DodgerBlue";

    }

  }

}

// Event listener that will focus on the actions regarding the Crush Button 
// Will call rules.moveCandiesDown() to move candy's down when cleared from the board.

crushBtn.addEventListener('click', function () {
  crushBtn.disabled = true;
  rules.removeCrushes(rules.getCandyCrushes());
  entry.disabled = true;

  //set a slight delay when clearing pecies.
  setTimeout(function () {
    entry.disabled = false;
    disableAll();

    rules.moveCandiesDown();

    //Change color of text depending on the background color that is displayed.
    for (i = 0; i < 8; i++) {
      for (j = 0; j < 8; j++) {
        cell = myTable.rows[i].cells[j];
        tempCandy = board.getCandyAt(i, j);
        myTable.rows[i].cells[j].style.backgroundColor = tempCandy;
        tempCandy != "yellow" ? cell.style.color = "white" : cell.style.color = "gray";   
      }
    }

    //If we can crush right after crushing the first time, allow it.
    if (rules.getCandyCrushes().length > 0) {
      let crushAgain = $('#crush');
      crushAgain.prop('disabled', false);
      document.getElementById("userInput").disabled = true;
    }
    else {
      entry.focus() //focus on text field when move is needed.
      let crushAgain = $('#crush');
      crushAgain.prop('disabled', true);
      document.getElementById("userInput").disabled = false;
    }
  }, 500);
});


//Validity check regarding the move that was inputted.

function validMove() {

  disableAll();
  var placementMove = document.getElementById("userInput").value;
  
  //See if the move is onlly of length 2; otherwise dont read entry.
  if (placementMove.length != 2) {
    wrongInput = true;

  } else {  //if valid size, check letter and number.
    wrongInput = false;
    var letter = placementMove[0];
    letter = letter.toLowerCase(); //lowercase
    var x_val = letter.codePointAt(0) - 97; //subtract ascii value from letter 
    var y_val = placementMove[1] - 1;
    var letterExists = letterArray.includes(letter);
    if (!letterExists) {
      return;
    } else {
      //create candy with valid points. check which direction to go.
      var candy = board.getCandyAt(y_val, x_val);
      for (var x = 0; x < moveArray.length; x++) {
        activateButtons(candy, moveArray[x]);
      }

    }
  }
}


//Do the actual move in the desired direction.
doMove = function (y_val, x_val, dir) {

  disableAll();
  entry.value = "";
  var currentCandy = board.getCandyAt(x_val, y_val);
  var valid = rules.isMoveTypeValid(currentCandy, dir);
  //If we have a valid move, swap the candy's in the direction the user chooses to go.
  //board.flipcandies() will take info from both candies and prove the necessary swap in place.
  if (valid) {
    var swapCandy = board.getCandyInDirection(currentCandy, dir);
    board.flipCandies(currentCandy, swapCandy);

  }
  //multiple crush instances
  if (rules.getCandyCrushes().length >= 1) {
    crushBtn.disabled = false;
    entry.disabled = true;
  }
}

//Do validity check and and prepare the move for the user.
upBtn.addEventListener('click', function () {
  prepareMove('up');
});

downBtn.addEventListener('click', function () {
  prepareMove('down');
});

leftBtn.addEventListener('click', function () {
  prepareMove('left');
});

rightBtn.addEventListener('click', function () {
  prepareMove('right');
});
