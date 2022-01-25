import { Component } from '@angular/core';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISudokuFieldDto } from '../../../../../../libs/models/sudoku-field.dto';
import { ColorGameService } from './color-game.service';
import { AuthStateService } from '../../services/auth-state.service';
import { isValidSudokuDifficulty, SudokuDifficulties } from '../../../../../../libs/enums/SudokuDifficulties';

@Component({
  selector: 'se-sudoku-color-game',
  templateUrl: './color-game.component.html',
  styleUrls: ['./color-game.component.scss']
})
export class ColorGameComponent {

  // vars
  sudokuAPIData: ISudokuDto;
  cacheGrid: number[][];
  solvedGrid: number[][];
  emptyGrid: number[][];
  gridForm: FormGroup;
  timerCount: number;
  interval: any;
  timeString: string;
  timerIsRunning: boolean;
  isInHelperMode: boolean;
  nonEditableFields: { x: number; y: number; }[];
  NON_EDITABLE_CSS_CLASSNAME: string;
  isEveryFieldAssigned: boolean;
  INPUT_FIELD_REGEX = new RegExp('^[1-9]$');

  // css constant classes
  ERROR_BACKGROUND_ROW_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_COL_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_BOX_CSS_CLASSNAME: string;
  ERROR_BACKGROUND_COLOR_CSS_CLASSNAME: string;
  SELECTED_CELL_BACKGROUND_CSS_CLASSNAME: string;
  SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME: string;
  CONCEAL_FIELD_CSS_CLASSNAME: string;

  private openID = -1;
  difficulty: SudokuDifficulties = SudokuDifficulties.EASY;

  constructor(
    public colorGameService: ColorGameService,
    private router: Router,
    private route: ActivatedRoute,
    private authStateService: AuthStateService,
  ) {

    this.route.paramMap.subscribe(paramMap => {
      const openID = paramMap.get('openId');
      if(openID) {
        this.openID = parseInt(openID);
        this.initialize();
      }
    })

    this.route.queryParamMap.subscribe(paramMap => {
      const difficultyString = paramMap.get('difficulty');
      if(difficultyString && isValidSudokuDifficulty(difficultyString)) {
        this.difficulty = difficultyString as SudokuDifficulties;
        this.initialize();
      }
    })

    this.sudokuAPIData = {} as ISudokuDto;

    this.solvedGrid = [
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

    this.ERROR_BACKGROUND_COL_CSS_CLASSNAME = 'error-background-col';
    this.ERROR_BACKGROUND_ROW_CSS_CLASSNAME = 'error-background-row';
    this.ERROR_BACKGROUND_BOX_CSS_CLASSNAME = 'error-background-box';
    this.ERROR_BACKGROUND_COLOR_CSS_CLASSNAME = 'error-background-color'
    this.SELECTED_CELL_BACKGROUND_CSS_CLASSNAME = 'selected-cell-background';
    this.SELECTED_ROW_COL_BOX_BACKGROUND_CSS_CLASSNAME = 'selected-row-background';
    this.CONCEAL_FIELD_CSS_CLASSNAME = 'conceal-field';

    this.nonEditableFields = [];

    this.NON_EDITABLE_CSS_CLASSNAME = 'non-editable-field';
    this.isEveryFieldAssigned = false;
  }

  /**
   * general initialize function called from paramMap observer to avoid race condition.
   * ngOnInit is sometimes called before query parameter map is initialized
   */
  initialize(): void {
    if (this.openID != -1) {
      // got an id from the router, open a saved sudoku
      this.colorGameService.getSavedSudoku(this.openID).subscribe((savedSudokuData) => {
        this.initVars(savedSudokuData);
      });
    } else {
      // get a new sudoku
      this.colorGameService.getNewRandomSudoku(this.difficulty).subscribe((generatedSudokuData) => {
        this.initVars(generatedSudokuData);
      });
    }
  }

  /**
   * Sets the initial values for playing the sudoku
   * @param sudokuData the sudoko object containing the values
   */
  initVars(sudokuData: ISudokuDto) {

    /***
     * Fills the sudokuGrid with data specified from a SudokuEntity
     * @param gridData the SudokuEntity which yields the fields
     */
    const fillGridWithData = (gridData: ISudokuFieldDto[]) => {
      for (const field of gridData) {
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
        // save solution
        this.solvedGrid[field.x][field.y] = field.solution;

        // add color css class
        document.getElementsByClassName(`cell${field.x}${field.y}`)[0].classList.add(`color-${field.colour}`);
      }
    };

    this.sudokuAPIData = sudokuData;
    if (sudokuData.fields) fillGridWithData(sudokuData.fields);
    this.timerCount = sudokuData.edit_time;
    this.timeString = this.secondsToStringTime(this.timerCount);
    this.concealGrid();
    // make the initial fields non editable
    this.makeFieldsNotEditable(this.nonEditableFields);
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

    this.colorGameService.saveSudokuParams(id, { 'edit_time': this.timerCount }).subscribe(() => {
      console.log('saved time');
    });

    this.colorGameService.saveSudokuFields(id, gridValues).subscribe(() => {
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
    // ########### check and highlight duplicates colors ###########
    // #################################################################
    for (let i = 0; i < this.cacheGrid.length; i++) {
      const valuesFoundForColor = [];
      const currentColorIdx = i + 1;
      if (this.sudokuAPIData.fields) {
        for (let j = 0; j < this.sudokuAPIData.fields.length; j++) {
          const currField = this.sudokuAPIData.fields[j];
          if (currField.colour === currentColorIdx) {
            //found a match get the value and add it to the array of values
            valuesFoundForColor.push(this.cacheGrid[currField.y][currField.x]);
          }
        }
      }
      // all values for the current colour are now in valuesFoundForColor, check if it has any duplicates
      if (hasDuplicates(valuesFoundForColor)) {
        this.highlightColor(currentColorIdx, this.ERROR_BACKGROUND_COLOR_CSS_CLASSNAME, this.sudokuAPIData, false);
      } else {
        this.highlightColor(currentColorIdx, this.ERROR_BACKGROUND_COLOR_CSS_CLASSNAME, this.sudokuAPIData, true);
      }
    }

    /***
     * Checks if every field is filled with an input
     * @param sudokuGrid the 2D-grid to check
     */
    function isEverythingFilledOut(sudokuGrid: number[][]) {
      for (let i = 0; i < sudokuGrid.length; i++) {
        for (let j = 0; j < sudokuGrid[i].length; j++) {
          if (sudokuGrid[i][j] == 0) {
            return false;
          }
        }
      }
      return true;
    }

    // set booleans if everything is solved
    if (isEverythingFilledOut(this.cacheGrid)) {
      this.isEveryFieldAssigned = true;
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
   * Converts a number of seconds to a string in the format hh:mm:ss
   * @param seconds the seconds that should be transformed
   */
  secondsToStringTime(seconds: number) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }

  /***
   * Called when the timer buttons are clicked
   */
  toggleTimer() {
    if (!this.timerIsRunning) {
      // start timer
      this.interval = setInterval(() => {
        this.timerCount += 1;
        this.timeString = this.secondsToStringTime(this.timerCount);
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
    for (let i = 0; i < this.solvedGrid.length; i++) {
      for (let j = 0; j < this.solvedGrid.length; j++) {
        this.highlightField(i, j, this.CONCEAL_FIELD_CSS_CLASSNAME, false);
      }
    }
  }


  /***
   * Makes the grid visible
   * @private
   */
  private revealGrid() {
    for (let i = 0; i < this.solvedGrid.length; i++) {
      for (let j = 0; j < this.solvedGrid.length; j++) {
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
    // check if logged in
    if (this.authStateService.Username != '') {
      const isRedirectOk = confirm('Behold fellow player, if you go back without saving, your changes since the last save get lost!');
      if (isRedirectOk) {
        // player confirmation -> go to main menu
        this.router.navigate(['/home']).then(r => {
          console.log('redirected=' + r);
        });
      }
    } else {
      // logged in as guest, no saving possible just redirect
      this.router.navigate(['/home']).then(r => {
        console.log('redirected=' + r);
      });
    }
  }

  /***
   * Checks if the user input is valid for a sudoku field
   * @param event the KeyboardEvent which will be checked
   */
  checkKeyInput(event: KeyboardEvent) {
    console.log(event);
    // only allow digits 1-9, backspace, delete, arrow to right and arrow to left
    if (!(this.INPUT_FIELD_REGEX.test(event.key) || event.key == 'Backspace' || event.key == 'Delete' || event.key == 'ArrowLeft' || event.key == 'ArrowRight')) {
      event.preventDefault();
      alert('Enter a number between 1-9!');
    }
    // check if cell has already a digit
    if ((<HTMLInputElement>event.target).value.length > 0) {
      // allow for these inputs inside field
      if (!(event.key == 'Backspace' || event.key == 'Delete' || event.key == 'ArrowLeft' || event.key == 'ArrowRight')) {
        // do not allow further input
        event.preventDefault();
        alert('Only a single number between 1-9 is allowed!');
      }
    }
  }

  /***
   * Highlights all fields of specific color
   * @param colorIdentifier the color identifier (number between 1-9)
   * @param cssClass the css class to be added/removed to the field
   * @param sudokuAPIData the data which stores which color belongs to which field
   * @param doRemove whether to remove or add the specified css class
   * @private
   */
  private highlightColor(colorIdentifier: number, cssClass: string, sudokuAPIData: ISudokuDto, doRemove: boolean) {
    if (sudokuAPIData.fields) {
      for (let i = 0; i < sudokuAPIData.fields.length; i++) {
        const currField = sudokuAPIData.fields[i];
        if (colorIdentifier == currField.colour) {
          this.highlightField(currField.x, currField.y, cssClass, doRemove);
        }
      }
    }
  }
}
