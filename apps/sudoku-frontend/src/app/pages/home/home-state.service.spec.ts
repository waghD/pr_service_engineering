import { TestBed } from '@angular/core/testing';

import { HomeStateService } from './home-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeStateService', () => {
  let service: HomeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HomeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
