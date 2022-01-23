import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../../services/auth-state.service';
import { FinishSudokuButtonService } from './finish-sudoku-button.service';

@Component({
  selector: 'se-sudoku-finish-sudoku-button',
  templateUrl: './finish-sudoku-button.component.html',
  styleUrls: ['./finish-sudoku-button.component.scss']
})
export class FinishSudokuButtonComponent implements OnInit {

  @Input()
  sudokuFieldsInput: number[][];
  @Input()
  sudokuFieldsSolution: number[][];
  @Input()
  investedTime: string;
  @Input()
  sudokuId: number;
  solvedTime: string;

  constructor(private router: Router, private authService: AuthStateService, private finishSudokuButtonService: FinishSudokuButtonService) {
    this.sudokuFieldsInput = [];
    this.sudokuFieldsSolution = [];
    this.investedTime = '';
    this.solvedTime = '';
    this.sudokuId = -1;
  }

  ngOnInit(): void {
    console.log(this.sudokuFieldsInput);
    console.log(this.sudokuFieldsSolution);
    console.log(this.investedTime);
    console.log(this.sudokuId);
  }

  submitButtonClicked() {
    // check if sudoku is solved correctly
    let isSolvedCorrectly = false;
    window.scrollTo(0, 0);

    if (this.is2DArraysEqual(this.sudokuFieldsInput, this.sudokuFieldsSolution)) {
      isSolvedCorrectly = true;
    }

    if (isSolvedCorrectly) {
      this.solvedTime = this.investedTime;

      // display success message
      const animNode = document.getElementById('outer-success-container');
      if (animNode) {
        animNode.style.display = 'flex';
      }
    } else {
      // display error message
      alert('The sudoku is not solved correctly, check your inputs and try again!');
    }
  }

  /***
   * Checks whether 2 array contents are equal
   * @param array1 first array
   * @param array2 second array
   */
  is2DArraysEqual(array1: number[][], array2: number[][]) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  backToMenuButtonClicked() {
    // check if it is a guest and the sudokuId is set
    if (this.authService.isLoggedIn && this.authService.Username !== '' && this.sudokuId != -1) {
      // delete sudoku of player
      this.finishSudokuButtonService.deleteSudoku(this.sudokuId).subscribe(res => {
        console.log('Deleted sudoku:');
        console.log(res);
      });
    }
    // go back to menu
    this.router.navigate(['/home']).then(r => {
      console.log('redirected=' + r);
    });
  }
}
