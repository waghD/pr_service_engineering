import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogComponent } from './delete-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [DeleteDialogComponent],
      providers: [DeleteDialogComponent, {
        provide: MatDialogRef,
        useValue: {}
      }, { provide: MAT_DIALOG_DATA, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
