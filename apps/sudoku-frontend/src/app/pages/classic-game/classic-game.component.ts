import { Component, OnInit } from '@angular/core';
import { ClassicGameService } from './classic-game.service';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'se-sudoku-classic-game',
  templateUrl: './classic-game.component.html',
  styleUrls: ['./classic-game.component.scss']
})
export class ClassicGameComponent implements OnInit {

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
        newVal[`cell${field.x}${field.y}`] = field.value;
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

    // check and highlight duplicates in rows
    for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
      const rowDomElement = document.getElementsByClassName('row-nr-' + rowIdx);

      if (hasDuplicates(this.cacheGrid[rowIdx])) {
        //found a duplicate in the row, add error class
        console.warn('Duplicate in row ' + (rowIdx + 1) + '!');
        rowDomElement[0].classList.add('error-background');
      } else {
        // if no error, remove (previous) error class
        rowDomElement[0].classList.remove('error-background');
      }
    }

    // check and highlight duplicates in columns
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
          currentCellDom.classList.add('error-background');
        }
      } else {
        // no duplicates, but value could have been deleted, revalidate to no error
        for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
          const cellNodes = rowsDomElements[rowIdx].childNodes;
          const currentCellDom = cellNodes[x] as HTMLElement;
          currentCellDom.classList.remove('error-background');
        }
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
