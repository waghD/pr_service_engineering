import { Component } from '@angular/core';
import { HomeStateService } from './home-state.service';
import { AuthStateService } from '@Services/auth-state.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DifficultySelectionComponent } from './difficulty-selection/difficulty-selection.component';

@Component({
  selector: 'se-sudoku-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public state: HomeStateService,
    public authStateService: AuthStateService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  goToSudokuGame(url: string) {
    const componentRef = this.dialog.open(DifficultySelectionComponent, {
      minWidth: 350
    })
    componentRef.afterClosed().subscribe(selection => {
      if(selection) {
        this.router.navigateByUrl(`${url}?difficulty=${selection}`)
        .catch(e => console.error(e));
      }
    })
  }

}
