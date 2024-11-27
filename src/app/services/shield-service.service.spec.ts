import { TestBed } from '@angular/core/testing';

import { ShieldServiceService } from './shield-service.service';

describe('ShieldServiceService', () => {
  let service: ShieldServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShieldServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
