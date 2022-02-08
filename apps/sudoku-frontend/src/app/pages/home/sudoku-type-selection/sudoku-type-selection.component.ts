import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DifficultySelectionComponent } from '../difficulty-selection/difficulty-selection.component';
import { Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-sudoku-type-selection',
  templateUrl: './sudoku-type-selection.component.html',
  styleUrls: ['./sudoku-type-selection.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SudokuTypeSelectionComponent {

  constructor(private dialogRef: MatDialogRef<SudokuTypeSelectionComponent>,
              private router: Router,
              private dialog: MatDialog) {
  }

  goToSudokuGame(url: string) {
    const componentRef = this.dialog.open(DifficultySelectionComponent, {
      minWidth: 350
    });
    componentRef.afterClosed().subscribe(selection => {
      if (selection) {
        this.router.navigateByUrl(`${url}?difficulty=${selection}`)
          .catch(e => console.error(e));
      }
    });
    this.dialogRef.close()
  }

  cancel() {
    this.dialogRef.close();
  }
}
