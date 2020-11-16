import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceReportComponent } from './maintance-report.component';

describe('MaintanceReportComponent', () => {
  let component: MaintanceReportComponent;
  let fixture: ComponentFixture<MaintanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
