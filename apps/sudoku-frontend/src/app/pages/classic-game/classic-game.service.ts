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

  saveSudoku(sudokuId: number, gridData: { x: number, y: number, value: number }[]): Observable<SudokuFieldEntity[]> {
    return this.http
      .post<SudokuFieldEntity[]>(this.baseApiURL + '/sudokus/' + sudokuId + '/fields', gridData);
  }
}
