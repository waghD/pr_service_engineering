import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';

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
      .post<SudokuEntity>(this.baseApiURL + '/sudokus/generate', {});
  }
}
