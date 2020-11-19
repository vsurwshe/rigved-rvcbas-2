import { TestBed } from '@angular/core/testing';

import { ManageTripService } from './manage-trip.service';

describe('ManageTripService', () => {
  let service: ManageTripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageTripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
