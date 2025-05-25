import { TestBed } from '@angular/core/testing';

import { RoomTypeService } from './room-type.service';

describe('RoomService', () => {
  let service: RoomTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
