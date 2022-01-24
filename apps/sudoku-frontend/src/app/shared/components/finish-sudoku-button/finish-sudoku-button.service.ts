import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from '../../../services/auth-state.service';
import { ISudokuDto } from '../../../../../../../libs/models/sudoku.dto';

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
  deleteSudoku(sudokuId: number): Observable<ISudokuDto> {
    return this.http
      .delete<ISudokuDto>(this.baseApiURL + '/sudokus/' + sudokuId);
  }
}
