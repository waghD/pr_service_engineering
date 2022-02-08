import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuTypeSelectionComponent } from './sudoku-type-selection.component';

describe('SudokuTypeSelectionComponent', () => {
  let component: SudokuTypeSelectionComponent;
  let fixture: ComponentFixture<SudokuTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SudokuTypeSelectionComponent ]
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
