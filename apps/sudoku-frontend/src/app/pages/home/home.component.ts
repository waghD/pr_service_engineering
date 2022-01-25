import { Component } from '@angular/core';
import { HomeStateService } from './home-state.service';
import { AuthStateService } from '../../services/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'se-sudoku-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public state: HomeStateService,
    public authStateService: AuthStateService,
    private router: Router
  ) {
  }

  goToSudokuGame(url: string) {
    this.router.navigateByUrl(`${url}?difficulty=easy`)
      .catch(e => console.error(e));
  }

}
