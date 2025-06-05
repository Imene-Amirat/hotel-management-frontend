import { TestBed } from '@angular/core/testing';

import { HotelFeaturesService } from './hotel-features.service';

describe('HotelFeaturesService', () => {
  let service: HotelFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
