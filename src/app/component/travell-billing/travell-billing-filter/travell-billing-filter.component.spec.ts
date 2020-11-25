import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellBillingFilterComponent } from './travell-billing-filter.component';

describe('TravellBillingFilterComponent', () => {
  let component: TravellBillingFilterComponent;
  let fixture: ComponentFixture<TravellBillingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellBillingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellBillingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
