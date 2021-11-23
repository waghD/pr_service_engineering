import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { ClassicGameService } from '../classic-game/classic-game.service';

@Component({
  selector: 'se-sudoku-diagonal-game',
  templateUrl: './diagonal-game.component.html',
  styleUrls: ['./diagonal-game.component.scss']
})
export class DiagonalGameComponent implements OnInit {

  // 0  = white
  // 1  = restOfColumnRow
  // -1 = error

  sudokuAPIData: SudokuEntity;
  cacheGrid: number[][];
  highlightGrid: number[][];
  emptyGrid: number[][];
  gridForm: FormGroup;

  constructor(private classicGameService: ClassicGameService) {
    this.sudokuAPIData = new SudokuEntity(-1, '', '', []); //dummy data for variable instance

    this.highlightGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    this.cacheGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    this.emptyGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]];

    this.gridForm = new FormGroup({});
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.gridForm.addControl(`cell${i}${j}`, new FormControl(''));
      }
    }
  }

  ngOnInit(): void {

    /***
     * Fills the sudokuGrid with data specified from a SudokuEntity
     * @param gridData the SudokuEntity which yields the fields
     */
    const fillGridWithData = (gridData: SudokuEntity) => {
      for (const field of gridData.fields) {
        const newVal = {};
        // necessary due to inconvenience, maybe there is a better solution...?
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        newVal[`cell${field.x}${field.y}`] = field.value > 0 ? field.value : '';
        this.gridForm.patchValue(newVal);
      }
    };

    // gets a new sudoku
    this.classicGameService.getNewRandomSudoku().subscribe((gridData) => {
      this.sudokuAPIData = gridData;
      fillGridWithData(gridData);
    });

  }

  saveGrid() {
    // do stuff
    console.log(this.gridForm.value);
  }

  focusOutFunction(): void {
    // parses all filled fields and caches them in the cacheGrid variable
    Object.entries(this.gridForm.value).forEach(([key, value]) => {
      //get cell idx of 'cellXY'
      const x: number = parseInt(key.charAt(4));
      const y: number = parseInt(key.charAt(5));

      //check if cell contains value
      if (value) {
        let val = -1;
        if (typeof value === 'string') {
          val = parseInt(value);
        } else if (typeof value === 'number') {
          val = value;
        }


        if (val !== -1) {
          this.cacheGrid[y][x] = val;
        } else {
          console.error('Something wrong happened with the user input: ' + typeof val);
        }
      } else {
        // cell contains no (longer a) value, update the cache
        this.cacheGrid[y][x] = 0;
      }
    });


    // check validity

    /***
     * Checks whether a given array has duplicates
     * @param array the number[] which should be checked
     */
    function hasDuplicates(array: number[]) {
      const map = array.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      for (const [key, value] of map.entries()) {
        if (key !== 0 && value > 1) {
          return true;
        }
      }
      return false;
    }

    const ERROR_BACKGROUND_CSS_CLASSNAME = 'error-background';

    // ###################################################
    // ###### check and highlight duplicates in rows #####
    // ###################################################

    for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
      const rowDomElement = document.getElementsByClassName('row-nr-' + rowIdx);

      if (hasDuplicates(this.cacheGrid[rowIdx])) {
        //found a duplicate in the row, add error class
        console.warn('Duplicate in row ' + (rowIdx + 1) + '!');
        rowDomElement[0].classList.add(ERROR_BACKGROUND_CSS_CLASSNAME);
      } else {
        // if no error, remove (previous) error class
        rowDomElement[0].classList.remove(ERROR_BACKGROUND_CSS_CLASSNAME);
      }
    }

    // #################################################################
    // ########### check and highlight duplicates in columns ###########
    // #################################################################

    for (let x = 0; x < this.cacheGrid.length; x++) {
      const colArr = [];
      for (let y = 0; y < this.cacheGrid.length; y++) {
        colArr.push(this.cacheGrid[y][x]);
      }

      // row selector
      const rowsDomElements = document.getElementsByClassName('grid-row');

      //check if array has duplicates
      if (hasDuplicates(colArr)) {
        console.warn('Duplicate in column ' + (x + 1) + '!');
        for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
          const cellNodes = rowsDomElements[rowIdx].childNodes;
          const currentCellDom = cellNodes[x] as HTMLElement;
          currentCellDom.classList.add(ERROR_BACKGROUND_CSS_CLASSNAME);
        }
      } else {
        // no duplicates, but value could have been deleted, revalidate to no error
        for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
          const cellNodes = rowsDomElements[rowIdx].childNodes;
          const currentCellDom = cellNodes[x] as HTMLElement;
          currentCellDom.classList.remove(ERROR_BACKGROUND_CSS_CLASSNAME);
        }
      }
    }

    // #################################################################
    // ########### check and highlight duplicates in 3x3 box ###########
    // #################################################################

    /***
     * Returns the 3x3 values of a grid, given the start-indices to count from
     * @param startIdxRows the row to start getting the indices
     * @param startIdxCols the column to start getting the indices
     * @param cacheGrid the grid which has the data
     */
    function getBoxValues(startIdxRows: number, startIdxCols: number, cacheGrid: number[][]) {
      const result = {
        'values': [-1, -1],
        'startIdxRows': startIdxRows,
        'startIdxCols': startIdxCols
      };

      const valueArray = [];

      for (let i = startIdxRows; i < (startIdxRows + 3); i++) {
        for (let j = startIdxCols; j < (startIdxCols + 3); j++) {
          valueArray.push(cacheGrid[i][j]);
        }
      }

      result['values'] = valueArray;
      return result;
    }

    // get 3x3 boxes as arrays
    const upperLeftSquare = getBoxValues(0, 0, this.cacheGrid);
    const upperCenterSquare = getBoxValues(0, 3, this.cacheGrid);
    const upperRightSquare = getBoxValues(0, 6, this.cacheGrid);

    const middleLeftSquare = getBoxValues(3, 0, this.cacheGrid);
    const middleCenterSquare = getBoxValues(3, 3, this.cacheGrid);
    const middleRightSquare = getBoxValues(3, 6, this.cacheGrid);

    const lowerLeftSquare = getBoxValues(6, 0, this.cacheGrid);
    const lowerCenterSquare = getBoxValues(6, 3, this.cacheGrid);
    const lowerRightSquare = getBoxValues(6, 6, this.cacheGrid);

    const boxList = [
      upperLeftSquare, upperCenterSquare, upperRightSquare,
      middleLeftSquare, middleCenterSquare, middleRightSquare,
      lowerLeftSquare, lowerCenterSquare, lowerRightSquare
    ];

    // highlight boxes which have duplicates
    boxList.forEach(boxArray => {
      const currentArray = boxArray['values'];
      const startIdxRow = boxArray['startIdxRows'];
      const startIdxCol = boxArray['startIdxCols'];

      /***
       * Highlights a 3x3 box given the start indices of rows and cols
       * @param startIdxRow the row index from which to highlight the next 3 indices
       * @param startIdxCol the column index from which to highlight the next 3 indices
       * @param cssClass the css classname which should be added to the cells, leave empty string to remove error background
       */
      function highlightBox(startIdxRow: number, startIdxCol: number, cssClass: string) {
        for (let i = startIdxRow; i < (startIdxRow + 3); i++) {
          for (let j = startIdxCol; j < (startIdxCol + 3); j++) {
            // get classlist of current cell
            const classNameOfCell = `cell${j}${i}`;
            // get the parent dom element cell for correct styling
            const cellParentNode = document.getElementsByClassName(classNameOfCell)[0].parentElement;
            if (cellParentNode && cellParentNode.parentElement) {
              const cellNodeClassList = cellParentNode.parentElement.classList;
              if (cssClass !== '') {
                cellNodeClassList.add(cssClass);
              } else {
                // no additional css class provided, remove error background of cell
                if (cellNodeClassList.contains(ERROR_BACKGROUND_CSS_CLASSNAME)) {
                  cellNodeClassList.remove(ERROR_BACKGROUND_CSS_CLASSNAME);
                }
              }
            }
          }
        }
      }

      if (hasDuplicates(currentArray)) {
        console.warn('Duplicate in 3x3 ');
        highlightBox(startIdxRow, startIdxCol, ERROR_BACKGROUND_CSS_CLASSNAME);
      } else {
        highlightBox(startIdxRow, startIdxCol, '');
      }
    });

    // #################################################################
    // ########### check and highlight duplicates diagonals ###########
    // #################################################################


    /***
     * Get diagonal values of grid as array
     * @param cacheGrid The whole grid which provides the values
     */
    function getDiagonals(cacheGrid: number[][]) {
      const result: { [id: string]: number[]; } = {
        'upperLeft': [],
        'bottomLeft': []
      };

      for (let i = 0; i < cacheGrid.length; i++) {
        result['upperLeft'].push(cacheGrid[i][i]);
      }

      let colIdx = 8;
      for (let i = 0; i < cacheGrid.length; i++) {
        result['bottomLeft'].push(cacheGrid[i][colIdx]);
        colIdx -= 1;
      }
      return result;
    }

    const diagonalArrays = getDiagonals(this.cacheGrid);

    /***
     * Adds a classname to a single cell
     * @param row the row index of the cell
     * @param col the column index of the cell
     * @param cssClassName the css classname that gets added to the cell
     */
    function highlightField(row: number, col: number, cssClassName: string) {
      // get classlist of current cell
      const classNameOfCell = `cell${row}${col}`;
      // get the parent dom element cell for correct styling
      const cellParentNode = document.getElementsByClassName(classNameOfCell)[0].parentElement;
      if (cellParentNode && cellParentNode.parentElement) {
        const cellNodeClassList = cellParentNode.parentElement.classList;
        if (cssClassName !== '') {
          cellNodeClassList.add(cssClassName);
        } else {
          // no additional css class provided, remove error background of cell
          if (cellNodeClassList.contains(ERROR_BACKGROUND_CSS_CLASSNAME)) {
            cellNodeClassList.remove(ERROR_BACKGROUND_CSS_CLASSNAME);
          }
        }
      }
    }

    /***
     * Adds a css class to the diagonal cells
     * @param key 'upperLeft' or 'bottomLeft' depending on the diagonal to which the css class is added
     * @param cssClassName the css class name that gets added to the diagonal cells
     * @param cacheGrid the grid, to specify the length of the grid
     */
    function highlightDiagonals(key: string, cssClassName: string, cacheGrid: number[][]) {
      if (key === 'upperLeft') {
        for (let i = 0; i < cacheGrid.length; i++) {
          highlightField(i, i, cssClassName);
        }
      } else if (key === 'bottomLeft') {
        let colIdx = 8;
        for (let i = 0; i < cacheGrid.length; i++) {
          highlightField(i, colIdx, cssClassName);
          colIdx -= 1;
        }
      }
    }

    for (const key in diagonalArrays) {
      const diagonalValues = diagonalArrays[key];
      if (hasDuplicates(diagonalValues)) {
        highlightDiagonals(key, ERROR_BACKGROUND_CSS_CLASSNAME, this.cacheGrid);
      } else {
        highlightDiagonals(key, '', this.cacheGrid);
      }
    }

  }

  focusInFunction(): void {
    // get active cell
    if (document.activeElement) {
      const currCell = document.activeElement.getAttribute('ng-reflect-name');
      if (currCell && currCell.startsWith('cell')) {
        // //get cell idx of 'cellXY'
        const x: number = parseInt(currCell.charAt(4));
        const y: number = parseInt(currCell.charAt(5));
        //TODO: set highlight in column and row and cell
      }
    }
  }
}