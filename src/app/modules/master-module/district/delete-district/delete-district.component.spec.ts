import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDistrictComponent } from './delete-district.component';

describe('DeleteDistrictComponent', () => {
  let component: DeleteDistrictComponent;
  let fixture: ComponentFixture<DeleteDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDistrictComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
