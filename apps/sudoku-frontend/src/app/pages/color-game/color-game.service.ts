import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthStateService } from "@Services/auth-state.service";
import { ISudokuDto } from '@models/sudoku.dto';
import { ISudokuFieldDto } from '@models/sudoku-field.dto';
import { SudokuDifficulties } from '@enums/SudokuDifficulties';

@Injectable({
  providedIn: "root"
})
export class ColorGameService {

  private baseApiURL: string;

  public readonly title = "service-frontend";

  public get showAuthRequiredButtons$() {
    return this.authStateService.isLoggedInWithAccount$;
  }

  constructor(private readonly http: HttpClient, private authStateService: AuthStateService) {
    if (isDevMode()) {
      this.baseApiURL = "http://localhost:8080/api";
    } else {
      this.baseApiURL = "http://localhost/api";
    }
  }

  getNewRandomSudoku(difficulty: SudokuDifficulties): Observable<ISudokuDto> {
    return this.http
      .post<ISudokuDto>(`${this.baseApiURL}/sudokus/generate?type=colour&difficulty=${difficulty}`, {});
  }

  saveSudokuFields(sudokuId: number, gridData: { x: number, y: number, value: number }[]): Observable<ISudokuFieldDto[]> {
    console.log(`SudokuID=${sudokuId}`);
    return this.http
      .post<ISudokuFieldDto[]>(this.baseApiURL + "/sudokus/" + sudokuId + "/fields", gridData);
  }

  saveSudokuParams(sudokuId: number, secondsOfTimer: { edit_time: number }) {
    return this.http
      .put<ISudokuDto>(this.baseApiURL + "/sudokus/" + sudokuId, secondsOfTimer);
  }

  getSavedSudoku(openId: number): Observable<ISudokuDto> {
    return this.http.get<ISudokuDto>(this.baseApiURL + "/sudokus/" + openId);
  }
}
