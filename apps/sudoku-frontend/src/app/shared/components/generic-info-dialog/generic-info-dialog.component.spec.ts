import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericInfoDialogComponent } from './generic-info-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GenericInfoDialogComponent', () => {
  let component: GenericInfoDialogComponent;
  let fixture: ComponentFixture<GenericInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericInfoDialogComponent],
      imports: [MatDialogModule],
      providers: [GenericInfoDialogComponent, {
        provide: MatDialogRef,
        useValue: {}
      }, { provide: MAT_DIALOG_DATA, useValue: {} }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  })
  ;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
