import { Injectable, isDevMode } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthStateService } from '../../services/auth-state.service';
import { Observable } from 'rxjs';
import { ISudokuDto } from '../../../../../../libs/models/sudoku.dto';

@Injectable({
  providedIn: 'root'
})
export class SavedGamesService {

  public readonly title = 'service-frontend';
  private baseApiURL:string;

  constructor(private readonly http: HttpClient, private authStateService: AuthStateService) {
    if(isDevMode()){
      this.baseApiURL='http://localhost:8080/api';
    }else{
      this.baseApiURL='http://localhost/api';
    }
  }

  getSavedSudokus(): Observable<ISudokuDto[]> {
    return this.http.get<ISudokuDto[]>(this.baseApiURL + '/sudokus');
  }

  deleteSudoku(sudokuId: number): Observable<ISudokuDto> {
    return this.http.delete<ISudokuDto>(this.baseApiURL + '/sudokus/' + sudokuId);
  }
}
