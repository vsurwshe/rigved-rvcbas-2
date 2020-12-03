import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceDetailsComponent } from './maintance-details.component';

describe('MaintanceDetailsComponent', () => {
  let component: MaintanceDetailsComponent;
  let fixture: ComponentFixture<MaintanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
