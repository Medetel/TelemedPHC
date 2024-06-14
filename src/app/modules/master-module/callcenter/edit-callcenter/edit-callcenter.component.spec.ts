import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCallcenterComponent } from './edit-callcenter.component';

describe('EditCallcenterComponent', () => {
  let component: EditCallcenterComponent;
  let fixture: ComponentFixture<EditCallcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCallcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
