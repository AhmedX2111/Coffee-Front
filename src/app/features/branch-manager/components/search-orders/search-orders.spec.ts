import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrders } from './search-orders';

describe('SearchOrders', () => {
  let component: SearchOrders;
  let fixture: ComponentFixture<SearchOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
