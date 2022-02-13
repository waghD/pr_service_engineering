import { Component } from '@angular/core';
import { HomeStateService } from './home-state.service';
import { AuthStateService } from '../../services/auth-state.service';
import { MatDialog } from '@angular/material/dialog';
import { SudokuTypeSelectionComponent } from './sudoku-type-selection/sudoku-type-selection.component';

@Component({
  selector: 'se-sudoku-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public state: HomeStateService,
    public authStateService: AuthStateService,
    private dialog: MatDialog
  ) {
  }

  playButtonClicked() {
    this.dialog.open(SudokuTypeSelectionComponent, {
      minWidth: 350
    });
  }
}
