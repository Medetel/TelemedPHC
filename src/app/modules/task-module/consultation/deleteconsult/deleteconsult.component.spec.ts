import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteconsultComponent } from './deleteconsult.component';

describe('DeleteconsultComponent', () => {
  let component: DeleteconsultComponent;
  let fixture: ComponentFixture<DeleteconsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteconsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteconsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
