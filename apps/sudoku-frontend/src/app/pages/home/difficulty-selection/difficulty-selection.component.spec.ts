import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultySelectionComponent } from './difficulty-selection.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DifficultySelectionComponent', () => {
  let component: DifficultySelectionComponent;
  let fixture: ComponentFixture<DifficultySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultySelectionComponent ],
      imports: [MatDialogModule],
      providers: [DifficultySelectionComponent, {
        provide: MatDialogRef,
        useValue: {}
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifficultySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
