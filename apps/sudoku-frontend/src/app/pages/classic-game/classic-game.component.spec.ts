import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassicGameComponent } from './classic-game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClassicGameService } from './classic-game.service';

describe('ClassicGameComponent', () => {
  let component: ClassicGameComponent;
  let fixture: ComponentFixture<ClassicGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ClassicGameComponent],
      providers: [ClassicGameService]
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
