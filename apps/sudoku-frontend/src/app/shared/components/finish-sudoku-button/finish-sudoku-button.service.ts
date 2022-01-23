import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from '../../../services/auth-state.service';
import { SudokuEntity } from '../../../../../../../libs/models/sudoku.entity';

@Injectable({
  providedIn: 'root'
})
export class FinishSudokuButtonService {

  private baseApiURL = 'http://localhost:8080/api';

  public readonly title = 'service-frontend';

  public get showAuthRequiredButtons$() {
    return this.authStateService.isLoggedInWithAccount$;
  }

  constructor(private readonly http: HttpClient, private authStateService: AuthStateService) {
  }

  /***
   * Calls API to delete a sudoku
   * @param sudokuId the id of the sudoku
   */
  deleteSudoku(sudokuId: number): Observable<SudokuEntity> {
    return this.http
      .delete<SudokuEntity>(this.baseApiURL + '/sudokus/' + sudokuId);
  }
}
