import { TestBed } from '@angular/core/testing';

import { FarmerRegistrationService } from './farmer-registration.service';

describe('FarmerRegistrationService', () => {
  let service: FarmerRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
