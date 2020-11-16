import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTripComponent } from './manage-trip.component';

describe('ManageTripComponent', () => {
  let component: ManageTripComponent;
  let fixture: ComponentFixture<ManageTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
