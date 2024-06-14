import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCallcenterComponent } from './delete-callcenter.component';

describe('DeleteCallcenterComponent', () => {
  let component: DeleteCallcenterComponent;
  let fixture: ComponentFixture<DeleteCallcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCallcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCallcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
