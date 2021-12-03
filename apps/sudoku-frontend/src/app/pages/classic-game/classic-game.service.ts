import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { SudokuFieldEntity } from '../../../../../../libs/models/sudoku-field.entity';

@Injectable({
  providedIn: 'root'
})
export class ClassicGameService {

  private baseApiURL = 'http://localhost:8080/api';

  public readonly title = 'service-frontend';

  constructor(private readonly http: HttpClient) {
  }

  getNewRandomSudoku(): Observable<SudokuEntity> {
    return this.http
      .post<SudokuEntity>(this.baseApiURL + '/sudokus/generate', {});
  }

  //TODO: if login is implemented, pass additionally the user id
  saveSudokuFields(sudokuId: number, gridData: { x: number, y: number, value: number }[]): Observable<SudokuFieldEntity[]> {
    console.log(`SudokuID=${sudokuId}`);
    return this.http
      .post<SudokuFieldEntity[]>(this.baseApiURL + '/sudokus/' + sudokuId + '/fields', gridData);
  }

  //TODO: if login is implemented, pass additionally the user id
  saveSudokuParams(sudokuId: number, secondsOfTimer: { edit_time: number }) {
    return this.http
      .put<any>(this.baseApiURL + '/sudokus/' + sudokuId, secondsOfTimer);
  }
}
