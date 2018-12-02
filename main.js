
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
