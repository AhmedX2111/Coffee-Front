import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAddon } from './add-addon';

describe('AddAddon', () => {
  let component: AddAddon;
  let fixture: ComponentFixture<AddAddon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAddon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAddon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
