import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'se-sudoku-generic-info-dialog',
  templateUrl: './generic-info-dialog.component.html',
  styleUrls: ['./generic-info-dialog.component.scss']
})
export class GenericInfoDialogComponent {

  infoMessage: string;

  constructor(public dialogRef: MatDialogRef<GenericInfoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { infoMessage: string }) {
    this.infoMessage = data.infoMessage;
  }

  onClickOk() {
    this.dialogRef.close();
  }
}
