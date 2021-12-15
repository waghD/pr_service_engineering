import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { SudokuFieldEntity } from '../../../../../../libs/models/sudoku-field.entity';

@Injectable({
  providedIn: 'root'
})
export class DiagonalGameService {

  private baseApiURL = 'http://localhost:8080/api';

  public readonly title = 'service-frontend';

  constructor(private readonly http: HttpClient) {
  }

  getNewRandomSudoku(): Observable<SudokuEntity> {
    return this.http
      .post<SudokuEntity>(this.baseApiURL + '/sudokus/generate?type=diagonal', {});
  }

  saveSudokuFields(sudokuId: number, gridData: { x: number, y: number, value: number }[]): Observable<SudokuFieldEntity[]> {
    console.log(`SudokuID=${sudokuId}`);
    return this.http
      .post<SudokuFieldEntity[]>(this.baseApiURL + '/sudokus/' + sudokuId + '/fields', gridData);
  }

  saveSudokuParams(sudokuId: number, secondsOfTimer: { edit_time: number }) {
    return this.http
      .put<SudokuEntity>(this.baseApiURL + '/sudokus/' + sudokuId, secondsOfTimer);
  }
}