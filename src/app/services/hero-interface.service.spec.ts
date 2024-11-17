import { TestBed } from '@angular/core/testing';

import { HerointerfaceService } from './hero-interface.service';

describe('HeroInterfaceService', () => {
  let service: HerointerfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HerointerfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
