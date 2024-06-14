import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDrugsComponent } from './delete-drugs.component';

describe('DeleteDrugsComponent', () => {
  let component: DeleteDrugsComponent;
  let fixture: ComponentFixture<DeleteDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDrugsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
