import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationPayementComponent } from './reservation-payement.component';

describe('ReservationPayementComponent', () => {
  let component: ReservationPayementComponent;
  let fixture: ComponentFixture<ReservationPayementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationPayementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationPayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
