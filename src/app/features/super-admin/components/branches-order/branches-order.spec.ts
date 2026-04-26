import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesOrder } from './branches-order';

describe('BranchesOrder', () => {
  let component: BranchesOrder;
  let fixture: ComponentFixture<BranchesOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchesOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
