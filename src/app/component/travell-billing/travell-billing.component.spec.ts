import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravellBillingComponent } from './travell-billing.component';

describe('TravellBillingComponent', () => {
  let component: TravellBillingComponent;
  let fixture: ComponentFixture<TravellBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravellBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravellBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
