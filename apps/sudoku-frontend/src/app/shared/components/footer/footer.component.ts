import { Component, Input } from '@angular/core';

@Component({
  selector: 'se-sudoku-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() additionalClass: string;

  constructor() {
    this.additionalClass = '';
  }

}
