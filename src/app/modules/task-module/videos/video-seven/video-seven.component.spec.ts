import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSevenComponent } from './video-seven.component';

describe('VideoSevenComponent', () => {
  let component: VideoSevenComponent;
  let fixture: ComponentFixture<VideoSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSevenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
