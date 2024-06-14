import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTalukComponent } from './approve-taluk.component';

describe('ApproveTalukComponent', () => {
  let component: ApproveTalukComponent;
  let fixture: ComponentFixture<ApproveTalukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTalukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTalukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
