import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuTypeSelectionComponent } from './sudoku-type-selection.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('SudokuTypeSelectionComponent', () => {
  let component: SudokuTypeSelectionComponent;
  let fixture: ComponentFixture<SudokuTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SudokuTypeSelectionComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [SudokuTypeSelectionComponent, {
        provide: MatDialogRef,
        useValue: {}
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
