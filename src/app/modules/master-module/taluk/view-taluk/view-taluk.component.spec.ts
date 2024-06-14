import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTalukComponent } from './view-taluk.component';

describe('ViewTalukComponent', () => {
  let component: ViewTalukComponent;
  let fixture: ComponentFixture<ViewTalukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTalukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTalukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
