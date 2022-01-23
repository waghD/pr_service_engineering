import { Component, OnInit } from '@angular/core';
import { SavedGamesService } from './saved-games.service';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';

@Component({
  selector: 'se-sudoku-saved-games',
  templateUrl: './saved-games.component.html',
  styleUrls: ['./saved-games.component.css']
})
export class SavedGamesComponent implements OnInit {

  savedGames: ISudokuDto[];

  constructor(public savedGamesService: SavedGamesService) {
    this.savedGames = [];
  }

  ngOnInit(): void {
    this.savedGamesService.getSavedSudokus().subscribe((savedGames) => {
      this.savedGames = savedGames;
    });
  }

}
