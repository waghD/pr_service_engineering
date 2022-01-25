import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() pageHeading: string;
  @Input() additionalClass: string;

  GAME_PAGE_URLS: string[];

  constructor(public router: Router) {
    this.pageHeading = '';
    this.additionalClass = '';
    this.GAME_PAGE_URLS = ['/diagonal-game', '/classic-game', '/color-game', '/diagonal-color-game', '/region-game'];
  }
}
