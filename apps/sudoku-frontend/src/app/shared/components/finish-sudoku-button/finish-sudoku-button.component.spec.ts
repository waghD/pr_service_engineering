import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSudokuButtonComponent } from './finish-sudoku-button.component';
import { AuthStateService } from '../../../services/auth-state.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FinishSudokuButtonComponent', () => {
  let component: FinishSudokuButtonComponent;
  let fixture: ComponentFixture<FinishSudokuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishSudokuButtonComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthStateService, {
        provide: Router,
        useClass: RouterTestingModule
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishSudokuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
