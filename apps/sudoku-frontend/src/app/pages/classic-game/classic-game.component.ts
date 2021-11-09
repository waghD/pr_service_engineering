import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import { ClassicGameService } from './classic-game.service';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'se-sudoku-classic-game',
  templateUrl: './classic-game.component.html',
  styleUrls: ['./classic-game.component.scss']
})
export class ClassicGameComponent implements OnInit, AfterViewChecked {

  // 0  = white
  // 1  = restOfColumnRow
  // -1 = error

  sudokuAPIData: SudokuEntity;
  sudokuGrid: number[][];
  cacheGrid: number[][];
  highlightGrid: number[][];
  gridForm: FormGroup;
  isCleared: number;

  constructor(private classicGameService: ClassicGameService, private elem: ElementRef) {
    this.sudokuAPIData = new SudokuEntity(-1, '', '', []); //dummy data for variable instance

    this.sudokuGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]];

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

    this.gridForm = new FormGroup({
      cell00: new FormControl(''),
      cell01: new FormControl(''),
      cell02: new FormControl(''),
      cell03: new FormControl(''),
      cell04: new FormControl(''),
      cell05: new FormControl(''),
      cell06: new FormControl(''),
      cell07: new FormControl(''),
      cell08: new FormControl(''),
      cell10: new FormControl(''),
      cell11: new FormControl(''),
      cell12: new FormControl(''),
      cell13: new FormControl(''),
      cell14: new FormControl(''),
      cell15: new FormControl(''),
      cell16: new FormControl(''),
      cell17: new FormControl(''),
      cell18: new FormControl(''),
      cell20: new FormControl(''),
      cell21: new FormControl(''),
      cell22: new FormControl(''),
      cell23: new FormControl(''),
      cell24: new FormControl(''),
      cell25: new FormControl(''),
      cell26: new FormControl(''),
      cell27: new FormControl(''),
      cell28: new FormControl(''),
      cell30: new FormControl(''),
      cell31: new FormControl(''),
      cell32: new FormControl(''),
      cell33: new FormControl(''),
      cell34: new FormControl(''),
      cell35: new FormControl(''),
      cell36: new FormControl(''),
      cell37: new FormControl(''),
      cell38: new FormControl(''),
      cell40: new FormControl(''),
      cell41: new FormControl(''),
      cell42: new FormControl(''),
      cell43: new FormControl(''),
      cell44: new FormControl(''),
      cell45: new FormControl(''),
      cell46: new FormControl(''),
      cell47: new FormControl(''),
      cell48: new FormControl(''),
      cell50: new FormControl(''),
      cell51: new FormControl(''),
      cell52: new FormControl(''),
      cell53: new FormControl(''),
      cell54: new FormControl(''),
      cell55: new FormControl(''),
      cell56: new FormControl(''),
      cell57: new FormControl(''),
      cell58: new FormControl(''),
      cell60: new FormControl(''),
      cell61: new FormControl(''),
      cell62: new FormControl(''),
      cell63: new FormControl(''),
      cell64: new FormControl(''),
      cell65: new FormControl(''),
      cell66: new FormControl(''),
      cell67: new FormControl(''),
      cell68: new FormControl(''),
      cell70: new FormControl(''),
      cell71: new FormControl(''),
      cell72: new FormControl(''),
      cell73: new FormControl(''),
      cell74: new FormControl(''),
      cell75: new FormControl(''),
      cell76: new FormControl(''),
      cell77: new FormControl(''),
      cell78: new FormControl(''),
      cell80: new FormControl(''),
      cell81: new FormControl(''),
      cell82: new FormControl(''),
      cell83: new FormControl(''),
      cell84: new FormControl(''),
      cell85: new FormControl(''),
      cell86: new FormControl(''),
      cell87: new FormControl(''),
      cell88: new FormControl('')
    });

    this.isCleared = 0;
  }

  ngOnInit(): void {

    /***
     * Fills the sudokuGrid with data specified from a SudokuEntity
     * @param gridData the SudokuEntity which yields the fields
     */
    const fillGridWithData = (gridData: SudokuEntity) => {
      for (const field of gridData.fields) {
        this.sudokuGrid[field.y][field.x] = field.value;
        // this.cacheGrid[field.y][field.x] = field.value;

      }
      console.log(this.sudokuGrid);
    };

    // gets a new sudoku
    this.classicGameService.getNewRandomSudoku().subscribe((gridData) => {
      this.sudokuAPIData = gridData;
      fillGridWithData(gridData);
    });

  }

  ngAfterViewChecked() {
    // TODO: workaround to clear non-empty cells
    if (this.isCleared < 3) {
      const elements = this.elem.nativeElement.querySelectorAll('.should-be-empty-cell');
      for (let i = 0; i < elements.length; i++) {
        elements[i].value = '';
      }
      this.isCleared++;
      console.log('cleared non-empty cells!');
    }
  }

  saveGrid() {
    // do stuff
    console.log(this.gridForm.value);
  }

  focusOutFunction(): void {
    Object.entries(this.gridForm.value).forEach(([key, value]) => {
      if (value) {
        //get cell idx of 'cellXY'
        const x: number = parseInt(key.charAt(4));
        const y: number = parseInt(key.charAt(5));

        let val = -1;
        if (typeof value === 'string') {
          val = parseInt(value);
        } else if (typeof value === 'number') {
          val = value;
        }

        if (val !== -1) {
          console.log('Found value at');
          console.log('[' + x + ']' + '[' + y + ']' + '=' + val);
          this.cacheGrid[y][x] = val;

        } else {
          console.error('Something wrong happened with the user input: ' + typeof val);
        }
      }
    });

    // TODO: check validity
    // function hasDuplicates(arr: any[]) {
    //   return arr.some(function(item) {
    //     return arr.indexOf(item) !== arr.lastIndexOf(item);
    //   });
    // }
    //
    // //validate grid
    // for (let rowIdx = 0; rowIdx < this.cacheGrid.length; rowIdx++) {
    //   if (hasDuplicates(this.cacheGrid[rowIdx])) {
    //
    //   }
    //   for (let col = 0; col < this.cacheGrid[rowIdx].length; col++) {
    //
    //   }
    // }
    console.log(this.cacheGrid);

  }

  focusInFunction(): void {
    // get active cell
    if (document.activeElement) {
      const currCell = document.activeElement.getAttribute('ng-reflect-name');
      if (currCell && currCell.startsWith('cell')) {
        //get cell idx of 'cellXY'
        const x: number = parseInt(currCell.charAt(4));
        const y: number = parseInt(currCell.charAt(5));

        //set highlight
        console.log('x=' + x);
        console.log('y=' + y);
      }
    }
  }
}
