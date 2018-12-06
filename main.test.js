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
  changeTile,
  addScore,
} = require("./main");

describe ('addScore()', ()=>{
  test('When tiles merge, the merged tile sum should be added to the score',()=>{
    expect(addScore(10,16)).toEqual(26);
    expect(addScore(null,64)).toEqual(64);
  });
});

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

  test('combines 2 adjacent slots going up', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(1,0,2);
    moveUp();
    let current = getGrid();

    expect(current[0][0]).toBe(4);
  });

  test('combines 2 non-adjacent slots going up', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(3,0,2);
    moveUp();
    let current = getGrid();

    expect(current[0][0]).toBe(4);
  });

  test('doesnt combine 2 unreleated numbers with eachother', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(1,0,4);
    moveUp();
    let current = getGrid();

    expect(current[0][0]).toBe(2);
  });

  test('doesnt combine a newly-combined slot with an equal-numbered slot', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(1,0,2);
    changeTile(2,0,4);
    moveUp();
    let current = getGrid();

    expect(current[0][0]).toBe(4);
  });

  test('combines a full row of same-numbered slots into 2 new slots of the same value', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(1,0,2);
    changeTile(2,0,2);
    changeTile(3,0,2);
    moveUp();
    let current = getGrid();

    expect(current[0][0]).toBe(4) && expect(current[1][0]).toBe(4);
  });
});

describe('moveRight()', () => {

  test('moves a single tile right, so that it appears in the righmost column.', () => {
    createGrid();
    changeTile(1,0,4);
    updateGrid();

    moveRight();
    let current = getGrid();
    expect(current[1][3]).toBe(4);
  });

  test('combines 2 adjacent slots going right', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,2);
    moveRight();
    let current = getGrid();

    expect(current[0][3]).toBe(4);
  });

  test('combines 2 non-adjacent slots going right', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,2,2);
    moveRight();
    let current = getGrid();

    expect(current[0][3]).toBe(4);
  });

  test('doesnt combine 2 unreleated numbers with eachother', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,4);
    moveRight();
    let current = getGrid();

    expect(current[0][3]).toBe(4) && expect(current[0][2]).toBe(2);
  });

  test('doesnt combine a newly-combined slot with an equal-numbered slot', () => {
    createGrid();
    changeTile(0,2,2);
    changeTile(0,3,2);
    changeTile(0,0,4);
    moveRight();
    let current = getGrid();

    expect(current[0][3]).toBe(4) && expect(current[0][2]).toBe(4);
  });

  test('combines a full row of same-numbered slots into 2 new slots of the same value', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,2);
    changeTile(0,2,2);
    changeTile(0,3,2);
    moveRight();
    let current = getGrid();

    expect(current[0][3]).toBe(4) && expect(current[0][2]).toBe(4);
  });
});

describe('moveDown()', () => {

  test('moves a single tile down, so that it appears in the bottom row.', () => {
    createGrid();
    spawnRandomTile();
    updateGrid();

    moveDown();
    updateGrid();
    let current = getGrid();
    let row = current[3];
    let tf = false;
    for(let entry of row) {
      if(typeof entry == 'number') {
        tf = true;
      }
    }
    expect(tf).toBe(true);
  });

  test('combines 2 adjacent slots going down', () => {
    createGrid();
    changeTile(2,0,2);
    changeTile(3,0,2);
    moveDown();
    let current = getGrid();

    expect(current[3][0]).toBe(4);
  });

  test('combines 2 non-adjacent slots going down', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(3,0,2);
    moveDown();
    let current = getGrid();

    expect(current[3][0]).toBe(4);
  });

  test('doesnt combine 2 unreleated numbers with eachother', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(1,0,4);
    moveDown();
    let current = getGrid();

    expect(current[3][0]).toBe(4);
  });

  test('doesnt combine a newly-combined slot with an equal-numbered slot', () => {
    createGrid();
    changeTile(2,0,2);
    changeTile(3,0,2);
    changeTile(0,0,4);
    moveDown();
    let current = getGrid();

    expect(current[3][0]).toBe(4);
  });

  test('combines a full row of same-numbered slots into 2 new slots of the same value', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(1,0,2);
    changeTile(2,0,2);
    changeTile(3,0,2);
    moveDown();
    let current = getGrid();

    expect(current[3][0]).toBe(4) && expect(current[2][0]).toBe(4);
  });
});

describe('moveLeft()', () => {

  test('moves a single tile left, so that it appears in the leftmost column.', () => {
    createGrid();
    changeTile(0,3,4);
    updateGrid();

    moveLeft();
    let current = getGrid();
    expect(current[0][0]).toBe(4);
  });

  test('combines 2 adjacent slots going right', () => {
    createGrid();
    changeTile(0,2,2);
    changeTile(0,3,2);
    moveLeft();
    let current = getGrid();

    expect(current[0][0]).toBe(4);
  });

  test('combines 2 non-adjacent slots going right', () => {
    createGrid();
    changeTile(0,1,2);
    changeTile(0,3,2);
    moveLeft();
    let current = getGrid();

    expect(current[0][0]).toBe(4);
  });

  test('doesnt combine 2 unreleated numbers with eachother', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,4);
    moveLeft();
    let current = getGrid();

    expect(current[0][1]).toBe(4) && expect(current[0][0]).toBe(2);
  });

  test('doesnt combine a newly-combined slot with an equal-numbered slot', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,2);
    changeTile(0,3,4);
    moveLeft();
    let current = getGrid();

    expect(current[0][0]).toBe(4) && expect(current[0][1]).toBe(4);
  });

  test('combines a full row of same-numbered slots into 2 new slots of the same value', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,2);
    changeTile(0,2,2);
    changeTile(0,3,2);
    moveLeft();
    let current = getGrid();

    expect(current[0][0]).toBe(4) && expect(current[0][1]).toBe(4);
  });
});

describe('mergeTiles()', () => {

  test('correctly merges tiles in a chain going left', () => {
    createGrid();
    changeTile(0,0,4);
    changeTile(0,1,2);
    changeTile(0,2,2);
    changeTile(0,3,2);
    let preMerge = getGrid();
    mergeTiles(preMerge[0], "left");
    let postMerge = getGrid();
    expect(postMerge[0]).toEqual([4,4,null,2]);
  });
  test('correctly merges tiles in a chain going right', () => {
    createGrid();
    changeTile(0,0,4);
    changeTile(0,1,2);
    changeTile(0,2,2);
    changeTile(0,3,2);
    let preMerge = getGrid();
    mergeTiles(preMerge[0], "right");
    let postMerge = getGrid();
    expect(postMerge[0]).toEqual([4,2,null,4]);
  });
});

describe('checkLoss()', () => {

  test('when the board is not full, checkLoss() returns false', () => {

  });
  test('when the board is full but like tiles are next to eachother, checkLoss() returns false', () => {

  });
  test('when the board is full and there are no like tiles next to eachother, checkLoss() returns true', () => {

  });
});
