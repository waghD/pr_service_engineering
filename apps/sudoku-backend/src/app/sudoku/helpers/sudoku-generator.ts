export class SudokuGenerator {

  sudoku: number[][];

  size:number;

  sizeMatrix:number;

  empty:number;

  constructor(size:number, empty:number) {
  this.size =size;
  this.empty = empty;
  this.sizeMatrix = Math.sqrt(size);
  this.sudoku = [];

    for (let i = 0; i < this.size; i++) {
      this.sudoku[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.sudoku[i][j] = 0;
      }
    }
  }

  generate_sudoku():number[][] {
    this.fillDiagonal();
    this.filltheRest(0,this.sizeMatrix);
    return this.sudoku;
  }

  fillDiagonal(){

    for(let i = 0;i<this.size; i++){
      this.fillMatrix(i,i);

    }

  }

  fillMatrix(x:number,y:number){
      let num = 0;
    for(let i= 0; i<this.sizeMatrix;i++){
      for(let j=0;j<this.sizeMatrix;j++) {
          while(this.unUsedInMatrix(y,x,num)){
              num = this.rNG(num);
          }
          this.sudoku[x+i][y+j] = num;
      }
      }

  }

  rNG(num:number):number{
    return Math.floor((Math.random()*num+1));
  }

  unUsedInMatrix(y:number,x:number,num:number):boolean{
    for(let i= 0; i<this.sizeMatrix;i++){
       for(let j=0;j<this.sizeMatrix;j++){
         if(this.sudoku[y+i][x+j] == num){
           return false;
         }

       }
    }
    return true;
  }

  unUsedinRow(y:number, num:number):boolean{

    for(let i =0; i<this.size;i++){
      if(this.sudoku[y][i]==num){

        return false;
      }
      }
      return true;
    }

    unUsedinColumn(x:number,num:number):boolean{
      for(let i =0; i<this.size;i++){
        if(this.sudoku[i][x]==num){
          return false;
        }
      }
      return true;
    }

    checkifSafe(y:number,x:number,num:number) {
      return (this.unUsedinRow(y, num) && this.unUsedinColumn(x, num) && this.unUsedInMatrix(y, x, num))

    }


    filltheRest(y:number,x:number):boolean{

    /*
    check if we have reached the end of the row but not the end of the sudoku
    increase row by one so we can fill the last row
     */
     if(x>=this.size&&y<this.size-1){
       y=y+1;
       x=0;
     }
     // check if the whole sudoku has been filled
     if(x>=this.size&&y>=this.size) return true;

     //check if we are in one of the lower rows
      if (y < this.sizeMatrix)
      {
        /*
        if we are also in one of the lower columns
        fille the row with size Matrix.
         */
        if (x < this.sizeMatrix)
          x = this.sizeMatrix;
      }
      // else check if we are in the middle rows
      else if (y < this.size-this.sizeMatrix)
      {
        /*
        check if we hit a diagonal matrix
        if so increase column by size matrix
         */
        if (x ==(y/this.sizeMatrix)*this.sizeMatrix)
          x =  x + this.sizeMatrix;
      } else
      {
        /*
        check if we are in a middle column
        if so reset column and increase row
         */
        if (x == this.size-this.sizeMatrix)
        {
          y = y + 1;
          x = 0;
          if (y>=this.size)
            return true;
        }
      }

      for (let num = 1; num<=this.size; num++)
      {
        if (this.checkifSafe(y, x, num))
        {
          this.sudoku[y][x] = num;
          if (this.filltheRest(y, x))
            return true;
          this.sudoku[y][x] = 0;
        }
      }
      return false;

    }

    remove_solution():number[][]{
    let count:number = this.empty;
    while(count != 0){
       const field:number= this.rNG(this.size*this.size) -1;
       const i = field/this.size;
       let j:number = field%9;
       if (j != 0)
        j = j - 1;
      if (this.sudoku[i][j] != 0)
      {
        count--;
        this.sudoku[i][j] = 0;
      }

    }
    return  this.sudoku;
     }


}
