import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonImageGroup } from './radio-button-image-group';

describe('RadioButtonImageGroup', () => {
  let component: RadioButtonImageGroup;
  let fixture: ComponentFixture<RadioButtonImageGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonImageGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonImageGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
