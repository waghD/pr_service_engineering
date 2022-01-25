function rNG(size: number): number {
  const num = (Math.random() * size);
  return Math.round(num);
}


export function removeSolution(sudoku: number[], target: number): number[] {
  let count: number = 9*9;
  while (count >= target) {
    const field: number = rNG(sudoku.length);
    if(field < sudoku.length) {
      sudoku[field] = 0;
      count--;
    }
  }
  return sudoku;
}

