import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTalukComponent } from './edit-taluk.component';

describe('EditTalukComponent', () => {
  let component: EditTalukComponent;
  let fixture: ComponentFixture<EditTalukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTalukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTalukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
