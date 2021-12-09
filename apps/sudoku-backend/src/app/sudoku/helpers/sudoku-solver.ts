// given a sudoku cell, returns the row
function returnRow(cell: number) {
  return Math.floor(cell / 9);
}

// given a sudoku cell, returns the column
function returnCol(cell: number) {
  return cell % 9;
}

// given a sudoku cell, returns the 3x3 block
function returnBlock(cell: number) {
  return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}

// given a number, a row and a sudoku, returns true if the number can be placed in the row
function isPossibleRow(number: number, row: number, sudoku: number[]) {
  for (let i=0; i<=8; i++) {
    if (sudoku[row*9+i] == number) {
      return false;
    }
  }
  return true;
}

// given a number, a column and a sudoku, returns true if the number can be placed in the column
function isPossibleCol(number: number, col: number, sudoku: number[]) {
  for (let i=0; i<=8; i++) {
    if (sudoku[col+9*i] == number) {
      return false;
    }
  }
  return true;
}


// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
function isPossibleBlock(number: number, block: number, sudoku: number[]) {
  for (let i=0; i<=8; i++) {
    if (sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)] == number) {
      return false;
    }
  }
  return true;
}

function isPossibleDiag(number:number, cell:number, sudoku:number[]) {

  if(cell % 10 == 0 || cell ==0) {

    for(let f = 0; f<9 ;f++){

      if(sudoku[f+9*f]==number) {
        return false;
      }
    }

  } else if(cell % 8 == 0 && cell != 80) {
    for(let f = 0; f<9 ;f++){
      const x = 8-f;
      if(sudoku[x+9*f]==number){
        return false;
      }
    }
  }

 return true;

}


// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
function isPossibleNumber(cell: number, number: number, sudoku: number[], type:string) {
  const row = returnRow(cell);
  const col = returnCol(cell);
  const block = returnBlock(cell);
  if(type =='diagonal') return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku)
    && isPossibleBlock(number,block,sudoku) && isPossibleDiag(number,cell,sudoku);

  return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku)
    && isPossibleBlock(number,block,sudoku);
}

// given a row and a sudoku, returns true if it's a legal row
function isCorrectRow(row: number, sudoku: number[]) {
  const rightSequence = new Array<number>(1,2,3,4,5,6,7,8,9);
  const rowTemp= new Array<number>();
  for (let i=0; i<=8; i++) {
    rowTemp[i] = sudoku[row*9+i];
  }
  rowTemp.sort();
  return rowTemp.join() == rightSequence.join();
}

// given a column and a sudoku, returns true if it's a legal column
function isCorrectCol(col: number, sudoku: number[]) {
  const rightSequence = new Array<number>(1,2,3,4,5,6,7,8,9);
  const colTemp= new Array<number>();
  for (let i=0; i<=8; i++) {
    colTemp[i] = sudoku[col+i*9];
  }
  colTemp.sort();
  return colTemp.join() == rightSequence.join();
}

// given a 3x3 block and a sudoku, returns true if it's a legal block
function isCorrectBlock(block: number,sudoku: number[]) {
  const rightSequence = new Array<number>(1,2,3,4,5,6,7,8,9);
  const blockTemp= new Array<number>();
  for (let i=0; i<=8; i++) {
    blockTemp[i] = sudoku[Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)];
  }
  blockTemp.sort();
  return blockTemp.join() == rightSequence.join();
}


function isSolvedSudoku(sudoku: number[]) {
  for (let i=0; i<=8; i++) {
    if (!isCorrectBlock(i,sudoku) || !isCorrectRow(i,sudoku) || !isCorrectCol(i,sudoku)) {
      return false;
    }
  }

  return true;

}

// given a cell and a sudoku, returns an array with all possible values we can write in the cell
function determinePossibleValues(cell: number, sudoku: number[], type:string) {
  const possible = new Array<number>();
  for (let i=1; i<=9; i++) {
    if (isPossibleNumber(cell,i,sudoku, type)) {
      possible.unshift(i);
    }
  }
  return possible;
}

// given an array of possible values assignable to a cell, returns a random value picked from the array
function determineRandomPossibleValue(possible: number[][], cell: number) {
  const randomPicked = Math.floor(Math.random() * possible[cell].length);
  return possible[cell][randomPicked];
}

// given a sudoku, returns a two dimension array with all possible values
function scanSudokuForUnique(sudoku: number[], type:string): number[][] {
  const possible = new Array<Array<number>>();
  for (let i=0; i<=80; i++) {
    if (sudoku[i] == 0) {
      possible[i] = new Array<number>();
      possible[i] = determinePossibleValues(i,sudoku, type);
      if (possible[i].length==0) {
        return null;
      }
    }
  }
  return possible;
}

// given an array and a number, removes the number from the array
function removeAttempt(attemptArray: number[], number: number) {
  const newArray = new Array<number>();
  for (let i=0; i<attemptArray.length; i++) {
    if (attemptArray[i] != number) {
      newArray.unshift(attemptArray[i]);
    }
  }
  return newArray;
}

// given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
function nextRandom(possible: number[][]) {
  let max = 9;
  let minChoices = 0;
  for (let i=0; i<=80; i++) {
    if (possible[i]!=undefined) {
      if ((possible[i].length<=max) && (possible[i].length>0)) {
        max = possible[i].length;
        minChoices = i;
      }
    }
  }
  return minChoices;
}

export function sudokuArrayTo2DArray(sudoku: number[]): number[][] {
  const sudoku2D: number[][] = [];
  for(let x = 0; x < 9; x++) {
    sudoku2D[x] = [];
    for(let y = 0; y < 9; y++) {
      sudoku2D[x][y] = sudoku[x*9 + y];
    }
  }
  return sudoku2D;
}

export function solveSudoku(sudoku: number[], type:string) {
  const saved = new Array<Array<Array<number>>>();
  const savedSudoku = new Array<Array<number>>();
  let nextMove: number[][];
  let whatToTry: number;
  let attempt: number;
  while(!isSolvedSudoku(sudoku)) {
    nextMove = scanSudokuForUnique(sudoku, type);
    if(!nextMove) {
      nextMove = saved.pop();
      sudoku = savedSudoku.pop();
    }
    whatToTry = nextRandom(nextMove);
    attempt = determineRandomPossibleValue(nextMove, whatToTry);
    if(nextMove[whatToTry].length > 1) {
      nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt);
      saved.push(nextMove.slice());
      savedSudoku.push(sudoku.slice());
    }
    sudoku[whatToTry] = attempt;
  }
  return sudoku;
}
