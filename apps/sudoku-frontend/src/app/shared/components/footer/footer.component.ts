import { Component, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'se-sudoku-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() additionalClass: string;

  displayFooter = true;

  constructor(private router: Router) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      const typedEvent = event as NavigationEnd;
      this.displayFooter = !typedEvent.url.includes('login');
    });
    this.additionalClass = '';
  }

}
