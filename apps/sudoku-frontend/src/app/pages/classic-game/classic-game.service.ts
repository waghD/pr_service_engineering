import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SudokuEntity } from '../../../../../../libs/models/sudoku.entity';
import { SudokuFieldEntity } from '../../../../../../libs/models/sudoku-field.entity';
import { AuthStateService } from '../../services/auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class ClassicGameService {

  private baseApiURL = 'http://localhost:8080/api';

  public readonly title = 'service-frontend';

  public get showAuthRequiredButtons$() {
    return this.authStateService.isLoggedInWithAccount$;
  }

  constructor(private readonly http: HttpClient, private authStateService: AuthStateService) {
  }

  // TODO: insert correct api call here when finished
  getNewRandomSudoku(): Observable<SudokuEntity> {
    return this.http
      .post<SudokuEntity>(this.baseApiURL + '/sudokus/generate?type=classic', {});
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
