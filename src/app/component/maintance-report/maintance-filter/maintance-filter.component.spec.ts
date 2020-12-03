import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceFilterComponent } from './maintance-filter.component';

describe('MaintanceFilterComponent', () => {
  let component: MaintanceFilterComponent;
  let fixture: ComponentFixture<MaintanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintanceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
