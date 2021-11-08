import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';

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
      // TODO: currently hardcoded id number 1, later get here a new genereated sudoku when generator and API is rdy
      .get<SudokuEntity>(this.baseApiURL + '/sudokus/1');
  }
}
