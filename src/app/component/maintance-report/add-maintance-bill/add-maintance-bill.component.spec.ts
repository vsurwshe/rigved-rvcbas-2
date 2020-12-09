import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintanceBillComponent } from './add-maintance-bill.component';

describe('AddMaintanceBillComponent', () => {
  let component: AddMaintanceBillComponent;
  let fixture: ComponentFixture<AddMaintanceBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMaintanceBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaintanceBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
