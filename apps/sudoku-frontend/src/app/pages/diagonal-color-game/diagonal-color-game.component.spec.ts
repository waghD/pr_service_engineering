import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonalColorGameComponent } from './diagonal-color-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('DiagonalColorGameComponent', () => {
  let component: DiagonalColorGameComponent;
  let fixture: ComponentFixture<DiagonalColorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      declarations: [DiagonalColorGameComponent],
      providers: [DiagonalColorGameComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonalColorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
