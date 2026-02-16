import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergerBidding } from './merger-bidding';

describe('MergerBidding', () => {
  let component: MergerBidding;
  let fixture: ComponentFixture<MergerBidding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergerBidding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergerBidding);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
