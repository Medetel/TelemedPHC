import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTalukComponent } from './delete-taluk.component';

describe('DeleteTalukComponent', () => {
  let component: DeleteTalukComponent;
  let fixture: ComponentFixture<DeleteTalukComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTalukComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTalukComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
