import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupTime } from './pickup-time';

describe('PickupTime', () => {
  let component: PickupTime;
  let fixture: ComponentFixture<PickupTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupTime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
