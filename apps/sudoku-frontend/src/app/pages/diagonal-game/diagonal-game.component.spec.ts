import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagonalGameComponent } from './diagonal-game.component';

describe('DiagonalGameComponent', () => {
  let component: DiagonalGameComponent;
  let fixture: ComponentFixture<DiagonalGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagonalGameComponent ]
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
