import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicGameComponent } from './classic-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClassicGameService } from './classic-game.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('ClassicGameComponent', () => {
  let component: ClassicGameComponent;
  let fixture: ComponentFixture<ClassicGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
      declarations: [ClassicGameComponent],
      providers: [ClassicGameService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassicGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
