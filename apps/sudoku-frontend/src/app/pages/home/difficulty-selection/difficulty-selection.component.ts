import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SudokuDifficulties } from '../../../../../../../libs/enums/SudokuDifficulties';

@Component({
  selector: 'se-sudoku-difficulty-selection',
  templateUrl: './difficulty-selection.component.html',
  styleUrls: ['./difficulty-selection.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DifficultySelectionComponent {

  constructor(private dialogRef: MatDialogRef<DifficultySelectionComponent>) {}

  easy() {
    this.dialogRef.close(SudokuDifficulties.EASY);
  }

  medium() {
    this.dialogRef.close(SudokuDifficulties.MEDIUM);
  }

  hard() {
    this.dialogRef.close(SudokuDifficulties.HARD);
  }

  ultraHard() {
    this.dialogRef.close(SudokuDifficulties.ULTRA_HARD);
  }

  cancel() {
    this.dialogRef.close();
  }

}
