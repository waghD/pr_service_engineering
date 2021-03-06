import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionGameComponent } from './region-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RegionGameComponent', () => {
  let component: RegionGameComponent;
  let fixture: ComponentFixture<RegionGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule, NoopAnimationsModule],
      declarations: [RegionGameComponent],
      providers: [RegionGameComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
