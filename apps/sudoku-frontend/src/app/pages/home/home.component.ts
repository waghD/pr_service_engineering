import { Component } from '@angular/core';
import { HomeStateService } from './home-state.service';
import { AuthStateService } from '../../services/auth-state.service';

@Component({
  selector: 'se-sudoku-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public state: HomeStateService, public authStateService: AuthStateService) {
  }

}
