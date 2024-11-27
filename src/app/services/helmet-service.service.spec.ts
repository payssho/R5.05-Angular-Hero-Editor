import { TestBed } from '@angular/core/testing';

import { HelmetServiceService } from './helmet-service.service';

describe('HelmetServiceService', () => {
  let service: HelmetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelmetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
