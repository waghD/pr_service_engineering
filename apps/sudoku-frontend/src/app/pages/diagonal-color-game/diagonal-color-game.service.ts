import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from '../../services/auth-state.service';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';
import { ISudokuFieldDto } from '../../../../../../libs/models/sudoku-field.dto';

@Injectable({
  providedIn: 'root'
})
export class DiagonalColorGameService {

  private baseApiURL = 'http://localhost:8080/api';

  public readonly title = 'service-frontend';

  public get showAuthRequiredButtons$() {
    return this.authStateService.isLoggedInWithAccount$;
  }

  constructor(private readonly http: HttpClient, private authStateService: AuthStateService) {
  }

  getNewRandomSudoku(): Observable<ISudokuDto> {
    return this.http
      .post<ISudokuDto>(this.baseApiURL + '/sudokus/generate?type=diacolour', {});
  }

  saveSudokuFields(sudokuId: number, gridData: { x: number, y: number, value: number }[]): Observable<ISudokuFieldDto[]> {
    console.log(`SudokuID=${sudokuId}`);
    return this.http
      .post<ISudokuFieldDto[]>(this.baseApiURL + '/sudokus/' + sudokuId + '/fields', gridData);
  }

  saveSudokuParams(sudokuId: number, secondsOfTimer: { edit_time: number }) {
    return this.http
      .put<ISudokuDto>(this.baseApiURL + '/sudokus/' + sudokuId, secondsOfTimer);
  }

  getSavedSudoku(openId: number): Observable<ISudokuDto> {
    return this.http.get<ISudokuDto>(this.baseApiURL + '/sudokus/' + openId);
  }
}
