import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitvcComponent } from './exitvc.component';

describe('ExitvcComponent', () => {
  let component: ExitvcComponent;
  let fixture: ComponentFixture<ExitvcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitvcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitvcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
