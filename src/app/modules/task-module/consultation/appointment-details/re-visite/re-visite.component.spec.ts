import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReVisiteComponent } from './re-visite.component';

describe('ReVisiteComponent', () => {
  let component: ReVisiteComponent;
  let fixture: ComponentFixture<ReVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReVisiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
