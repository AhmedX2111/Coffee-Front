import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchProfile } from './branch-profile';

describe('BranchProfile', () => {
  let component: BranchProfile;
  let fixture: ComponentFixture<BranchProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
