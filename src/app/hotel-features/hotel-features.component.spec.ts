import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFeaturesComponent } from './hotel-features.component';

describe('HotelFeaturesComponent', () => {
  let component: HotelFeaturesComponent;
  let fixture: ComponentFixture<HotelFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
