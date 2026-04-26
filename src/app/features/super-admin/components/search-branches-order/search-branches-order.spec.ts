import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBranchesOrder } from './search-branches-order';

describe('SearchBranchesOrder', () => {
  let component: SearchBranchesOrder;
  let fixture: ComponentFixture<SearchBranchesOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBranchesOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBranchesOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
