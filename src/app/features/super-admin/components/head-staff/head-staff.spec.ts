import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadStaff } from './head-staff';

describe('HeadStaff', () => {
  let component: HeadStaff;
  let fixture: ComponentFixture<HeadStaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadStaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadStaff);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
