import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrders } from './completed-orders';

describe('CompletedOrders', () => {
  let component: CompletedOrders;
  let fixture: ComponentFixture<CompletedOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
