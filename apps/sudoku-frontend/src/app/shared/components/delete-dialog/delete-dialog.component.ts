import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'se-sudoku-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

  onDenyClick() {
    this.dialogRef.close(false);
  }
}
