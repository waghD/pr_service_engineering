import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {
    // called on every page load
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        // scroll to top of page (necessary because of header padding)
        const headerTag = document.getElementsByTagName('header');
        if (headerTag) {
          headerTag[0].scrollTop = 0;
        }
      }
    });
  }
}
