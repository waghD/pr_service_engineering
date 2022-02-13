import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderDialogComponent } from './loader-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoaderDialogComponent', () => {
  let component: LoaderDialogComponent;
  let fixture: ComponentFixture<LoaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderDialogComponent ],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: {}
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
