import { Component, OnInit } from '@angular/core';
import { ClassicGameService } from './classic-game.service';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';

@Component({
  selector: 'se-sudoku-classic-game',
  templateUrl: './classic-game.component.html',
  styleUrls: ['./classic-game.component.css']
})
export class ClassicGameComponent implements OnInit {

  sudokuGridData: SudokuEntity;

  constructor(private classicGameService: ClassicGameService) {
    this.sudokuGridData = new SudokuEntity(-1, '', '', []);
  }

  ngOnInit(): void {
    this.classicGameService.getNewRandomSudoku().subscribe((gridData) => {
      this.sudokuGridData = gridData;
      console.log(gridData.id);
      console.log(gridData.difficulty);
      console.log(gridData.name);
      console.log(gridData.fields);
    });
  }

}
