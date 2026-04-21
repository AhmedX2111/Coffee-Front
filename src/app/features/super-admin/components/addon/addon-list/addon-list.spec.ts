import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonList } from './addon-list';

describe('AddonList', () => {
  let component: AddonList;
  let fixture: ComponentFixture<AddonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddonList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddonList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
