import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchHome } from './branch-home';

describe('BranchHome', () => {
  let component: BranchHome;
  let fixture: ComponentFixture<BranchHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
