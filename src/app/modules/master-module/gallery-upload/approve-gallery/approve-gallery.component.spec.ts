import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveGalleryComponent } from './approve-gallery.component';

describe('ApproveGalleryComponent', () => {
  let component: ApproveGalleryComponent;
  let fixture: ComponentFixture<ApproveGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
