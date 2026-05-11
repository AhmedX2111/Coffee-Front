import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchStatsComponent } from './branch-stats-component';

describe('BranchStatsComponent', () => {
  let component: BranchStatsComponent;
  let fixture: ComponentFixture<BranchStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchStatsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
