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

function isPossibleSquare(number: number, block: number, sudoku: number[], row:number, col:number){
  if ( row == 0|| col == 0 || row == 8 || col ==8) return true ;
  if(row == 3 || row == 6) block = block-3;
  if(col == 3) block = block -1;
  if(col == 5) block = block +1;
  const possibleblocks = [0,2,6,8]
  if(possibleblocks.includes(block)){
    let x = 0;
    if(block == 0) x = 10;
    if(block == 2) x= 8;
    if( block == 6) x = -8;
    if(block == 8) x = -10;
    for(let i=0;i<=8;i++){
      if(sudoku[(Math.floor(block/3)*27+i%3+9*Math.floor(i/3)+3*(block%3)+x)]==number){
        return false;
      }
    }
  }
  return true;
}

function generateColourRegion(colours:number []) {
  const blocks = [0,2,6,8]
  const possible_colours = shuffle([1,2,3,4])
  for(const y of blocks){
    let x = 0;
    if(y == 0) x = 10;
    if(y == 2) x= 8;
    if(y == 6) x =-8;
    if(y == 8) x =-10;
    const colour = possible_colours.pop()
    for(let i=0;i<=8;i++){
     colours[(Math.floor(y/3)*27+i%3+9*Math.floor(i/3)+3*(y%3)+x)] = colour
    }
  }
  return colours;
}


function returnColour(cell:number,number:number,colours:number [] ,possibleColours: number[] []){
   let i = Math.round(Math.random() * (possibleColours[number].length-1));
   let x = possibleColours[number].length -1;
   while (!isPossibleColour(cell,possibleColours[number][i],colours) && x>=0){
      i = x;
      x--;
   }
  return possibleColours[number][i];
}

function removeColour(number:number,colour:number,possibleColours: number[] []){
      const colours = new Array<number>();
      for(let x = 0; x<possibleColours[number].length;x++){
        if(possibleColours[number][x]!= colour){
          colours.push(possibleColours[number][x]);
        }

      }
      return colours;
}

function isPossibleColour(cell:number,colour:number,colours:number[]){

  if(cell-9 >=0 && colours[cell-9] == colour){
    return false;
  } else if(cell+9 <81 && colours[cell+9] == colour){
    return false;
  } else if(cell-1 >=0 && colours[cell-1] == colour){
    return false;
  } else if (cell+1 <81 && colours[cell+1] == colour){
    return false;
  }

  return true;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  if(type =='diagonal') {
    return isPossibleRow(number, row, sudoku) && isPossibleCol(number, col, sudoku)
      && isPossibleBlock(number, block, sudoku) && isPossibleDiag(number, cell, sudoku);
  } else if (type == 'region'){
    return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku)
      && isPossibleBlock(number,block,sudoku)&& isPossibleSquare(number,block,sudoku,row,col);
  } else {
    return isPossibleRow(number,row,sudoku) && isPossibleCol(number,col,sudoku)
      && isPossibleBlock(number,block,sudoku);
  }

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

function  generateColours(){
  const possible = new Array<Array<number>>();
  for (let i = 0; i<9;i++){
    possible[i] = new Array<number>();
    possible[i] = shuffle([1,2,3,4,5,6,7,8,9]);
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

export function solveRegionSudoku(sudoku: number[],colours:number[], type:string){
  const coloursudoku = new ColourSudoku();
  coloursudoku.sudoku = solveSudoku(sudoku,type);
  coloursudoku.colours = generateColourRegion(colours);
  return coloursudoku;
}



export function solveColourSudoku(sudoku: number[], colours:number[] ,type:string) {
  const saved = new Array<Array<Array<number>>>();
  const savedSudoku = new Array<Array<number>>();
  let nextMove: number[][];
  let whatToTry: number;
  let attempt: number;
  const coloursudoku = new ColourSudoku();
  coloursudoku.colours = colours;
  coloursudoku.sudoku = sudoku;
  const possiblecolours = generateColours();
  while(!isSolvedSudoku(coloursudoku.sudoku)) {
    nextMove = scanSudokuForUnique(coloursudoku.sudoku, type);
    if(!nextMove) {
      nextMove = saved.pop();
      coloursudoku.sudoku = savedSudoku.pop();
    }
    whatToTry = nextRandom(nextMove);
    attempt = determineRandomPossibleValue(nextMove, whatToTry);
    if(nextMove[whatToTry].length > 1) {
      nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt);
      saved.push(nextMove.slice());
      savedSudoku.push(coloursudoku.sudoku.slice());
    }
      coloursudoku.sudoku[whatToTry] = attempt;
      coloursudoku.colours[whatToTry] = returnColour(whatToTry,(attempt-1),coloursudoku.colours,possiblecolours);
      possiblecolours[attempt-1] = removeColour((attempt-1),coloursudoku.colours[whatToTry],possiblecolours);
  }
    return coloursudoku;
}


class ColourSudoku{

  sudoku : number[]
  colours: number[]

}
