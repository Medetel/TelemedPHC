import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRevisitComponent } from './delete-revisit.component';

describe('DeleteRevisitComponent', () => {
  let component: DeleteRevisitComponent;
  let fixture: ComponentFixture<DeleteRevisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRevisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
