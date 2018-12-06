let grid = [];
let playable;
let score;
let scoreAdd;
const gameMessage = document.getElementById('gamemessage');
const scoreBoard = document.getElementById('scorebox');

function beep() {
    var snd = new Audio("./sound/merge.wav");
    snd.play();
}

function boop() {
    var snd = new Audio("./sound/move.wav");
    snd.play();
}
function blip() {
    var snd = new Audio("./sound/lvlup.wav");
    snd.play();
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
//Create Score
const addScore = () => {
  scoreBoard.innerHTML = `Score: ${score}`;

}
//End Create Score
//fills grid with all null values.
const createGrid = () => {
  grid = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ]
  playable= true;
  score = 0;
  scoreAdd = 0;
  addScore();
  return grid;
}
createGrid();


const getGrid = () => {
  return grid;
}

const changeTile = (x, y, value) => {
  grid[x][y] = value;
  return grid[x][y];
}

//Check //
function checkWin(arr) {
  let winCount = 0;
  for(let i = 0; i < 4; i++) {
    let row = [];
    for(let n = 0; n < 4; n++) {
      //Check each key in row
        if (grid[i][n]==2048){
          winCount++;
        } else {
          //Don't count.
        }
    }
    //Check each row

  }
  if (winCount == 1){
    playable = false;
    //sleep(500);
    gameMessage.innerHTML= "Win";
    //alert("You Win.");
    return true;
  } else {
    return false;
  }
}
//updates the table in the HTML to accurately resemble the current state of
//the array grid
const updateGrid = () => {
  //checks to see if there is currently a table on the screen. If so, delete it
  if(document.contains(document.querySelector("table"))){
    document.body.removeChild(document.querySelector("table"));
  }
  //create new table
  let table = document.createElement("table");
  //loops through each row in the grid array
  for(let r = 0; r < grid.length; r++) {
    //create 4 tr's
    let row = document.createElement("tr");
    //loops through each element in each row
    for(let c = 0; c < grid[r].length; c++) {
      //creates td elements with contents accurate to the specific slot in grid
      let slot = document.createElement("td");
      let gridContents = grid[r][c];
      let contents;
      //if the slot on the grid isn't null, put in that value.
      if(gridContents != null) {
        contents = document.createTextNode(`${gridContents}`);
      }
      //if grid's value is null, put an empty table element
      else {
        contents = document.createTextNode(``);
      }

      slot.appendChild(contents);
      row.appendChild(slot);
    }
    table.appendChild(row);
  }
  document.body.appendChild(table);
  checkWin(grid);
}

updateGrid();
function isArrayFull(arr) {
  let fullCount = 0;
  for(let i = 0; i < 4; i++) {
    let row = [];
    for(let n = 0; n < 4; n++) {
      //Check each key in row
        if (typeof grid[i][n]!= 'object'){
          fullCount++
        } else {
          //Don't count.
        }
    }
    //Check each row

  }
  if (fullCount >= 16){
    return true;
  } else {
    return false;
  }
}


//KeyListeners.
document.addEventListener('keydown', (event) => {
  if (event.key=="ArrowUp"){
      moveUp();
  } else if (event.key=="ArrowDown"){
      moveDown();
  } else if (event.key=="ArrowRight"){
      moveRight();
  } else if (event.key=="ArrowLeft"){
      moveLeft();
  } else {
    //console.log("Not a valid keystroke");
  }
});

//Spawn Tiles
const spawnRandomTile=()=>{
  //Set up location and what tiles spawn.
  if (playable == false){
    console.log(`Game is currently not playable. Either a loss or win was recorded.`);
    return;
  }
  console.log(`Spawning tile.`);
  let randomcol= Math.floor((Math.random()*4));
  let randomrow= Math.floor((Math.random()*4));
  let tiles= [2,4];
  let newTile= tiles[Math.floor(Math.random()*tiles.length)];

    if (typeof grid[randomrow][randomcol]== 'object' && typeof grid[randomrow][randomcol]!= 'string') {
      if (isArrayFull(grid)== true){
        console.log( `The Board is Full.`);
        updateGrid();
        return;
      }
      console.log(`grid([${randomrow}][${randomcol}])`);
      grid[randomrow][randomcol]= newTile;
      updateGrid();
    } else {
      console.log("Space not available. Rolling again.");
      updateGrid();
      if (isArrayFull(grid)== true){
        console.log( `Grid is full. Do not draw more.`);
        updateGrid();
     } else {
       console.log(`Grid isn't full. Roll.`);
       spawnRandomTile();
       updateGrid();
      }
    }
}
spawnRandomTile();
//End Spawn Tiles

//Movement
const moveUp = () => {
  if (playable == false){
    console.log(`Game is currently not playable. Either a loss or win was recorded.`);
    return;
  }

  for(let col = 0; col < 4; col++) {
    //handles the merging of the tiles
    let merges = 0;
    let i = 1;
    while(i < grid.length) {
      let value = grid[i][col];
      let index = i - 1;
      while(index > merges && grid[index][col] == null) {
        index--;
      }
      if(grid[index][col] == grid[i][col] && grid[index][col] != null) {
        //change the number you hit to 2x its value
        grid[index][col] = value*2;
        scoreAdd = value*2;
        score += scoreAdd;
        //remove the starter number, it will now be merged into set[index]
        grid[i][col] = null;
        //increase merges so that we don't check a slot we already merged
        merges = i;
      }
      i++;
    }
    //handles moving the tiles correctly
    for(let i = 0; i < grid.length; i++) {
      //if the current slot has a value inside...
      if(grid[i][col] != null) {
        //store its value, and make that slot null.
        let value = grid[i][col];
        grid[i][col] = null;
        let index = i - 1;
        /*loop downwards until you either hit the beginning of the row or you hit
        a non-null value.*/
        while(index >= 0 && grid[index][col] == null) {
          //decrease index
          index--;
        }
        grid[index+1][col] = value;
      }
    }
  }
//  boop();
  addScore();
  spawnRandomTile();
  updateGrid();
  if(checkLoss(grid)) {
    playable = false;
  }
}

const moveDown = () => {
  if (playable == false){
    console.log(`Game is currently not playable. Either a loss or win was recorded.`);
    return;
  }
  for(let col = 0; col < 4; col++) {
    //keeps track of amount of merges, and keeps you from combining with something that's already been combined
    let merges = 0;
    let i = 2;
    while(i >= 0) {
      let value = grid[i][col];
      let index = i + 1;
      while(index < (grid.length-1) - merges && grid[index][col] == null) {
        index++;
      }
      if(grid[index][col] == grid[i][col] && grid[index][col] != null) {
        //change the number you hit to 2x its value
        grid[index][col] = value*2;
        scoreAdd = value*2;
        score += scoreAdd;
        //remove the starter number, it will now be merged into set[index]
        grid[i][col] = null;
        //increase merges so that we don't check a slot we already merged
        merges = i;
      }
      i--;
    }

    //handles moving the tiles correctly
    for(let i = grid.length - 1; i >= 0; i--) {
      //if the current slot has a value inside...
      if(grid[i][col] != null) {
        //store its value, and make that slot null.
        let value = grid[i][col];
        grid[i][col] = null;
        let index = i + 1;
        /*loop downwards until you either hit the beginning of the row or you hit
        a non-null value.*/
        while(index <= 3 && grid[index][col] == null) {
          //decrease index
          index++;
        }
        grid[index-1][col] = value;
      }
    }
  }
//  boop();
  addScore();
  spawnRandomTile();
  updateGrid();
  if(checkLoss(grid)) {
    playable = false;
  }
}

const moveLeft = () => {
  if (playable == false){
    console.log(`Game is currently not playable. Either a loss or win was recorded.`);
    return;
  }
  //loop through each row
  for(let row of grid) {
    mergeTiles(row, "left");
    //loop through each value in row, starting from the leftmost.
    for(let i = 0; i < row.length; i++) {
      //if the current slot has a value inside...
      if(row[i] != null) {
        //store its value, and make that slot null.
        let value = row[i];
        row[i] = null;
        let index = i - 1;
        /*loop downwards until you either hit the beginning of the row or you hit
        a non-null value.*/
        while(index >= 0 && row[index] == null) {
          //decrease index
          index--;
        }
        row[index+1] = value;
      }
    }
  }
//  boop();
  spawnRandomTile();
  updateGrid();
  if(checkLoss(grid)) {
    playable = false;
  }
}

const moveRight = () => {
  if (playable == false){
    console.log(`Game is currently not playable. Either a loss or win was recorded.`);
    return;
  }
  for(let row of grid) {
    mergeTiles(row, "right");
    //loop through each value in row, starting from the rightmost.
    for(let i = row.length - 1; i >= 0; i--) {
      if(row[i] != null) {
        let value = row[i];
        row[i] = null;
        let index = i + 1;
        while(index <= 3 && row[index] == null) {
          index++;
        }
        row[index-1] = value;
      }
    }
  }
//  boop();
  spawnRandomTile();
  updateGrid();
  if(checkLoss(grid)) {
    playable = false;
  }
}
//we might have to have a separate function to get the array for merged tiles first
const mergeTiles = (set, direction) => {
  if(direction == "left") {
    //i is set to 1 so that the first value you look at has a slot next to it
    let i = 1;
    //will count the # of merges done
    let merges = 0;
    while(i < set.length) {
      //look at the next closest slot to the current one
      let index = i - 1;
      let value = set[i];
      //if the slot to the right isn't a number, continue till you hit one/hit the end
      while(index > merges && set[index] == null) {
        index--;
      }
      //if the number you hit is the same as the number at set[i]
      if(set[index] == set[i] && set[index] != null) {
        //change the number you hit to 2x its value
        set[index] = value*2;
        scoreAdd = value*2;
        score += scoreAdd;
        console.log(scoreAdd);
        //remove the starter number, it will now be merged into set[index]
        set[i] = null;
        //increase merges so that we don't check a slot we already merged
        merges = i;
        //beep();
      }
      //increment
      i++;
    }
    //return the new, unmoved array
    addScore();
    return set;
  }
  else {
    //i is set to 1 so that the first value you look at has a slot next to it
    let i = 2;
    //will count the # of merges done
    let merges = 0;
    while(i >= 0) {
      //look at the next closest slot to the current one
      let index = i + 1;
      let value = set[i];
      //if the slot to the right isn't a number, continue till you hit one/hit the end
      while(index < (set.length-1) - merges && set[index] == null) {
        index++;
      }
      //if the number you hit is the same as the number at set[i]
      if(set[index] == set[i] && set[index] != null) {
        //change the number you hit to 2x its value
        set[index] = value*2;
        scoreAdd = value*2;
        score += scoreAdd;
        console.log(scoreAdd);
        //remove the starter number, it will now be merged into set[index]
        set[i] = null;
        //increase merges so that we don't check a slot we already merged
        merges = i;
      }
      //increment
      i--;
    }
    //return the new, unmoved (but combined) array
    addScore();
    return set;
  }
}
//only bug left is that, when a column is full and the 2 middle numbers are equal to the last number in the grid, they'll all 3 combine. ONLY WHEN YOU MOVE DOWN
//I think this has to do with the merges workaround only ignoring the value in the first slot, and not the value in the 2nd or the 3rd slots

//takes one parameter, which should be a 2d array, and checks to see if the current state of the arr results in a loss
const checkLoss = (arr) => {

  //check to see if there are any spaces without values in them
  for(let row of arr) {
    if(row.includes(null)){
      return false;
    }
  }
  //next, we need to see if any of the slots have at least 1 similar number next to them
  let lossArrs = [[arr[0][0], arr[1][0], arr[0][1]], ]
  for(let r = 0; r < arr.length; r++) {
    let tempArr = [];
    for(let c = 0; c < arr[r].length; c++) {
      let current = arr[r][c];
      let leftValue;
      let rightValue;
      let topValue;
      let bottomValue;

      try {
        leftValue = arr[r][c-1];
      }
      catch(e) {
        leftValue = undefined;
      }

      try {
        rightValue = arr[r][c+1];
      }
      catch(e) {
        leftValue = undefined;
      }

      try {
        topValue = arr[r-1][c];
      }
      catch(e) {
        topValue = undefined;
      }

      try {
        bottomValue = arr[r+1][c];
      }
      catch(e) {
        bottomValue = undefined;
      }

      if(current == leftValue && leftValue != undefined) {
        return false;
      }
      if(current == rightValue && rightValue != undefined) {
        return false;
      }
      if(current == topValue && topValue != undefined) {
        return false;
      }
      if(current == bottomValue && bottomValue != undefined) {
        return false;
      }

    }
  }
  gameMessage.innerHTML= "Loss";
  return true;
}

module.exports = {
  createGrid,
  updateGrid,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  mergeTiles,
  spawnRandomTile,
  getGrid,
  changeTile,
  checkLoss,
  addScore,
};
