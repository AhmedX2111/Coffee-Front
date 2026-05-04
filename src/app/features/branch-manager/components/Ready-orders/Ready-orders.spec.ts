import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyOrders } from './ready-orders';

describe('ReadyOrders', () => {
  let component: ReadyOrders;
  let fixture: ComponentFixture<ReadyOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadyOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadyOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
