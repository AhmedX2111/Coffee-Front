import { TestBed } from '@angular/core/testing';

import { BranchesOrderService } from '../branches-order-service';

describe('BranchesOrderService', () => {
  let service: BranchesOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
