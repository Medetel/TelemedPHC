import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugApprovelComponent } from './drug-approvel.component';

describe('DrugApprovelComponent', () => {
  let component: DrugApprovelComponent;
  let fixture: ComponentFixture<DrugApprovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugApprovelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugApprovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
