import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnoisComponent } from './diagnois.component';

describe('DiagnoisComponent', () => {
  let component: DiagnoisComponent;
  let fixture: ComponentFixture<DiagnoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
