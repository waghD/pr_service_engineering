import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishSudokuButtonComponent } from './finish-sudoku-button.component';

describe('FinishSudokuButtonComponent', () => {
  let component: FinishSudokuButtonComponent;
  let fixture: ComponentFixture<FinishSudokuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishSudokuButtonComponent]
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
