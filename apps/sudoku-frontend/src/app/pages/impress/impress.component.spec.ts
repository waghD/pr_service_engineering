import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressComponent } from './impress.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ImpressComponent', () => {
  let component: ImpressComponent;
  let fixture: ComponentFixture<ImpressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpressComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
