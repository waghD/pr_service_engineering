import { Component, Input } from '@angular/core';

@Component({
  selector: 'se-sudoku-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() pageHeading: string;

  constructor() {
    this.pageHeading = ''
  }
}
