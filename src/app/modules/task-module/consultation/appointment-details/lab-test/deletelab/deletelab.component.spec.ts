import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletelabComponent } from './deletelab.component';

describe('DeletelabComponent', () => {
  let component: DeletelabComponent;
  let fixture: ComponentFixture<DeletelabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletelabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletelabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
