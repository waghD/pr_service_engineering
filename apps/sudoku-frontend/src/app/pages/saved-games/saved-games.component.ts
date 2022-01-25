import { Component, OnInit } from '@angular/core';
import { SavedGamesService } from './saved-games.service';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../shared/components/delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { GenericInfoDialogComponent } from '../../shared/components/generic-info-dialog/generic-info-dialog.component';

@Component({
  selector: 'se-sudoku-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.scss']
})
export class SavedGamesComponent implements OnInit {

  savedGames: ISudokuDto[];

  constructor(public savedGamesService: SavedGamesService, public deleteDialog: MatDialog, private router: Router, public infoDialog: MatDialog) {
    this.savedGames = [];
  }

  ngOnInit(): void {
    this.savedGamesService.getSavedSudokus().subscribe((savedDBGames) => {

      if (savedDBGames.length === 0) {
        // no games to load, show notification and redirect
        const dialogRef = this.infoDialog.open(GenericInfoDialogComponent, {
          height: '400px',
          width: '600px',
          autoFocus: false,
          data: { infoMessage: 'You did not safe any sudoku games yet. Play a few games and safe them to display them here!' }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      } else {
        // calc ratio for progress percentage and add timestring
        for (let i = 0; i < savedDBGames.length; i++) {
          const currentSudoku = savedDBGames[i];
          let filledOutFields = 0;
          if (currentSudoku.fields) {
            currentSudoku.fields.forEach(function(field) {
              // field does not contain zero -> it is filled out
              if (field.value > 0) filledOutFields++;
            });

            currentSudoku.filled_out_ratio = Math.round(filledOutFields * 100 / (currentSudoku.fields.length ^ 2));
            currentSudoku.time_string = this.secondsToStringTime(currentSudoku.edit_time);
          }
        }
        this.savedGames = savedDBGames;
      }
    });
  }

  /**
   * Called when clicking on a trash button
   * @param sudokuObj the sudoku object of the sudoku of the button clicked
   */
  trashButtonClick(sudokuObj: ISudokuDto) {
    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      height: '400px',
      width: '600px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(isAnswerYes => {
      if (isAnswerYes) {
        // delete sudoku in db
        this.savedGamesService.deleteSudoku(sudokuObj.id).subscribe(response => {
          console.log('Deleted the following sudoku');
          console.log(response);
        });
        // remove sudoku from view
        this.savedGames.splice(this.savedGames.indexOf(sudokuObj), 1);
      }
    });
  }

  /***
   * Called when play button is clicked
   * @param oneSudoku the sudoku which will be opened
   */
  playButtonClicked(oneSudoku: ISudokuDto) {
    switch (oneSudoku.type) {
      case 'classic':
        this.router.navigate(['/classic-game', { openId: oneSudoku.id }]);
        break;
      case 'diagonal':
        this.router.navigate(['/diagonal-game', { openId: oneSudoku.id }]);
        break;
      //TODO add the others when implmented
      default:
        console.error('can\'t open unknown sudoku-type: ' + oneSudoku.type);
    }


  }

  /***
   * Converts a number of seconds to a string in the format hh:mm:ss
   * @param seconds the seconds that should be transformed
   */
  secondsToStringTime(seconds: number) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  }
}