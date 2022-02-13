import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'se-sudoku-loader-dialog',
  templateUrl: './loader-dialog.component.html',
  styleUrls: ['./loader-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoaderDialogComponent {

  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message?: string}) {
    this.title = data?.message ?? 'Lädt';
  }

}
