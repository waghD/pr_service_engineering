import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'se-sudoku-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  questionText: string;

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { questionText: string }) {
    this.questionText = data.questionText;
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }

  onDenyClick() {
    this.dialogRef.close(false);
  }
}
