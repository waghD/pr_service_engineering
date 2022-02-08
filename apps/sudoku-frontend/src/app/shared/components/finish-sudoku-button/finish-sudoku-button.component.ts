import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '@Services/auth-state.service';
import { FinishSudokuButtonService } from './finish-sudoku-button.service';
import { GenericInfoDialogComponent } from '../generic-info-dialog/generic-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'se-sudoku-finish-sudoku-button',
  templateUrl: './finish-sudoku-button.component.html',
  styleUrls: ['./finish-sudoku-button.component.scss']
})
export class FinishSudokuButtonComponent {

  @Input()
  sudokuFieldsInput: number[][];
  @Input()
  sudokuFieldsSolution: number[][];
  @Input()
  investedTime: string;
  @Input()
  sudokuId: number;
  solvedTime: string;

  constructor(private router: Router, private authService: AuthStateService, private finishSudokuButtonService: FinishSudokuButtonService, public infoDialog: MatDialog) {
    this.sudokuFieldsInput = [];
    this.sudokuFieldsSolution = [];
    this.investedTime = '';
    this.solvedTime = '';
    this.sudokuId = -1;
  }

  /***
   * Called when submit button clicked
   */
  submitButtonClicked() {
    // check if sudoku is solved correctly
    let isSolvedCorrectly = false;
    window.scrollTo(0, 0);

    const transformedArray = this.sudokuFieldsSolution[0].map((_, colIndex) => this.sudokuFieldsSolution.map(row => row[colIndex]));

    if (this.is2DArraysEqual(this.sudokuFieldsInput, transformedArray)) {
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
      const dialogRef = this.infoDialog.open(GenericInfoDialogComponent, {
        height: '400px',
        width: '30vw',
        autoFocus: false,
        data: { infoMessage: 'The Sudoku is not solved correctly, check your input fields and try again!' }
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('Sudoku not solved correct!');
      });
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
