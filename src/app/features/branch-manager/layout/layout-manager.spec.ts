import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutManager } from './layout-manager';

describe('LayoutManager', () => {
  let component: LayoutManager;
  let fixture: ComponentFixture<LayoutManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
