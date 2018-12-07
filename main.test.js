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
  checkLoss,
  addScore,

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
    createGrid();
    changeTile(0,0,2);
    let currentGrid = getGrid();
    expect(checkLoss(currentGrid)).toBe(false);
  });
  /*test('when the board is full but like tiles are next to eachother, checkLoss() returns false', () => {
    createGrid();
    for(let i = 0; i < 4; i++) {
      for(let n = 0; n < 4; i++) {
        changeTile(i,n,2)
      }
    }
    let currentGrid = getGrid();
    expect(checkLoss(currentGrid)).toBe(false);
  });*/
  test('when the board is completely empty, return false', () => {
    createGrid();
    let grid = getGrid();
    expect(checkLoss(grid)).toBe(false);
  });
  test('when the board is full and there are no like tiles next to eachother, checkLoss(grid) returns true', () => {
    createGrid();
    let value = 1;
    for(let i = 0; i < 4; i++) {
      for(let n = 0; n < 4; n++) {
        changeTile(i,n,value);
        value++;
      }
    }
    expect(checkLoss(getGrid())).toBe(true);
  });
});

describe('getGrid()', () => {

  test('accurately displays the current state of the grid array after no changes have been made', () => {
    createGrid();
    expect(getGrid()).toEqual([
      [null,null,null,null],
      [null,null,null,null],
      [null,null,null,null],
      [null,null,null,null]
    ])
  });
  test('accurately displays the current state of the grid array after specific tiles have been placed', () => {
    createGrid();
    changeTile(0,0,2);
    changeTile(0,1,2);
    expect(getGrid()).toEqual([
      [2,2,null,null],
      [null,null,null,null],
      [null,null,null,null],
      [null,null,null,null]
    ]);
  });
});

describe('changeTile()', () => {
  test('returns the value that was sent in to the grid', () => {
    createGrid();
    expect(changeTile(0,0,2)).toEqual(2);
  });
  test('changes the grid in the specified slot, to the specified value', () => {
    createGrid();
    changeTile(0,0,2);
    expect(getGrid()).toEqual([
      [2,null,null,null],
      [null,null,null,null],
      [null,null,null,null],
      [null,null,null,null]
    ]);
  });
});
