import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToPlayComponent } from './how-to-play.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HowToPlayComponent', () => {
  let component: HowToPlayComponent;
  let fixture: ComponentFixture<HowToPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToPlayComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
