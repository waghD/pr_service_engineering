import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonalGameComponent } from './diagonal-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DiagonalGameComponent', () => {
  let component: DiagonalGameComponent;
  let fixture: ComponentFixture<DiagonalGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DiagonalGameComponent],
      providers: [DiagonalGameComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagonalGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
