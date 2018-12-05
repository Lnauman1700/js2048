const {
  createGrid,
  updateGrid,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  mergeTiles,
  spawnRandomTile,
  getGrid,

} = require("./main");

describe('createGrid()', () => {

  test('should create a 2d array with 4 inner arrays which all have null values', () => {
    expect(createGrid()).toEqual([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]);
  });

});

describe('updateGrid()', () => {

  test('should create a table with all text nodes that have no visible text values inside', () => {
    createGrid();
    updateGrid();
    let slots = document.querySelectorAll('td');
    let tf = true;
    for(let entry of slots) {
      if(entry.innerText != undefined) {
        tf = false;
      }
    }
    expect(tf).toBe(true);
  });

  test('should create a table with 16 slots, or tds', () => {
    createGrid();
    updateGrid();
    let slots = document.querySelectorAll('td');
    expect(slots.length).toBe(16);
  });

});

describe('moveUp()', () => {

  test('moves a single tile up, so that it appears in the top row.', () => {
    createGrid();
    spawnRandomTile();
    updateGrid();

    moveUp();
    updateGrid();
    let current = getGrid();
    let row = current[0];
    let tf = false;
    for(let entry of row) {
      if(typeof entry == 'number') {
        tf = true;
      }
    }
    expect(tf).toBe(true);

  });
});
