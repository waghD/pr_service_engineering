import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { DiagonalGameService } from './diagonal-game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-diagonal-game',
  templateUrl: './diagonal-game.component.html',
  styleUrls: ['./diagonal-game.component.scss']
})
export class DiagonalGameComponent implements OnInit {

  // vars
  sudokuAPIData: SudokuEntity;
  cacheGrid: number[][];
  highlightGrid: number[][];
  emptyGrid: number[][];
  gridForm: FormGroup;
  timerCount: number;
  interval: any;
  timeString: string;
  timerIsRunning: boolean;
  isInHelperMode: boolean;
  nonEditableFields: { x: number; y: number; }[];
  errorInUpLeftFlag: boolean;

  // css constant classes
  NON_EDITABLE_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_ROW_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_COL_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_BOX_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_DIAGONAL_CSS_CLASSNAME: string;
  SELECTED_CELL_BACKGROUND_CSS_CLASSNAME: string;
  SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME: string;
  CONCEAL_FIELD_CSS_CLASSNAME: string;


  constructor(private diagonalGameService: DiagonalGameService, private router: Router) {
    this.sudokuAPIData = new SudokuEntity(-1, '', '', 0, []); //dummy data for variable instance

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

    this.timerCount = 0;
    this.interval = null;
    this.timeString = '00:00:00';
    this.timerIsRunning = false;
    this.isInHelperMode = true;
    this.errorInUpLeftFlag = false;

    this.ERROR_BACKGROUND_COL_CSS_CLASSNAME = 'error-background-col';
    this.ERROR_BACKGROUND_ROW_CSS_CLASSNAME = 'error-background-row';
    this.ERROR_BACKGROUND_BOX_CSS_CLASSNAME = 'error-background-box';
    this.ERROR_BACKGROUND_DIAGONAL_CSS_CLASSNAME = 'error-background-diagonal';
    this.SELECTED_CELL_BACKGROUND_CSS_CLASSNAME = 'selected-cell-background';
    this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME = 'selected-row-background';
    this.CONCEAL_FIELD_CSS_CLASSNAME = 'conceal-field';
    this.NON_EDITABLE_CSS_CLASSNAME = 'non-editable-field';

    this.nonEditableFields = [];
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
        // add non editable fields to array
        if (!field.editable) {
          const temp = { x: field.x, y: field.y };
          this.nonEditableFields.push(temp);
        }
        this.gridForm.patchValue(newVal);
      }
    };

    // gets a new sudoku
    this.diagonalGameService.getNewRandomSudoku().subscribe((generatedSudokuData) => {
      this.sudokuAPIData = generatedSudokuData;
      fillGridWithData(generatedSudokuData);
      this.timerCount = generatedSudokuData.edit_time;
      this.concealGrid();
      // make the initial fields non editable
      this.makeFieldsNotEditable(this.nonEditableFields);
    });
  }

  makeFieldsNotEditable(classList: { x: number; y: number }[]) {
    for (const cellValues of classList) {
      this.highlightField(cellValues.x, cellValues.y, this.NON_EDITABLE_CSS_CLASSNAME, false);
    }
  }

  /***
   * Called when save button is clicked
   */
  saveGrid() {

    /***
     * Transforms the html-form data into adequate json-form for api
     * @param formValues the values of the form to be transformed
     */
    function gridFormToApiJson(formValues: { [s: string]: number }) {
      const result: { x: number, y: number, value: number }[] = [];
      for (const [cellName, value] of Object.entries(formValues)) {
        if (value && cellName && value > 0 && cellName.startsWith('cell')) {
          result.push({ 'x': parseInt(cellName.charAt(4)), 'y': parseInt(cellName.charAt(5)), 'value': value });
        }
      }
      return result;
    }

    const gridValues = gridFormToApiJson(this.gridForm.value);

    const id = this.sudokuAPIData.id;

    this.diagonalGameService.saveSudokuParams(id, { 'edit_time': this.timerCount }).subscribe(() => {
      console.log('saved time');
    });

    this.diagonalGameService.saveSudokuFields(id, gridValues).subscribe(() => {
      console.log('saved fields');
      alert('Successfully saved Sudoku!');
    });
  }


  /***
   * Called when clicking outside the current selected cell
   */
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

    //remove all other helper highlights
    for (let i = 0; i < this.cacheGrid.length; i++) {
      for (let j = 0; j < this.cacheGrid.length; j++) {
        this.highlightField(i, j, this.SELECTED_CELL_BACKGROUND_CSS_CLASSNAME, true);
        this.highlightField(i, j, this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, true);
      }
    }


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

    // ###################################################
    // ###### check and highlight duplicates in rows #####
    // ###################################################

    for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
      const rowDomElement = document.getElementsByClassName('row-nr-' + rowIdx);

      if (hasDuplicates(this.cacheGrid[rowIdx])) {
        //found a duplicate in the row, add error class
        console.warn('Duplicate in row ' + (rowIdx + 1) + '!');
        rowDomElement[0].classList.add(this.ERROR_BACKGROUND_ROW_CSS_CLASSNAME);
      } else {
        // if no error, remove (previous) error class
        rowDomElement[0].classList.remove(this.ERROR_BACKGROUND_ROW_CSS_CLASSNAME);
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

      //check if array has duplicates
      if (hasDuplicates(colArr)) {
        console.warn('Duplicate in column ' + (x) + '!');
        for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
          this.highlightField(x, rowIdx, this.ERROR_BACKGROUND_COL_CSS_CLASSNAME, false);
        }
      } else {
        // no duplicates, but value could have been deleted, revalidate to no error
        for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
          this.highlightField(x, rowIdx, this.ERROR_BACKGROUND_COL_CSS_CLASSNAME, true);
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

    for (let i = 0; i < boxList.length; i++) {

      const boxArray = boxList[i];
      // highlight boxes which have duplicates
      const currentArray = boxArray['values'];
      const startIdxRow = boxArray['startIdxRows'];
      const startIdxCol = boxArray['startIdxCols'];

      if (hasDuplicates(currentArray)) {
        console.warn('Duplicate in 3x3 ');
        this.highlightBox(startIdxRow, startIdxCol, this.ERROR_BACKGROUND_BOX_CSS_CLASSNAME, false);
      } else {
        this.highlightBox(startIdxRow, startIdxCol, this.ERROR_BACKGROUND_BOX_CSS_CLASSNAME, true);
      }
    }

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


    for (const key in diagonalArrays) {
      const diagonalValues = diagonalArrays[key];
      if (hasDuplicates(diagonalValues)) {
        if (key == 'upperLeft') {
          this.errorInUpLeftFlag = true;
        }
        this.highlightDiagonals(key, this.ERROR_BACKGROUND_DIAGONAL_CSS_CLASSNAME, this.cacheGrid, false);
      } else {
        this.highlightDiagonals(key, this.ERROR_BACKGROUND_DIAGONAL_CSS_CLASSNAME, this.cacheGrid, true);
      }
    }


  }

  /***
   * Adds a css class to the diagonal cells
   * @param key 'upperLeft' or 'bottomLeft' depending on the diagonal to which the css class is added
   * @param cssClassName the css class name that gets added to the diagonal cells
   * @param cacheGrid the grid, to specify the length of the grid
   * @param doRemove false, if the css class should be added to the diagonals; true if it should be removed
   */
  highlightDiagonals(key: string, cssClassName: string, cacheGrid: number[][], doRemove: boolean) {
    if (key === 'upperLeft') {
      for (let i = 0; i < cacheGrid.length; i++) {
        this.highlightField(i, i, cssClassName, doRemove);
      }
    } else if (key === 'bottomLeft') {
      let colIdx = 8;
      for (let i = 0; i < cacheGrid.length; i++) {
        if (this.errorInUpLeftFlag && i == colIdx) {
          this.errorInUpLeftFlag = false;
          colIdx -= 1;
        } else {
          this.highlightField(i, colIdx, cssClassName, doRemove);
          colIdx -= 1;
        }
      }
    }
  }

  /***
   * Highlights a 3x3 box given the start indices of rows and cols
   * @param startIdxRow the row index from which to highlight the next 3 indices
   * @param startIdxCol the column index from which to highlight the next 3 indices
   * @param cssClass the css classname which should be added to the cells, leave empty string to remove error background
   * @param doRemove boolean value that indicates whether the css class should be added or removed
   */
  highlightBox(startIdxRow: number, startIdxCol: number, cssClass: string, doRemove: boolean) {
    for (let i = startIdxRow; i < (startIdxRow + 3); i++) {
      for (let j = startIdxCol; j < (startIdxCol + 3); j++) {
        this.highlightField(j, i, cssClass, doRemove);
      }
    }
  }

  /***
   * Adds/removes a classname to a single cell
   * @param row the row index of the cell
   * @param col the column index of the cell
   * @param cssClassName the css classname that gets added/removed to the cell
   * @param doRemove boolean whether the classname should be added or removed ('true' means removing of the classes)
   */
  highlightField(row: number, col: number, cssClassName: string, doRemove: boolean) {
    // get classlist of current cell
    const classNameOfCell = `cell${row}${col}`;
    // get the parent dom element cell for correct styling
    const cellParentNode = document.getElementsByClassName(classNameOfCell)[0].parentElement;
    if (cellParentNode && cellParentNode.parentElement) {
      const cellNodeClassList = cellParentNode.parentElement.classList;
      if (!doRemove) {
        cellNodeClassList.add(cssClassName);
      } else {
        // remove the css class if flag is given and it exists
        if (cellNodeClassList.contains(cssClassName)) {
          cellNodeClassList.remove(cssClassName);
        }
      }
    }
  }


  /***
   * Gets called when clicking in a cell -> highlights the cell, col and row to help to solve
   */
  focusInFunction(): void {

    /***
     * Returns the start indices (col and row) of the surrounding box for a given row and col idx
     * @param colIdx the col index of the cell
     * @param rowIdx the row index of the cell
     */
    function getBoxIndices(colIdx: number, rowIdx: number) {
      let startRowIdxBox = rowIdx;
      let startColIdxBox = colIdx;

      // count down to start indices
      while (startRowIdxBox % 3 !== 0) {
        startRowIdxBox -= 1;
      }
      while (startColIdxBox % 3 !== 0) {
        startColIdxBox -= 1;
      }
      return { 'startRowIdxBox': startRowIdxBox, 'startColIdxBox': startColIdxBox };
    }

    // only highlight if in helper mode
    if (this.isInHelperMode) {

      // get active cell
      if (document.activeElement) {

        const currCellClassList = document.activeElement.classList;

        for (let i = 0; i < currCellClassList.length; i++) {

          const currCell: string = currCellClassList[i];

          if (currCell.startsWith('cell')) {
            const x: number = parseInt(currCell.charAt(4));
            const y: number = parseInt(currCell.charAt(5));

            // highlight row/column/box except for active cell
            for (let index = 0; index < this.cacheGrid.length; index++) {
              this.highlightField(index, y, this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, false);
              this.highlightField(x, index, this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, false);
            }

            // highlight box
            const boxIndices = getBoxIndices(x, y);
            this.highlightBox(boxIndices['startRowIdxBox'], boxIndices['startColIdxBox'], this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, false);

            // highlight diagonals
            for (let i = 0; i < this.cacheGrid.length; i++) {
              if (x == i && i == y) {
                this.highlightDiagonals('upperLeft', this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, this.cacheGrid, false);
                break;
              }
            }

            let colIdx = 8;
            for (let i = 0; i < this.cacheGrid.length; i++) {
              if (x == i && colIdx == y) {
                this.highlightDiagonals('bottomLeft', this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, this.cacheGrid, false);
                break;
              }
              colIdx -= 1;
            }

            // remove 'standard' highlight cell
            this.highlightField(x, y, this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME, true);
            // highlight cell little darker
            this.highlightField(x, y, this.SELECTED_CELL_BACKGROUND_CSS_CLASSNAME, false);
          }
        }
      }
    }
  }


  /***
   * Called when the timer buttons are clicked
   */
  toggleTimer() {

    /***
     * Converts a number of seconds to a string in the format hh:mm:ss
     * @param seconds the seconds that should be transformed
     */
    function secondsToStringTime(seconds: number) {
      const date = new Date(0);
      date.setSeconds(seconds);
      return date.toISOString().substr(11, 8);
    }

    if (!this.timerIsRunning) {
      // start timer
      this.interval = setInterval(() => {
        this.timerCount += 1;
        this.timeString = secondsToStringTime(this.timerCount);
      }, 1000);
      this.timerIsRunning = true;

      // reveal grid
      this.revealGrid();

    } else {
      //stop timer
      clearInterval(this.interval);
      this.timerIsRunning = false;

      // conceal grid
      this.concealGrid();
    }
  }


  /***
   * Conceals the grid to make it non-visible to the player during paused timer
   * @private
   */
  private concealGrid() {
    for (let i = 0; i < this.highlightGrid.length; i++) {
      for (let j = 0; j < this.highlightGrid.length; j++) {
        this.highlightField(i, j, this.CONCEAL_FIELD_CSS_CLASSNAME, false);
      }
    }
  }


  /***
   * Makes the grid visible
   * @private
   */
  private revealGrid() {
    for (let i = 0; i < this.highlightGrid.length; i++) {
      for (let j = 0; j < this.highlightGrid.length; j++) {
        this.highlightField(i, j, this.CONCEAL_FIELD_CSS_CLASSNAME, true);
      }
    }
  }

  /***
   * Gets called when the switch toggle button is clicked
   */
  helperSwitched() {
    // switch mode
    this.isInHelperMode = !this.isInHelperMode;
  }


  /***
   * Called when clicking on back to menu button
   */
  backToMenuButtonClicked() {
    const isRedirectOk = confirm('Behold fellow player, if you go back without saving, your changes since the last save get lost!');
    if (isRedirectOk) {
      // player confirmation -> go to main menu
      this.router.navigate(['/home']).then(r => {
        console.log('redirected=' + r);
      });
    }
  }
}