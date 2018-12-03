
let grid = [];

//fills grid with all null values.
const createGrid = () => {
  for(let i = 0; i < 4; i++) {
    let row = [];
    for(let n = 0; n < 4; n++) {
      row.push(null);
    }
    grid.push(row);
  }
}
createGrid();

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
}

updateGrid();
//End initialize Game

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
  let randomcol= Math.floor((Math.random()*4));
  let randomrow= Math.floor((Math.random()*4));
  let tiles= [2,4];
  let newTile= tiles[Math.floor(Math.random()*tiles.length)];
  updateGrid();
    while (!grid[randomcol][randomrow] == null) {
      console.log("Space not available. Rolling again.");
      randomcol= Math.floor((Math.random()*4));
      randomrow= Math.floor((Math.random()*4));
    }
    console.log(`grid([${randomrow}][${randomcol}])`);
    grid[randomrow][randomcol]= newTile;
    updateGrid();
}

//Movement
const moveUp = () => {
  for(let col = 0; col < 4; col++) {

    for(let i = 0; i < grid.length; i++) {
      if(grid[i][col] != null) {
        let value = grid[i][col];
        grid[i][col] = null;
        let index = i - 1;

        while(index >= 0 && grid[index][col] == null) {
          index--;
        }

        grid[index+1][col] = value;
      }
    }
  }
  updateGrid();
}

const moveDown = () => {
  for(let col = 0; col < 4; col++) {

    for(let i = grid.length - 1; i >= 0; i--) {
      //grid[i][col];
      if(grid[i][col] != null) {
        let value = grid[i][col];
        grid[i][col] = null;
        let index = i + 1;

        while(index <= 3 && grid[index][col] == null) {
          index++;
        }

        grid[index-1][col] = value;
      }
    }
  }
  updateGrid();
}

const moveLeft = () => {
  //loop through each row
  for(let row of grid) {
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
        //replace the value at index+1 (should be null) with the stored value.
        row[index+1] = value;
      }
    }
  }
  updateGrid();
}

const moveRight = () => {
  for(let row of grid) {
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
  updateGrid();
}
module.exports = {
  createGrid,
  updateGrid,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
};
