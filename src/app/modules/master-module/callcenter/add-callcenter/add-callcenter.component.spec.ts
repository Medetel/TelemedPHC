import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCallcenterComponent } from './add-callcenter.component';

describe('AddCallcenterComponent', () => {
  let component: AddCallcenterComponent;
  let fixture: ComponentFixture<AddCallcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCallcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
