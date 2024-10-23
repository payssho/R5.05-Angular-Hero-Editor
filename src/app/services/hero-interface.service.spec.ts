import { TestBed } from '@angular/core/testing';

import { HeroInterfaceService } from './hero-interface.service';

describe('HeroInterfaceService', () => {
  let service: HeroInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
